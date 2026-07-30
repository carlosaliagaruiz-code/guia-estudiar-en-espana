# Guía de aterrizaje en España

Guía gratuita para estudiantes internacionales que llegan a España a estudiar:
los 19 pasos del proceso en el orden correcto, con las fechas calculadas hacia
atrás desde el primer día de clase.

**No se recoge ningún dato.** Sin registro, sin cookies, sin analítica y sin
publicidad. La fecha que introduce el visitante y las casillas que marca se
guardan únicamente en su propio navegador y nunca salen de él.

---

## Por qué existe

Estudiar fuera implica una veintena de trámites que dependen unos de otros, y
casi nadie te explica el orden. La cadena crítica es esta:

```
contrato de alquiler  →  empadronamiento  →  TIE
```

Sin una dirección a tu nombre no hay padrón, y sin padrón se complica todo lo
demás. Cuando te enteras de eso ya sueles llegar tarde.

Esta guía se escribió desde la experiencia de haber pasado por el proceso, para
que quien venga detrás no pierda las mismas semanas.

---

## Cómo proponer una corrección

**Esto es lo más importante del repositorio.** Los requisitos, los importes y
los plazos cambian cada año, y varían según consulado, comunidad autónoma y
universidad. Una guía así envejece sola.

Si has hecho algún trámite y te has encontrado con que aquí dice otra cosa:

- Abre un [issue](../../issues) contando qué dice la guía, qué te encontraste
  tú y —si puedes— el enlace oficial que lo respalde.
- O manda directamente un pull request.
- O escribe a la dirección de contacto que aparece al final de la guía.

Cualquiera de las tres vale. Lo que importa es que el dato llegue.

---

## Estructura

```
index.html        La guía completa
css/guia.css      Estilos, incluida la hoja para imprimir
js/guia.js        Los 19 pasos como datos, calculadora de fechas y progreso
```

Los pasos viven en el array `TRAMITES` de `js/guia.js`. Cada uno lleva:

| Campo | Qué es |
|---|---|
| `fase` | En cuál de las 5 fases del proceso cae |
| `offset` | Días antes del primer día de clase en que conviene tenerlo resuelto |
| `critico` | Si forma parte de la cadena crítica |
| `desc` / `nota` | El texto que ve el visitante |

**Para corregir un paso solo hay que tocar ese array.** La lista visible y la
calculadora de fechas se generan desde ahí, así que no pueden desincronizarse.

---

## Verlo en local

No hay build ni dependencias. Abre `index.html` en el navegador.

Si prefieres servirlo por HTTP:

```bash
python -m http.server 5173
```

Y entra en `http://localhost:5173`.

---

## Aviso

Esto **no es asesoramiento jurídico**. Es una guía de organización. No
sustituye a un abogado ni a lo que diga tu consulado, que es la única autoridad
sobre tu expediente. Los plazos y requisitos aquí son orientativos y pueden
haber cambiado.

Verifica siempre en la fuente oficial:

- [Portal de Inmigración](https://extranjeros.inclusion.gob.es)
- [Ministerio de Asuntos Exteriores](https://www.exteriores.gob.es)
- [Sede electrónica de Administraciones Públicas](https://sede.administracionespublicas.gob.es)
- La web del ayuntamiento de tu ciudad, para el empadronamiento
