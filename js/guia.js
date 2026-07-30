/*
 * Guía de aterrizaje en España — StudentPassport
 *
 * Sitio estático. No hay servidor, no hay base de datos y no se recoge
 * ningún dato: lo que marcas se guarda solo en tu propio navegador.
 *
 * Los trámites viven aquí como datos para que la lista y la calculadora
 * de fechas no puedan desincronizarse nunca.
 *
 * "offset" = días antes del primer día de clase en que conviene tenerlo
 * resuelto. Un offset negativo significa que cae después de empezar
 * las clases, cosa que en algunos trámites es normal y legal.
 */

const TRAMITES = [
    {
        fase: 1,
        id: "cita-consulado",
        titulo: "Pedir cita en el consulado para el visado",
        offset: 90,
        critico: true,
        desc: "Es el cuello de botella real de todo el proceso. Las citas se agotan y no hay forma de acelerarlas. Pídela aunque todavía no tengas ni un solo papel reunido: primero la fecha, los documentos después.",
        nota: "Bloquea absolutamente todo lo demás."
    },
    {
        fase: 1,
        id: "antecedentes",
        titulo: "Certificado de antecedentes penales + apostilla",
        offset: 75,
        desc: "Son dos trámites, no uno. Primero lo emite la autoridad de tu país y después hay que apostillarlo por el Convenio de La Haya, normalmente en otra oficina distinta.",
        nota: "Es el documento que más viajes retrasa. Tiene caducidad: no lo saques con demasiada antelación."
    },
    {
        fase: 1,
        id: "certificado-medico",
        titulo: "Certificado médico",
        offset: 60,
        desc: "Debe indicar que no padeces enfermedades que puedan tener repercusión para la salud pública según el Reglamento Sanitario Internacional. Cada consulado suele exigir una redacción concreta.",
        nota: "Pide el modelo exacto ANTES de ir al médico. Es habitual tener que repetirlo por una frase mal puesta."
    },
    {
        fase: 1,
        id: "seguro",
        titulo: "Contratar el seguro médico",
        offset: 60,
        desc: "No sirve cualquiera. Tiene que dar cobertura completa en España, sin copagos, sin periodos de carencia y estar vigente durante toda tu estancia.",
        nota: "Un seguro de viaje normal te lo rechazan."
    },
    {
        fase: 1,
        id: "medios-economicos",
        titulo: "Acreditar medios económicos",
        offset: 60,
        desc: "Hay que demostrar que puedes mantenerte durante el curso. El importe se calcula sobre el IPREM del año en curso y se acredita con extractos bancarios, carta de patrocinio o resolución de beca.",
        nota: "Una cuenta abierta la semana pasada levanta sospechas. Cuanto más histórico tenga, mejor."
    },
    {
        fase: 1,
        id: "expediente-visado",
        titulo: "Presentar el expediente de visado",
        offset: 55,
        critico: true,
        desc: "Formulario nacional, pasaporte con vigencia suficiente, carta de admisión, matrícula, y todo lo anterior. Más fotos y la tasa correspondiente.",
        nota: "Si va incompleto pierdes la cita y vuelves al final de la cola."
    },

    {
        fase: 2,
        id: "buscar-alojamiento",
        titulo: "Empezar a buscar alojamiento",
        offset: 50,
        critico: true,
        desc: "Alquilar en remoto desde otro continente es donde ocurren casi todas las estafas de este proceso. Nunca pagues una fianza sin contrato firmado y sin haber verificado que el propietario existe.",
        nota: "Necesitarás un contrato a tu nombre o una autorización del propietario. Sin eso no hay empadronamiento."
    },
    {
        fase: 2,
        id: "reservar-temporal",
        titulo: "Cerrar alojamiento al menos temporal",
        offset: 25,
        critico: true,
        desc: "La jugada segura es reservar algo verificado para las primeras tres o cuatro semanas y buscar lo definitivo ya estando en la ciudad, pudiendo ver el piso con tus propios ojos.",
        nota: "Llegar sin dónde dormir te bloquea el padrón y, en cadena, todo lo demás."
    },
    {
        fase: 2,
        id: "vuelo",
        titulo: "Comprar el vuelo",
        offset: 20,
        desc: "Solo cuando el visado esté resuelto, salvo que la tarifa sea reembolsable.",
        nota: "Deja margen: aterrizar el día antes de clase te deja sin hacer ninguna gestión de las siguientes."
    },
    {
        fase: 2,
        id: "viajar",
        titulo: "Viajar",
        offset: 12,
        desc: "Lo ideal es llegar entre diez y catorce días antes del primer día de clase. Ese margen es lo que separa un primer mes tranquilo de un desastre.",
        nota: "Todo lo que viene a continuación se cuenta desde el día que entras en España."
    },

    {
        fase: 3,
        id: "cita-tie",
        titulo: "Pedir cita previa para la TIE",
        offset: 11,
        critico: true,
        desc: "Lo más importante de toda la lista, y casi nadie lo sabe: la cita se pide ANTES de tener los papeles listos, porque las citas van a semanas de distancia. Si esperas a tener el empadronamiento, te sales del plazo legal.",
        nota: "Plazo legal: un mes desde tu entrada. Aplica si tu estancia supera los seis meses."
    },
    {
        fase: 3,
        id: "contrato-alquiler",
        titulo: "Firmar el contrato de alquiler",
        offset: 9,
        critico: true,
        desc: "Con tu nombre en él. Si compartes piso y el contrato es de otra persona, necesitas una autorización firmada del titular o del propietario para poder empadronarte.",
        nota: "Bloquea el padrón, la TIE y el abono de transporte."
    },

    {
        fase: 4,
        id: "empadronamiento",
        titulo: "Empadronamiento",
        offset: 5,
        critico: true,
        desc: "Te registras en el ayuntamiento de tu ciudad. Es la llave de todo lo que viene después: TIE, sanidad, transporte joven y prácticamente cualquier gestión municipal.",
        nota: "En ciudades grandes requiere cita previa. Llevas pasaporte y contrato o autorización."
    },
    {
        fase: 4,
        id: "universidad",
        titulo: "Acreditarte en la universidad",
        offset: 3,
        desc: "Entrega de documentos originales, matrícula formal y credenciales de estudiante.",
        nota: "Hazlo antes de que empiecen las clases, no durante."
    },
    {
        fase: 4,
        id: "banco-movil",
        titulo: "Cuenta bancaria y línea de móvil",
        offset: 2,
        desc: "Algunos bancos abren cuenta de no residente solo con pasaporte; otros exigen la TIE. Un número español lo vas a necesitar para casi cualquier cita previa y para recibir SMS de verificación.",
        nota: "Si un banco te pone pegas, prueba en otro. Las políticas varían mucho entre entidades."
    },
    {
        fase: 4,
        id: "transporte",
        titulo: "Abono de transporte joven",
        offset: 0,
        desc: "Si tienes menos de 26 años, en varias ciudades el abono joven cuesta una fracción del normal. Suele pedir cita y empadronamiento.",
        nota: "De las pocas cosas de esta lista que te ahorra dinero de verdad todos los meses."
    },

    {
        fase: 5,
        id: "presentar-tie",
        titulo: "Presentar la solicitud de TIE",
        offset: -18,
        critico: true,
        desc: "En tu cita: formulario EX-17, la tasa modelo 790 código 012 ya pagada, fotos, pasaporte con el visado, empadronamiento y justificante de matrícula.",
        nota: "El límite es un mes desde tu entrada en España. Salirte del plazo complica tus renovaciones futuras."
    },
    {
        fase: 5,
        id: "recoger-tie",
        titulo: "Recoger la TIE física",
        offset: -50,
        desc: "Semanas después de presentarla, con una cita aparte.",
        nota: "Hasta que la tengas en la mano, salir de España puede complicarte el regreso."
    },
    {
        fase: 5,
        id: "certificado-digital",
        titulo: "Sacar el certificado digital o Cl@ve",
        offset: -60,
        desc: "No es obligatorio y por eso casi nadie lo hace. Es un error: a partir de aquí, cada gestión que tengas que hacer en España se resuelve en diez minutos desde casa en lugar de con cita presencial.",
        nota: "Sácalo en cuanto tengas la TIE. Te ahorrará años de colas."
    }
];

