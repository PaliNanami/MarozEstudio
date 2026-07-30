# PROMPT DE ALTA FIDELIDAD: LANDING PAGE DE NODO ESTUDIO

Usa este prompt en cualquier IA de generación de código (como Claude, GPT-4, Cursor, v0 o Gemini) para reconstruir o perfeccionar la página de aterrizaje de NODO.

---

```text
Actúa como un Diseñador UX/UI Senior y Desarrollador Frontend Experto en Tailwind CSS/Vanilla CSS y HTML5. Tu tarea es generar una página de aterrizaje (landing page) de una sola página (single-page app) que sea ultra-premium, moderna, limpia, y totalmente adaptada para dispositivos móviles y de escritorio. La página de referencia de estructura es "Espacios que conectan", pero el rediseño completo de marca, contenido, servicios y paleta de colores corresponde a "NODO: Diseño Estratégico para Negocios Reales".

---

### 🎨 1. PAUTA DE DISEÑO, BRANDING Y SISTEMA VISUAL
- **Colores Base:**
  - Fondo Principal: Blanco puro (`#FFFFFF`).
  - Fondos Secundarios y Secciones de Contraste Limpio: Crema/Arena suave (`#F5F4F0`).
  - Textos Principales, Títulos Oscuros y Footer: Gris Carbón Profundo Moderno (`#1A1A1A`).
- **Color de Acento (CRÍTICO):**
  - Turquesa vibrante y sofisticado (`#02D4D5` o teal similar) utilizado EXCLUSIVAMENTE para resaltar: números de pasos, iconos de checkbox, badges flotantes, iconos de tarjetas y botones de llamado a la acción (CTA) principales.
- **Tipografía:**
  - Títulos/Encabezados (H1, H2, H3, H4): Tipografía geométrica sans-serif de alta gama (p. ej., 'Poppins' o 'Satoshi'). Peso: Bold (700) y Extra Bold (800).
  - Texto de Cuerpo y Listas: Tipografía sans-serif altamente legible y limpia (p. ej., 'Inter' o 'Lato'). Peso: Light (300) y Regular (400).
- **Estilo de Interfaz (UI):**
  - Densidad visual media-alta, espaciado elegante (padding amplio de 100px para secciones en desktop).
  - Sombras muy sutiles (`0 10px 40px rgba(0,0,0,0.04)`) para dar sensación de flotación.
  - Efecto Glassmorphism en tarjetas flotantes y menús.
  - Micro-animaciones al pasar el cursor (hover): los botones se elevan levemente, las tarjetas de precios se desplazan verticalmente (-12px) y tienen una iluminación turquesa muy suave en el borde.
  - Transiciones suaves (`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`) en todos los elementos interactivos.

---

### 🧱 2. ESTRUCTURA DE SECCIONES Y CONTENIDO (COPYWRITING EN ESPAÑOL)

#### SECCIÓN 1: BARRA DE NAVEGACIÓN (HEADER STICKY)
- **Izquierda:** Logo de NODO ESTUDIO. Utiliza un isotipo SVG de línea fina (un prisma con una ventana inclinada) a la izquierda, y al lado el texto "nodo" en minúscula con amplio espaciado entre letras, y abajo en pequeño "ESTUDIO" centrado.
- **Centro (Links de navegación):** Qué hacemos | Proceso | Colecciones | Quiénes somos | Contacto.
- **Derecha (Botón CTA):** Botón turquesa sólido con texto "[ Agendar Diagnóstico ]".
- **Comportamiento:** Sticky (fijado arriba), fondo translúcido blanco con desenfoque (backdrop-filter: blur) y borde inferior muy sutil.

#### SECCIÓN 2: HERO SPLIT-SCREEN (PANTALLA DIVIDIDA)
- **Diseño:** 2 columnas en desktop, se apilan en 1 columna en mobile.
- **Columna Izquierda (Texto y CTA):**
  - Badge superior turquesa en mayúsculas: "ARQUITECTURA + BRANDING + INTERIORISMO"
  - Encabezado principal (H1): "Diseñamos espacios \n que hacen crecer \n tu negocio." (La palabra "crecer" formateada en cursiva utilizando una tipografía serif premium como Playfair Display y un efecto de subrayado animado de dibujo en SVG en color turquesa).
  - Subencabezado: "Diseño estratégico para negocios"
  - Checklist (2x2 grid) con iconos de verificación turquesas:
    * Strategy / Estrategia Comercial
    * Layout / Distribución Funcional
    * Brand / Coherencia de Marca
    * Playbook / NODO Plan de Acción Comercial
  - Botón CTA principal: Botón turquesa sólido grande con icono de calendario: "[ 📅 Quiero mi Plan de Acción ]"
