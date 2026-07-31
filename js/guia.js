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
 *
 * "paises" es opcional y es una lista: el paso general vale para
 * cualquiera, y dentro se cuelga el detalle concreto de cada país
 * (organismo, enlace y plazo). Para añadir un país nuevo basta con
 * meter otro objeto en ese array; no hay que tocar nada más.
 *
 *     paises: [
 *         { nombre: "Perú",     texto: "..." },
 *         { nombre: "Colombia", texto: "..." }
 *     ]
 */

const TRAMITES = [
    {
        fase: 1,
        id: "cita-consulado",
        titulo: "Pedir cita en el consulado para el visado",
        offset: 90,
        critico: true,
        desc: "Es el cuello de botella real de todo el proceso. Las citas se agotan y no hay forma de acelerarlas. Pídela aunque todavía no tengas ni un solo papel reunido: primero la fecha, los documentos después.",
        nota: "Bloquea absolutamente todo lo demás.",
        paises: [{
            nombre: "Perú",
            texto: 'La cita no se pide en el consulado directamente, sino en línea a través de BLS: <a href="https://peru.blsspainglobal.com/Global/home/index" target="_blank" rel="noopener">peru.blsspainglobal.com</a>. Crea una cuenta y entra en <strong>«Reservar una nueva cita»</strong>.'
        }]
    },
    {
        fase: 1,
        id: "antecedentes",
        titulo: "Sacar el certificado de antecedentes penales",
        offset: 78,
        desc: "Lo emite la autoridad judicial o policial de tu país. El plazo cambia muchísimo de un país a otro: en algunos sale al instante desde una web y en otros hay que pedir cita e ir en persona. Averigua cuál es tu caso cuanto antes, porque la diferencia entre uno y otro son semanas.",
        nota: "Tiene fecha de caducidad, así que tampoco te adelantes de más: si lo sacas demasiado pronto puede llegar caducado al día de la cita.",
        paises: [{
            nombre: "Perú",
            texto: 'Se solicita en línea y sale <strong>al instante</strong>: <a href="https://www.gob.pe/326-antecedentes-penales" target="_blank" rel="noopener">gob.pe/326-antecedentes-penales</a>. Antes hay que pagar la tasa en <a href="https://pagalo.pe" target="_blank" rel="noopener">pagalo.pe</a> con el código de trámite <strong>03670</strong>.'
        }]
    },
    {
        fase: 1,
        id: "apostillar-antecedentes",
        titulo: "Apostillar los antecedentes penales",
        offset: 74,
        desc: "Igual que con el certificado médico: el documento por sí solo no vale fuera de tu país. Necesita la apostilla de La Haya, que emite el ministerio de exteriores, no quien expidió el certificado.",
        nota: "Aquí es donde se va el tiempo de verdad. La emisión puede ser instantánea y aun así la apostilla llevarte días.",
        paises: [{
            nombre: "Perú",
            texto: 'Misma vía que la del certificado médico: en línea por <a href="http://portal.rree.gob.pe/sitepages/apostilla.aspx" target="_blank" rel="noopener">portal.rree.gob.pe</a>, o presencialmente en un <strong>centro MAC</strong> de los que hay en muchos centros comerciales. Si tienes varios documentos por apostillar, llévalos juntos en el mismo viaje.'
        }]
    },
    {
        fase: 1,
        id: "certificado-medico",
        titulo: "Sacar el certificado médico en un centro autorizado",
        offset: 68,
        desc: "No vale cualquier consultorio: tiene que ser un centro reconocido, y el certificado debe indicar que no padeces enfermedades que puedan tener repercusión para la salud pública según el Reglamento Sanitario Internacional. Cada consulado exige una redacción concreta y publica su propia lista de centros aceptados.",
        nota: "Pide el modelo exacto y la lista de centros ANTES de ir al médico. Es habitual tener que repetirlo entero por una frase mal puesta. Y recuerda cuál es el único criterio: la salud pública. Si durante la revisión te encuentran algo que no tiene nada que ver con eso y te ofrecen un tratamiento para «levantar la observación», pregunta directamente si eso hace que el certificado salga negativo.",
        paises: [{
            nombre: "Perú",
            texto: "Pide en el consulado la lista vigente de centros aceptados antes de reservar cita. No te fíes de listas que circulen por foros o grupos: cambian, y un certificado emitido en un centro no reconocido no se puede arreglar después. Al reservar, pregunta ya si tramitan también el aval y la apostilla.<br><br><strong>Ojo con las ventas dentro del propio examen.</strong> Es conocido el caso del odontólogo que detecta caries y ofrece un paquete de profilaxis de unos 150 soles para «levantar la observación». Una caries no tiene ninguna relación con el Reglamento Sanitario Internacional. Al preguntarle directamente si eso haría salir negativo el certificado, la respuesta fue que no lo sabía, que dependía del médico del final. Se puede declinar y seguir con el examen sin ningún problema."
        }]
    },
    {
        fase: 1,
        id: "aval-certificado-medico",
        titulo: "Conseguir el aval del colegio médico",
        offset: 63,
        desc: "El certificado por sí solo no sirve. Antes de poder apostillarlo, el colegio profesional de médicos tiene que avalar que quien lo firmó es un doctor colegiado en activo. <strong>Pregunta en el mismo centro si ellos se encargan de todo:</strong> muchos ofrecen el servicio completo, aval y apostilla incluidos, y suele compensar. Pagas algo más y te quitas dos gestiones de encima.",
        nota: "Este es el paso invisible que descuadra el calendario, porque casi nadie sabe que existe hasta que le rechazan el documento.",
        paises: [{
            nombre: "Perú",
            texto: 'Aval Médico del Colegio Médico del Perú, que se puede tramitar en línea o presencialmente: <a href="https://cmp.org.pe/avalmedico/" target="_blank" rel="noopener">cmp.org.pe/avalmedico</a>. Cuenta con unos <strong>3 días</strong>.'
        }]
    },
    {
        fase: 1,
        id: "apostillar-certificado-medico",
        titulo: "Apostillar el certificado médico",
        offset: 61,
        desc: "Con el aval ya conseguido, el último paso es la apostilla de La Haya, que es lo que hace que el documento tenga validez internacional y España lo acepte. La emite el ministerio de exteriores de tu país, no el colegio médico.",
        nota: "Ojo con las prisas por adelantarte: el certificado médico caduca, así que tampoco puedes sacarlo con demasiada antelación para ir sobrado. La ventana es más estrecha de lo que parece.",
        paises: [{
            nombre: "Perú",
            texto: 'Dos vías: en línea por la plataforma del Ministerio de Relaciones Exteriores, <a href="http://portal.rree.gob.pe/sitepages/apostilla.aspx" target="_blank" rel="noopener">portal.rree.gob.pe</a>, o presencialmente en un <strong>centro MAC</strong>. Los MAC están repartidos por muchos centros comerciales, así que no hace falta desplazarse hasta el ministerio. Suele salir en <strong>1 día</strong>.'
        }]
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
        desc: "Aquí es donde más gente se queda corta, porque son <strong>dos cantidades que se suman</strong>, no una. <strong>1) El curso completo:</strong> lo que ya hayas pagado de matrícula cuenta y se descuenta, así que lo abonado más lo que tengas en la cuenta tiene que cubrir el precio anual entero. <strong>2) Tu manutención:</strong> se calcula sobre el IPREM del año en curso, por los meses que dure tu estancia. Se acredita con extractos bancarios, carta de patrocinio o resolución de beca.",
        nota: "Guarda todos los justificantes de lo que ya hayas pagado a la universidad: cada euro abonado es un euro menos que tienes que tener en el banco. Y una cuenta abierta la semana pasada levanta sospechas: cuanto más histórico tenga, mejor."
    },
    {
        fase: 1,
        id: "expediente-visado",
        titulo: "Presentar el expediente de visado",
        offset: 55,
        critico: true,
        desc: "Formulario nacional, pasaporte con vigencia suficiente, carta de admisión, matrícula, y todo lo anterior. Más fotos y la tasa correspondiente. <strong>Plantéate que una agencia con experiencia en visados de estudios te revise la carpeta antes de entregarla:</strong> el formulario esconde errores que tú no vas a ver, y ellos lo corrigen y lo reimprimen. Cuesta poco comparado con perder la cita.",
        nota: "Si va incompleto pierdes la cita y vuelves al final de la cola. Por eso una revisión previa sale barata: no estás pagando por el trámite, estás pagando por no repetirlo.",
        paises: [{
            nombre: "Perú",
            texto: "Las agencias con experiencia en visados de estudios suelen cobrar alrededor de <strong>100 soles</strong> por revisar el expediente. El fallo más habitual que detectan está en el formulario que se entrega a BLS.<br><br><strong>El día de la cita, lleva efectivo y lleva sencillo.</strong> En BLS se paga en metálico, así que ve con margen de sobra: unos 600 soles cubrieron el trámite en 2026. Y no lleves solo billetes grandes. Por faltarte un sol puedes acabar bajando a la calle a buscar cambio y volviendo a subir, con la cola y el tiempo que eso supone.<br><br>Revisa además la factura antes de pagar: es habitual que te añadan servicios adicionales que no necesitas. La foto sí suele hacer falta; el resto de extras que te ofrezcan los puedes rechazar sin problema."
        }]
    },

    {
        fase: 2,
        id: "buscar-alojamiento",
        titulo: "Empezar a buscar alojamiento",
        offset: 50,
        critico: true,
        desc: "Alquilar en remoto desde otro continente es donde ocurren casi todas las estafas de este proceso. Nunca pagues una fianza sin contrato firmado y sin haber verificado que el propietario existe.<br><br><strong>Y no te fíes de la distancia en el mapa.</strong> Que un piso esté a 15 km de tu facultad no significa que llegues rápido: el transporte público en España da muchas vueltas para cubrir barrios, y un trayecto que parece corto se te puede ir a hora y pico. Antes de decidirte, coge Google Maps, pon la dirección del piso y pide indicaciones hasta tu centro de estudios <strong>en horario de clase</strong>. Vas a llevarte sorpresas, y es mejor llevárselas ahora que en octubre a las siete de la mañana.",
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
        desc: "Lo ideal es llegar entre diez y catorce días antes del primer día de clase. Ese margen es lo que separa un primer mes tranquilo de un desastre.<br><br><strong>Y si vas solo, tranquilo.</strong> Los aeropuertos españoles están bien comunicados: hay metro y autobús hasta el centro sin necesidad de taxi ni de que nadie te recoja. Compra un billete de varios viajes nada más llegar y ve hasta la parada de metro o autobús más cercana a tu alojamiento. No necesitas resolver nada más ese primer día.",
        nota: "Todo lo que viene a continuación se cuenta desde el día que entras en España."
    },

    {
        fase: 3,
        id: "cita-tie",
        titulo: "Pedir cita previa para la TIE",
        offset: 11,
        critico: true,
        desc: "Lo más importante de toda la lista, y casi nadie lo sabe: la cita se pide ANTES de tener los papeles listos, porque las citas van a semanas de distancia. Si esperas a tener el empadronamiento, te sales del plazo legal.<br><br>La cita se pide en la <strong>provincia donde te has empadronado</strong>, pero <strong>vale cualquier comisaría de Policía Nacional de esa provincia</strong>, no solo la de tu municipio. Ahí está el truco: si en la capital no queda ni un hueco, mira las comisarías de los municipios de alrededor. Suelen tener mucha menos demanda y te ahorras semanas de espera por un trayecto de media hora.",
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
        desc: "Algunos bancos abren cuenta de no residente solo con pasaporte; otros exigen la TIE. Un número español lo vas a necesitar para casi cualquier cita previa y para recibir SMS de verificación.<br><br><strong>La línea de móvil resuélvela el primer día.</strong> Puedes comprarla en el mismo aeropuerto, o contratar una eSIM por internet antes de viajar y llegar con número español ya activo. No lo dejes para más adelante: sin un número de aquí no puedes pedir casi ninguna cita previa.",
        nota: "Si un banco te pone pegas, prueba en otro. Las políticas varían mucho entre entidades.",
        paises: [{
            nombre: "Perú",
            texto: "En BLS a veces regalan una SIM española para que la actives nada más aterrizar. Pregunta cuando vayas a tu cita: si te la dan, te ahorras la gestión del primer día."
        }]
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
pintarTotales();
restaurarFecha();
actualizarProgreso();

/*
 * El número de pasos se escribe desde los datos, nunca a mano.
 * Añadir o dividir un paso no puede dejar el texto desincronizado.
 */
function pintarTotales() {
    document.querySelectorAll("[data-total-pasos]").forEach((el) => {
        el.textContent = TRAMITES.length;
    });
}

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
                <div class="fase-pasos">
        `;

        TRAMITES.filter((t) => String(t.fase) === numero).forEach((t) => {
            html += `
                <article class="tramite${t.critico ? " es-critico" : ""}${hechos[t.id] ? " hecho" : ""}" id="t-${t.id}">
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

                        ${(t.paises || []).map((p) => `
                            <p class="pais">
                                <span class="pais-etq">En ${p.nombre}</span>
                                ${p.texto}
                            </p>
                        `).join("")}

                        <p class="fecha" data-offset="${t.offset}">
                            <span class="fecha-vacia">Introduce tu fecha de inicio arriba para ver cuándo toca</span>
                        </p>
                    </div>
                </article>
            `;
        });

        html += "</div></section>";
    });

    listado.innerHTML = html;

    document.querySelectorAll(".casilla").forEach((casilla) => {
        casilla.addEventListener("change", () => {
            hechos[casilla.dataset.id] = casilla.checked;

            casilla
                .closest(".tramite")
                .classList.toggle("hecho", casilla.checked);

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

    const cinta = document.getElementById("cintaProgreso");
    if (cinta) {
        cinta.style.width = `${pct}%`;
    }
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