const FASES = {
    1: {
        titulo: "En tu país, antes de viajar",
        desc: "Estos seis se hacen desde tu país. Si uno se atrasa, se atrasa el viaje entero."
    },
    2: {
        titulo: "En paralelo: alojamiento y viaje",
        desc: "No esperes a tener el visado en la mano para empezar esto o llegarás sin dónde dormir."
    },
    3: {
        titulo: "Primeras 72 horas en España",
        desc: "Esta fase decide si tu primer mes es tranquilo o es un desastre."
    },
    4: {
        titulo: "Primeras dos semanas",
        desc: "Con el padrón en la mano se desbloquea casi todo lo demás."
    },
    5: {
        titulo: "Primer mes y medio",
        desc: "Cae ya con las clases empezadas, y es perfectamente normal."
    }
};

const ALMACEN = "guia-espana-progreso";

const listado = document.getElementById("listado");
const campoFecha = document.getElementById("fechaClase");
const resumen = document.getElementById("resumen");
const barra = document.getElementById("barraProgreso");
const textoProgreso = document.getElementById("textoProgreso");

let hechos = cargarProgreso();

pintarListado();
restaurarFecha();
actualizarProgreso();

campoFecha.addEventListener("change", () => {
    guardarFecha(campoFecha.value);
    actualizarFechas();
});

document.getElementById("limpiar").addEventListener("click", () => {
    if (!confirm("¿Borrar tu progreso y tu fecha guardada?")) {
        return;
    }

    localStorage.removeItem(ALMACEN);
    hechos = {};
    campoFecha.value = "";

    document.querySelectorAll(".casilla").forEach((c) => {
        c.checked = false;
    });

    actualizarFechas();
    actualizarProgreso();
});

document.getElementById("imprimir").addEventListener("click", () => {
    window.print();
});