- **Columna Derecha (Visual):**
  - Carrusel de imágenes de alta tecnología con transición de máscara circular animada (clip-path circle reveal) y cambio de escala, rotando de forma automática cada 4 segundos. Contiene 4 imágenes arquitectónicas libres de derechos del portafolio:
    1. Café minimalista estilo japonés, moderno y minimalista (`assets/cafe-japones.png`).
    2. Diseño lúdico y creativo que representa una boutique de iluminación (`assets/tienda-luces.png`).
    3. Barbería clásica y de lujo (`assets/barberia-clasica.png`).
    4. Panadería artesanal de diseño de autor, vacía, sin personas (`assets/panaderia-diseno.png`).
  - Cada slide cuenta con un badge flotante semi-translúcido en la esquina superior izquierda indicando el nombre del proyecto y un indicador de estado turquesa parpadeante (`animate-pulse`).
  - Superposición de una cuadrícula técnica sutil (grid overlay) y botones indicadores (dots) interactivos en la parte inferior derecha.
  - Tarjeta superpuesta (Overlay Card) en la esquina inferior izquierda/debajo con fondo gris carbón profundo, texto blanco e indicador turquesa:
    * Texto: "No diseñamos locales bonitos. Diseñamos negocios que se ven, se entienden y venden."
    * Firma: "— NODO ESTUDIO"

#### SECCIÓN 3: QUÉ HACEMOS (5 COLUMNAS HORIZONTALES)
- **Diseño:** Grid de 5 columnas horizontales en desktop que se adaptan a 2 columnas en tablet y 1 en mobile.
- **Contenido (Tarjetas minimalistas con fondo blanco e icono turquesa en círculo):**
  - Col 1: Atraer más clientes de paso. (Icono: usuarios/ojo)
  - Col 2: Alinear tu tienda física con tu Instagram. (Icono: cámara/instagram)
  - Col 3: Eliminar cuellos de botella en caja. (Icono: flujos/flechas cruzadas)
  - Col 4: Mejorar la experiencia de compra. (Icono: destello/estrella)
  - Col 5: Escalar y rentabilizar tu espacio. (Icono: gráfico alcista)

#### SECCIÓN 4: CÓMO TRABAJAMOS (EMBUDO DE 4 PASOS CON TIMELINE DILUIDO)
- **Diseño:** Línea de tiempo horizontal con una línea discontinua suave que conecta los pasos. Cada paso tiene una insignia circular turquesa con el número.
- **Paso 1:** ELIGE TU COLECCIÓN.
  * Texto: "Selecciona el estilo base que define tu negocio (Minimalismo Zen Japonés o la magia de la Fantasía Creativa)."
- **Paso 2:** AGENDA EN LÍNEA.
  * Texto: "Reserva tu Diagnóstico Inicial en nuestro calendario automatizado. Proceso 100% transparente. Inversión: $150.000 CLP."
- **Paso 3:** RECIBE TU DIAGNÓSTICO.
  * Texto: "En la segunda sesión te entregamos tu 'NODO Playbook': el plan de acción comercial con mapa de semáforos y layout de flujos conceptuales."
- **Paso 4:** AVANZA CON NOSOTROS.
  * Texto: "Iniciamos la Etapa 2 de Arquitectura y Branding final. Los $150.000 de tu diagnóstico se abonan al 100% al total del proyecto."

#### SECCIÓN 5: PAQUETES Y PRECIOS (CUADRÍCULA DE 3 TARJETAS)
- **Diseño:** Grid de 3 tarjetas en desktop. La tarjeta del centro (Proyecto Integral NODO) es la destacada (Featured), tiene un borde turquesa y una insignia flotante superior "Más Solicitado".
- **Tarjeta 1: PLAN DE ACCIÓN COMERCIAL (Etapa 1)**
  - Imagen temática de moodboard y materiales arriba.
  - Subtítulo: "Etapa 1"
  - Título: "Plan de Acción Comercial"
  - Características (con checkmarks verdes/turquesas):
    * Escáner de dolores del local (Semáforo)
    * Layout de flujos conceptuales y circulación
    * Dirección de atmósfera y referentes estéticos
    * Identificación del producto estrella y visual merchandising
  - Precio: "CLP $150.000"
  - Botón: Botón turquesa sólido "[ Agendar Mi Plan ]"
