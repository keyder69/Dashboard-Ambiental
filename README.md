# Vivero Umbral — Sala de control ambiental

Panel de control para un invernadero urbano de cultivo vertical. Muestra las lecturas ambientales en vivo (temperatura, humedad, CO₂, conductividad electrica de la solucion nutritiva), la curva de clima de las ultimas 24 horas, el registro de alarmas de los sensores y el estado de cada zona de cultivo.

## Estructura del proyecto

```
vivero-umbral-dashboard/
├── index.html      # Estructura semantica del panel
├── styles.css      # Layout con Grid + Flexbox, variables, media queries
├── script.js       # Colapsar sidebar (escritorio) y cajon movil
└── README.md
```

## Tecnologias usadas

- **HTML5 semantico**: `<aside>`, `<nav>`, `<header>`, `<main>`, `<table>`, `<footer>`, roles ARIA complementarios.
- **CSS Grid** para el esqueleto de la pagina (sidebar / header / main / footer) mediante `grid-template-areas`.
- **Flexbox** para los componentes internos: gauges, filas de la tabla, barra superior, listas de navegacion y el registro de alarmas.
- **SVG dibujado a mano** para los gauges radiales y el grafico de clima (sin librerias).
- **Custom properties (variables CSS)** para color, tipografia y transiciones.
- **JavaScript vanilla** para el sidebar colapsable y el menu movil.
- Tipografias de Google Fonts: **Space Grotesk** (interfaz) + **JetBrains Mono** (lecturas de sensores, siempre que el dato sea una medicion real, no una etiqueta decorativa).

## Componentes principales del dashboard

1. **Barra lateral de navegacion** con la marca del sistema, secciones operativas, contador de pedidos y un indicador de estado del sistema en vivo (punto verde con "glow", como un LED de panel). Colapsable a un riel de iconos en escritorio; cajon superpuesto en movil.
2. **Encabezado superior** con el titulo de la vista, un buscador estilo consola (`> buscar…`), notificaciones y la placa del operador de turno.
3. **Gauges radiales** de temperatura, humedad, CO₂ y conductividad electrica, cada uno con su color de estado (verde en rango, ambar fuera del objetivo).
4. **Grafico de clima** de 24 horas sobre una rejilla tipo osciloscopio, con dos series (temperatura y humedad) y una descripcion textual equivalente en `aria-label`.
5. **Registro de alarmas** con marca de severidad al margen y hora de cada evento.
6. **Tabla de zonas de cultivo** con especie, etapa, dias a cosecha, estado y proxima accion; se convierte en tarjetas apiladas en movil.
7. **Footer informativo** con version del sistema, enlaces y tiempo de actividad continua.

## Decisiones de diseño

El punto de partida fue el objeto real: un controlador de clima de invernadero (tipo Argus o Priva), no una plantilla de dashboard generica.

- **Color**: fondo casi negro verdoso (`#0A100D`), como una sala de control por la noche, pero sin depender de un solo acento de marca — cada lectura usa el color que ya tienen los propios indicadores de un sensor: verde cuando esta en rango, ambar cuando se acerca al limite, rojo cuando es critico, y un cian independiente para la segunda serie de datos del grafico (humedad), de modo que ningun color hace doble funcion.
- **Tipografia**: **Space Grotesk** para toda la interfaz (nav, titulos, texto); **JetBrains Mono** reservado exclusivamente para lecturas reales de instrumentos — los numeros de los gauges, los ejes del grafico, la hora de cada alarma — igual que un instrumento de laboratorio o una consola de control mostraria sus mediciones. No se usa monoespaciado en textos que no son datos.
- **Los gauges radiales** reemplazan a las tarjetas de resumen con icono en un cuadro de color: son el mismo dispositivo que usaria un panel de climatizacion real para mostrar una lectura contra un rango objetivo.
- **El grafico de clima** imita la pantalla de un osciloscopio (rejilla fina, curvas nitidas) en lugar de un grafico de barras generico, porque asi es como se ve de verdad una lectura continua de sensores.
- **Layout**: Grid ordena el esqueleto completo de la pagina; Flexbox resuelve lo que vive dentro de cada bloque (gauge + lectura, fila de tabla, item del registro de alarmas).
- **Interaccion**: el sidebar colapsable libera espacio para el grafico y la tabla, y recuerda su estado en la sesion. El unico brillo animado es el punto de estado del sistema en la barra lateral; el resto de las transiciones responde a acciones del usuario

## Accesibilidad

- Roles ARIA explicitos: `role="main"`, `role="banner"` y `role="contentinfo"` reforzados porque estan anidados dentro de `.layout` y podrian perder su rol implicito; `aria-label` en cada `<nav>`.
- Enlace "Saltar al contenido principal" visible al recibir foco.
- Los gauges y el grafico, al ser SVG, se marcan con `role="img"` y un `aria-label` que describe la lectura completa en palabras, para que la informacion no dependa de interpretar un arco o una curva.
- Todos los botones de solo icono (`menu-toggle`, `bell`, `collapse-btn`) tienen `aria-label` descriptivo, y su estado abierto/cerrado se expone con `aria-expanded`.
- La tabla usa `<caption>` oculto, encabezados `<th scope="col">` y `data-label` en cada celda para conservar el nombre de columna en la vista apilada de movil.
- Navegacion completa por teclado con `:focus-visible` de alto contraste; el cajon movil se cierra con <kbd>Esc</kbd>.
- Contraste verificado sobre el fondo `#0A100D`: el texto principal (`#E7F2E9`) supera 15:1, el texto secundario (`#9DB8A9`) se mantiene sobre 6:1, y los tres colores de estado (verde `#6FE38B`, ambar `#E8B44E`, rojo `#E96B52`) superan holgadamente 8:1 al usarse como texto o icono.
- Se respeta `prefers-reduced-motion`.

## Responsividad

| Punto de quiebre | Comportamiento |
|---|---|
| **Escritorio** (`> 1024px`) | Sidebar completo, colapsable a riel de iconos. Cuatro gauges en fila, grafico y registro de alarmas en dos columnas. |
| **Tablet** (`≤ 1024px`) | Sidebar se reduce automaticamente a riel de iconos. Gauges en 2×2, grafico y alarmas en una columna. |
| **Movil** (`≤ 720px`) | Sidebar se convierte en un cajon lateral activado desde el header. La tabla de zonas se transforma en tarjetas apiladas. |
| **Movil pequeño** (`≤ 420px`) | Gauges en una sola columna. |