function pintarListado() {
    let html = "";

    Object.keys(FASES).forEach((numero) => {
        const fase = FASES[numero];

        html += `
            <section class="fase">
                <h2><span class="fase-num">${numero}</span> ${fase.titulo}</h2>
                <p class="fase-desc">${fase.desc}</p>
        `;

        TRAMITES.filter((t) => String(t.fase) === numero).forEach((t) => {
            html += `
                <article class="tramite${t.critico ? " es-critico" : ""}" id="t-${t.id}">
                    <label class="marca-zona">
                        <input type="checkbox" class="casilla" data-id="${t.id}"
                               ${hechos[t.id] ? "checked" : ""}>
                    </label>

                    <div class="cuerpo">
                        <h3>
                            ${t.titulo}
                            ${t.critico ? '<span class="etiqueta">Cadena crítica</span>' : ""}
                        </h3>

                        <p class="desc">${t.desc}</p>
                        <p class="nota">${t.nota}</p>

                        <p class="fecha" data-offset="${t.offset}">
                            <span class="fecha-vacia">Introduce tu fecha de inicio arriba para ver cuándo toca</span>
                        </p>
                    </div>
                </article>
            `;
        });

        html += "</section>";
    });

    listado.innerHTML = html;

    document.querySelectorAll(".casilla").forEach((casilla) => {
        casilla.addEventListener("change", () => {
            hechos[casilla.dataset.id] = casilla.checked;
            guardarProgreso();
            actualizarProgreso();
        });
    });
}

function actualizarFechas() {
    const base = leerFechaClase();

    if (!base) {
        resumen.hidden = true;

        document.querySelectorAll(".fecha").forEach((p) => {
            p.innerHTML = '<span class="fecha-vacia">Introduce tu fecha de inicio arriba para ver cuándo toca</span>';
        });

        return;
    }

    const hoy = aMedianoche(new Date());
    const diasQueFaltan = Math.round((base - hoy) / 86400000);

    let atrasados = 0;

    document.querySelectorAll(".fecha").forEach((p) => {
        const offset = Number(p.dataset.offset);
        const objetivo = new Date(base.getTime() - offset * 86400000);
        const margen = Math.round((objetivo - hoy) / 86400000);

        let estado = "ok";
        let texto = "Vas a tiempo";

        if (margen < 0) {
            estado = "vencido";
            texto = "Prioridad máxima";
            atrasados++;
        } else if (margen <= 7) {
            estado = "urgente";
            texto = "Esta semana";
        } else if (margen <= 21) {
            estado = "pronto";
            texto = "En las próximas semanas";
        }

        p.innerHTML = `
            <span class="chip chip-${estado}">${texto}</span>
            <span class="fecha-valor">${formatear(objetivo)}</span>
        `;
    });

    resumen.hidden = false;

    if (diasQueFaltan < 0) {
        resumen.innerHTML = `Tu curso empezó hace <strong>${Math.abs(diasQueFaltan)} días</strong>. Revisa sobre todo la fase 5, que es la que sigue viva.`;
        return;
    }

    let texto = `Faltan <strong>${diasQueFaltan} días</strong> para tu primer día de clase.`;

    if (atrasados > 0) {
        texto += ` Tienes <strong>${atrasados} pasos en prioridad máxima</strong>.
            Eso no significa que no llegues: las fechas de esta guía son las
            holgadas, y mucha gente lo resuelve con menos margen. Significa que
            ese es el orden exacto en que tienes que atacarlos, empezando hoy
            por el primero de la lista.`;
    }

    resumen.innerHTML = texto;
}

function actualizarProgreso() {
    const total = TRAMITES.length;
    const completados = TRAMITES.filter((t) => hechos[t.id]).length;
    const pct = Math.round((completados / total) * 100);

    barra.style.width = `${pct}%`;
    textoProgreso.textContent = `${completados} de ${total} pasos · ${pct}%`;
}

function leerFechaClase() {
    if (!campoFecha.value) {
        return null;
    }

    const d = new Date(`${campoFecha.value}T00:00:00`);

    return Number.isNaN(d.getTime()) ? null : d;
}

function aMedianoche(fecha) {
    const d = new Date(fecha);
    d.setHours(0, 0, 0, 0);
    return d;
}

function formatear(fecha) {
    return fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

/* El progreso y la fecha viven solo en este navegador. Nunca salen de aquí. */

function cargarProgreso() {
    try {
        const guardado = JSON.parse(localStorage.getItem(ALMACEN));
        return guardado && guardado.hechos ? guardado.hechos : {};
    } catch {
        return {};
    }
}

function guardarProgreso() {
    const actual = leerAlmacen();
    actual.hechos = hechos;
    localStorage.setItem(ALMACEN, JSON.stringify(actual));
}

function guardarFecha(valor) {
    const actual = leerAlmacen();
    actual.fechaClase = valor;
    localStorage.setItem(ALMACEN, JSON.stringify(actual));
}

function restaurarFecha() {
    const guardado = leerAlmacen();

    if (guardado.fechaClase) {
        campoFecha.value = guardado.fechaClase;
    }

    actualizarFechas();
}

function leerAlmacen() {
    try {
        return JSON.parse(localStorage.getItem(ALMACEN)) || {};
    } catch {
        return {};
    }
}