- **Tarjeta 2: PROYECTO INTEGRAL NODO (Etapa 2) [DESTACADA]**
  - Imagen temática de plano e interiorismo comercial arriba.
  - Subtítulo: "Etapa 2"
  - Título: "Proyecto Integral NODO"
  - Características:
    * Planos ejecutivos completos de arquitectura
    * Diseño de mobiliario comercial a medida
    * Especificación de iluminación técnica y materiales
    * Branding final y diseño de packaging
    * Manual de normas gráficas y cartelería exterior
  - Precio: "Cotización a medida" (Subtexto: "Menos los $150.000 abonados")
  - Botón: Botón turquesa sólido "[ Cotizar Proyecto ]"
- **Tarjeta 3: NODO KITS (Solución Lista)**
  - Imagen temática de retail / tienda física moderna arriba.
  - Subtítulo: "Solución Lista"
  - Título: "NODO Kits"
  - Características:
    * Manual de distribución espacial tipo (layout modular)
    * Logotipo base editable de la colección elegida
    * Plantillas de redes sociales diseñadas en Canva
    * Guía de compras express (enlaces de tiendas locales)
  - Precio: "Valores Estándar"
  - Botón: Botón outline turquesa "[ Ver NODO Kits ]"

#### SECCIÓN 6: QUIÉNES SOMOS (EL ESTUDIO)
- **Diseño:** Layout de 2 columnas en desktop, se apila en 1 en mobile.
- **Columna Izquierda (Texto):**
  - Subtítulo: "El Estudio"
  - Título H2: "Quiénes Somos"
  - Párrafo 1: "NODO es un estudio fundado y liderado por mujeres arquitectas apasionadas por el poder transformador del diseño en los negocios físicos."
  - Párrafo 2: "Creemos que la arquitectura comercial no debe ser solo estética; debe ser una herramienta estratégica de ventas. Combinamos la distribución espacial, la experiencia del usuario (UX espacial) y la identidad de marca para crear tiendas y locales memorables, eficientes y altamente rentables."
  - Grid de 3 estadísticas: "100% Diseño Comercial", "2 Etapas Claras", "∞ Pasión Comercial".
- **Columna Derecha (Imagen):**
  - Imagen representativa del equipo de NODO Estudio en su espacio de diseño (`assets/contact-bg.jpg`).

#### SECCIÓN 7: BANNER HÍBRIDO DE CONTACTO
- **Diseño:** Caja con fondo crema suave, bordes redondeados y un gráfico diagonal decorativo turquesa traslúcido a la derecha.
- **Título:** "¿Te enamoraste de un NODO Kit pero necesitas adaptarlo a tu local?"
- **Cuerpo:** "Sabemos que cada espacio tiene sus propias reglas. Si buscas la rapidez de un kit listo pero requieres modificar medidas, colores o la distribución para adaptarlo a tus metros cuadrados reales, nosotras lo hacemos por ti."
- **Botón CTA (Derecha):** Botón turquesa sólido con icono de mensaje: "[ ✉️ Solicitar Modificación a Medida ]"

#### SECCIÓN 8: FOOTER PROFESIONAL (OSCURO)
- **Fila Superior CTA:** Barra en gris carbón intermedio con el texto: "¿Listo para transformar tu local en tu mejor vendedor?" y a la derecha un botón turquesa redondeado "[ Hablemos por WhatsApp ]".
- **Footer Principal (Gris Carbón Profundo):**
  - Columna 1: Logo NODO Estudio (SVG en turquesa y blanco) y descripción del estudio.
  - Columna 2: Enlaces rápidos (Qué hacemos, Proceso, Colecciones, Quiénes somos, Contacto).
  - Columna 3: Información de contacto (Santiago, Chile | contacto@nodoestudio.cl) e iconos de redes sociales (Instagram, LinkedIn).
  - Barra inferior de derechos de autor con diseño limpio y tipografía en gris apagado.

---

### 🛠️ 3. INSTRUCCIONES TÉCNICAS DE IMPLEMENTACIÓN
1. Genera un código HTML5 estructurado semánticamente, utilizando etiquetas `header`, `section`, `main`, `footer`, `nav`.
2. Para los iconos, utiliza la librería **Lucide Icons** o iconos SVG directos para evitar retardos de carga y asegurar personalización de estilos.
3. Asegura que el navbar sea completamente responsive y que en mobile muestre un menú tipo hamburguesa funcional usando JavaScript simple.
4. Añade animaciones de entrada progresiva (fade-in-up) mediante Intersection Observer en JavaScript para que la página cobre vida mientras el usuario hace scroll down.
5. El código debe estar contenido en archivos separados: `index.html`, `styles.css` y `app.js` para asegurar mantenibilidad.
```
