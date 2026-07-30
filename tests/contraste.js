/*
 * Medidor de contraste WCAG para la guía.
 *
 *     node tests/contraste.js
 *
 * Lee la paleta directamente de css/guia.css, así que si cambias un
 * color aquí se entera. Sale con código 1 si algo no cumple, para que
 * pueda usarse como puerta antes de publicar.
 *
 * Mínimos AA: 4,5:1 en texto normal · 3:1 en texto grande e interfaz.
 *
 * Los fondos de bloque (chips, avisos, recuadros de país) van escritos
 * como literales en el CSS, no como variables, así que se declaran
 * abajo a mano. Si tocas uno de esos fondos, actualízalo también aquí.
 */

const fs = require("fs");
const path = require("path");

const CSS = fs.readFileSync(
    path.join(__dirname, "..", "css", "guia.css"),
    "utf8"
);

function paleta(bloque) {
    const vars = {};
    const re = /--([a-z-]+)\s*:\s*(#[0-9a-fA-F]{6})/g;
    let m;
    while ((m = re.exec(bloque)) !== null) {
        vars[m[1]] = m[2];
    }
    return vars;
}

const claro = paleta(CSS.slice(0, CSS.indexOf("}")));

const iDark = CSS.indexOf("@media (prefers-color-scheme: dark)");
const oscuro = paleta(CSS.slice(iDark, CSS.indexOf("}", CSS.indexOf(":root", iDark))));

function lum(hex) {
    const v = hex.replace("#", "");
    const c = [0, 2, 4].map((i) => {
        const s = parseInt(v.substr(i, 2), 16) / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function ratio(a, b) {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
}

function pruebas(P, fondos, esOscuro) {
    return [
        ["Texto sobre tarjeta",          P.text,          P.surface,     4.5],
        ["Texto sobre fondo de pagina",  P.text,          P.background,  4.5],
        ["Texto atenuado sobre tarjeta", P.muted,         P.surface,     4.5],
        ["Texto atenuado sobre pagina",  P.muted,         P.background,  4.5],
        ["Enlace sobre tarjeta",         P.primary,       P.surface,     4.5],

        ["Chip a tiempo",                fondos.okTexto,  fondos.ok,     4.5],
        ["Chip pronto",                  P["primary-dark"], fondos.pronto, 4.5],
        ["Chip urgente",                 fondos.urgTexto, fondos.urgente, 4.5],
        ["Chip vencido",                 fondos.vencTexto, fondos.vencido, 4.5],

        ["Bloque de pais",               P.text,          fondos.pais,   4.5],
        ["Etiqueta de pais",             fondos.etqTexto, P.success,     4.5],
        ["Numero de fase",               fondos.numTexto, esOscuro ? P.primary : P.navy, 4.5],
        ["Etiqueta cadena critica",      P["primary-dark"], fondos.etiqueta, 4.5],

        ["Aviso de agosto",              P.text,          fondos.aviso,  4.5],
        ["Titulo del aviso",             fondos.avisoTitulo, fondos.aviso, 4.5],
        ["Cadena critica",               P.text,          fondos.cadena, 4.5],
        ["Titulo cadena critica",        P["primary-dark"], fondos.cadena, 4.5],
        ["Pregunta destacada",           fondos.preguntaTexto, fondos.pregunta, 4.5],
        ["Aviso legal",                  P.muted,         fondos.legal,  4.5],

        ["Paso hecho: cuerpo",           P.text,          fondos.hecho,  4.5],
        ["Paso hecho: titulo",           P.muted,         fondos.hecho,  4.5],

        ["Barra de progreso (interfaz)", P.success,       P.border,      3.0]
    ];
}

/*
 * Mezcla un color con su fondo para simular una capa de opacidad.
 * Sin esto la medicion enganaba: una tarjeta atenuada con opacity
 * declara colores que cumplen y aun asi se lee mal en pantalla.
 */
function conOpacidad(fg, bg, alfa) {
    const canal = (h, i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
    const mezclado = [0, 1, 2].map((i) =>
        Math.round(alfa * canal(fg, i) + (1 - alfa) * canal(bg, i))
    );
    return "#" + mezclado.map((n) => n.toString(16).padStart(2, "0")).join("");
}

const fondosClaro = {
    ok: "#e4f4ed",      okTexto: claro.success,
    pronto: "#e6efff",
    urgente: "#fdf0dc",  urgTexto: "#8a5d0a",
    vencido: "#fce8e8",  vencTexto: claro.danger,
    pais: "#eef7f3",     etqTexto: "#ffffff",
    numTexto: "#ffffff",
    etiqueta: "#e6efff",
    aviso: "#fff8ec",    avisoTitulo: "#8a5d0a",
    cadena: "#eef4ff",
    pregunta: "#eef4ff", preguntaTexto: claro.navy,
    hecho: "#fafdfb",
    legal: "#f1f4f8"
};

const fondosOscuro = {
    ok: "#123326",      okTexto: "#6fe0ad",
    pronto: "#172c4d",
    urgente: "#3a2a0d",  urgTexto: "#f5c85f",
    vencido: "#3d1a1a",  vencTexto: "#ffa1a1",
    pais: "#12291f",     etqTexto: "#0b2018",
    numTexto: "#0e1620",
    etiqueta: "#1c3157",
    aviso: "#2a2010",    avisoTitulo: oscuro.warning,
    cadena: "#15243d",
    pregunta: "#15243d", preguntaTexto: oscuro.text,
    hecho: "#16231d",
    legal: "#141c27"
};

let fallos = 0;

function tanda(titulo, lista) {
    console.log("\n" + titulo);
    console.log("COMBINACION                          RATIO   MINIMO  ESTADO");
    console.log("-".repeat(64));

    lista.forEach(([nombre, fg, bg, min]) => {
        const r = ratio(fg, bg);
        const ok = r >= min;
        if (!ok) fallos++;
        console.log(
            nombre.padEnd(36) +
            r.toFixed(2).padStart(6) +
            min.toFixed(1).padStart(8) +
            "   " + (ok ? "OK" : "FALLA")
        );
    });
}

/*
 * Guarda contra la regresion que motivo todo esto.
 *
 * Atenuar una tarjeta con opacity deja unos colores declarados que
 * cumplen y un resultado en pantalla que no: la primera version usaba
 * opacity 0.55 en los pasos completados y el cuerpo quedaba en 3,28:1
 * sobre blanco, obligando a pasar el raton por encima para leerlo.
 *
 * Si alguien vuelve a poner opacidad sobre un contenedor de texto,
 * esto lo calcula de verdad y falla.
 */
function guardaOpacidad() {
    const reglas = [...CSS.matchAll(/(\.tramite[^{]*)\{([^}]*)\}/g)];
    const sospechosas = [];

    reglas.forEach(([, selector, cuerpo]) => {
        const m = cuerpo.match(/(?:^|[\s;])opacity:\s*([\d.]+)/);
        if (m && parseFloat(m[1]) < 1) {
            sospechosas.push([selector.trim(), parseFloat(m[1])]);
        }
    });

    if (sospechosas.length === 0) {
        console.log("\nGuarda de opacidad: ningun contenedor de texto atenuado.");
        return;
    }

    console.log("\nGuarda de opacidad:");

    sospechosas.forEach(([selector, alfa]) => {
        [["claro", claro, fondosClaro], ["oscuro", oscuro, fondosOscuro]]
            .forEach(([nombre, P, fondos]) => {
                const real = conOpacidad(P.text, fondos.hecho, alfa);
                const r = ratio(real, fondos.hecho);
                const ok = r >= 4.5;
                if (!ok) fallos++;
                console.log(
                    `  ${selector} @ ${alfa} en ${nombre} -> ${real} = ` +
                    `${r.toFixed(2)}:1  ${ok ? "OK" : "FALLA"}`
                );
            });
    });
}

const listaClaro = pruebas(claro, fondosClaro, false);
const listaOscuro = pruebas(oscuro, fondosOscuro, true);

tanda("=== MODO CLARO ===", listaClaro);
tanda("=== MODO OSCURO ===", listaOscuro);
guardaOpacidad();

const total = listaClaro.length + listaOscuro.length;
console.log("-".repeat(64));
console.log(fallos === 0
    ? `Las ${total} combinaciones de ambos modos cumplen WCAG AA.`
    : `${fallos} de ${total} combinaciones NO cumplen.`);

process.exit(fallos === 0 ? 0 : 1);
