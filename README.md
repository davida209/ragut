# RagUT

Campus educativo de demostración con cursos breves, avance por lección, evaluaciones y recuperación local de fragmentos documentales.

Demo de portafolio de **Lester David Uicab Gongora**. Reconstrucción independiente, desarrollada con Vite, JavaScript, HTML y CSS.

## Funcionalidades

- Acceso como estudiante demo sin contraseña ni cuenta real.
- Tres cursos, nueve lecciones y ejercicios de práctica.
- Marcado de lecciones y progreso persistente.
- Evaluaciones con resultados y revisión de respuestas.
- Consulta por palabras con fragmentos y fuentes visibles.
- Biblioteca con archivos .txt o .md de hasta 50 KB, máximo 10 documentos propios.

## Ejecutar

Requiere Node.js 22.12 o superior. Abre una terminal en esta carpeta:

```bash
npm ci
npm run dev
```

## Validar y compilar

```bash
npm test
npm run build
npm run preview
```

Las pruebas de Node.js validan la lógica del dominio. GitHub Actions ejecuta instalación, pruebas y compilación en pull requests y cambios de main/develop.

## Recorrido de prueba

1. Entra al campus con el nombre precargado.
2. Empieza Fundamentos de desarrollo web y marca una lección.
3. Responde la evaluación y consulta el resultado.
4. En Consulta documental, prueba ¿Qué es una API?.
5. En Biblioteca, carga un archivo .txt ficticio y consulta palabras de su contenido.

## Persistencia y alcance

No conecta un modelo de IA, un sistema académico ni una autenticación real. La consulta usa coincidencias de palabras y devuelve fragmentos existentes; no genera respuestas externas. Los archivos solo se leen y guardan en el navegador. La ruta /login se conserva mediante la reescritura de Vercel.

Los datos se guardan en localStorage bajo la clave `les-ragut-v1`. No hay servidor, cuentas reales ni sincronización entre dispositivos. Para reiniciar la demo, utiliza Reiniciar demo en el pie de página y confirma el restablecimiento. Utiliza datos ficticios y evita documentos sensibles.

## Estructura

```text
src/main.js       Interfaz y eventos
src/model.js      Catálogo y reglas del dominio
src/utils.js      Almacenamiento, diálogos y utilidades
src/style.css     Estilos y diseño adaptable
public/           Recursos estáticos
tests/            Pruebas de lógica
vercel.json       Compilación y reescritura de rutas
```

Cada carpeta es autosuficiente. No importa archivos de los otros proyectos. Puedes modificar datos y reglas en model.js, la interfaz en main.js y el diseño en style.css.

## Git y despliegue

Sube solamente esta carpeta a su propio repositorio. No subas node_modules, dist, .env ni .vercel. El archivo .gitignore ya los excluye.

```bash
git init -b main
git add .
git commit -m "feat: add ragut demo"
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```

Crea primero un repositorio vacío, sin README inicial, para evitar historiales distintos. Para trabajar en equipo, utiliza develop como rama de integración y ramas feature/* para cambios, con pull requests y comprobaciones antes de integrar en main.

En Vercel: framework Vite, instalación npm ci, compilación npm run build, salida dist. No requiere variables de entorno.

Para conservar **https://ragut.vercel.app/login**, conecta este repositorio al proyecto de Vercel que ya tiene ese dominio; no crees otro proyecto para reemplazarlo. Lee la guía de la carpeta principal.

## Recursos visuales

Las ilustraciones y composiciones se dibujan con CSS, sin depender de servicios de imágenes.

Las fuentes se incluyen en `public/fonts`, con sus licencias OFL. No se requiere Google Fonts para visualizar el diseño.
