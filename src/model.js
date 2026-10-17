export const courses = [
  {
    id: "web",
    name: "Fundamentos de desarrollo web",
    category: "Desarrollo",
    color: "#405ac4",
    icon: "</>",
    description:
      "Del navegador a tu primera interfaz: estructura, estilos y comportamiento.",
    lessons: [
      {
        id: "html",
        title: "La estructura de una página",
        text: "HTML define el significado del contenido. Los encabezados organizan la lectura; los enlaces conectan destinos y los formularios recogen entradas. Un documento accesible utiliza elementos semánticos como header, nav, main y footer.",
        code: "<main>\n  <h1>Mi primera página</h1>\n  <p>Un espacio para aprender.</p>\n</main>",
      },
      {
        id: "css",
        title: "Diseño adaptable con CSS",
        text: "CSS controla la presentación. Flexbox organiza elementos en una dimensión y Grid permite distribuir filas y columnas. Una interfaz adaptable usa tamaños flexibles, media queries y contenido que conserva su legibilidad en pantallas pequeñas.",
        code: ".proyectos {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 24px;\n}",
      },
      {
        id: "js",
        title: "Interacción con JavaScript",
        text: "JavaScript responde a eventos, transforma datos y actualiza el DOM. La validación mejora la experiencia del usuario, pero las aplicaciones reales también validan en el servidor. Evita insertar contenido de usuarios con innerHTML sin escapar.",
        code: 'const boton = document.querySelector("button");\nboton.addEventListener("click", () => {\n  boton.textContent = "Listo";\n});',
      },
    ],
    questions: [
      {
        text: "¿Qué tecnología aporta estructura semántica?",
        options: ["HTML", "CSS", "SQL"],
        answer: 0,
      },
      {
        text: "¿Qué herramienta distribuye filas y columnas?",
        options: ["JSON", "CSS Grid", "Git"],
        answer: 1,
      },
      {
        text: "¿Dónde debe validarse también una entrada en una aplicación real?",
        options: ["Solo en el navegador", "En el servidor", "En el favicon"],
        answer: 1,
      },
    ],
  },
  {
    id: "api",
    name: "APIs y servicios web",
    category: "Backend",
    color: "#3f807c",
    icon: "{ }",
    description:
      "Entiende las solicitudes, los recursos y la comunicación entre aplicaciones.",
    lessons: [
      {
        id: "rest",
        title: "Recursos y solicitudes",
        text: "Una API define un contrato para que sistemas intercambien información. REST organiza recursos mediante URLs y métodos HTTP. GET consulta, POST crea, PATCH modifica y DELETE elimina. Los códigos HTTP comunican el resultado de una solicitud.",
        code: "GET /api/proyectos\nPOST /api/proyectos\nPATCH /api/proyectos/42",
      },
      {
        id: "json",
        title: "El formato JSON",
        text: "JSON representa objetos, arreglos, cadenas, números, booleanos y null. No admite comentarios ni funciones. El cliente interpreta una respuesta con response.json() y debe manejar tanto errores HTTP como fallos de red.",
        code: '{\n  "nombre": "Portafolio",\n  "publicado": true,\n  "proyectos": 5\n}',
      },
      {
        id: "security",
        title: "Seguridad del lado del servidor",
        text: "La autenticación identifica al usuario y la autorización determina sus permisos. Las claves privadas nunca deben incluirse en el código del navegador. Una API real valida entradas, limita solicitudes y protege sus recursos con permisos adecuados.",
        code: "Autenticación → ¿Quién eres?\nAutorización → ¿Qué puedes hacer?",
      },
    ],
    questions: [
      {
        text: "¿Qué método consulta un recurso?",
        options: ["POST", "GET", "PATCH"],
        answer: 1,
      },
      {
        text: "¿JSON admite funciones?",
        options: ["Sí", "Solo con comentarios", "No"],
        answer: 2,
      },
      {
        text: "¿Dónde se guardan claves privadas?",
        options: ["En el servidor", "En el HTML", "En el favicon"],
        answer: 0,
      },
    ],
  },
  {
    id: "git",
    name: "Git y trabajo colaborativo",
    category: "Herramientas",
    color: "#a56a44",
    icon: "⎇",
    description:
      "Cambios pequeños, historial claro y revisión antes de integrar.",
    lessons: [
      {
        id: "commits",
        title: "Commits con intención",
        text: "Un commit registra una instantánea de los archivos preparados. Los commits pequeños hacen más fácil revisar cambios y encontrar errores. Usa git status para inspeccionar el estado y git diff para revisar lo que cambió antes de confirmar.",
        code: 'git status\ngit diff\ngit add src/\ngit commit -m "feat: add project search"',
      },
      {
        id: "branches",
        title: "Ramas y revisión",
        text: "Una rama permite trabajar sin alterar directamente la versión principal. Crea una rama feature desde la rama de integración, abre un pull request y revisa las comprobaciones automáticas antes de fusionar. Resuelve conflictos comparando ambos cambios.",
        code: "git switch develop\ngit switch -c feature/search\ngit push -u origin feature/search",
      },
      {
        id: "release",
        title: "Versiones y despliegue",
        text: "Una etiqueta identifica un punto del historial, por ejemplo v1.0.0. Un flujo de integración continua ejecuta comprobaciones cuando cambia el código. El despliegue continuo publica una versión validada en el entorno configurado.",
        code: 'git tag -a v1.0.0 -m "Primera versión"\ngit push origin v1.0.0',
      },
    ],
    questions: [
      {
        text: "¿Qué comando muestra cambios sin confirmar?",
        options: ["git push", "git tag", "git diff"],
        answer: 2,
      },
      {
        text: "¿Para qué sirve una rama feature?",
        options: [
          "Para trabajar de forma aislada",
          "Para borrar el historial",
          "Para almacenar contraseñas",
        ],
        answer: 0,
      },
      {
        text: "¿Qué identifica una etiqueta?",
        options: [
          "Un navegador",
          "Un punto del historial",
          "Una base de datos",
        ],
        answer: 1,
      },
    ],
  },
];
export const documents = courses.flatMap((c) =>
  c.lessons.map((l) => ({
    id: l.id,
    name: l.title,
    content: l.text,
    source: c.name,
  })),
);
const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const stop = new Set([
  "que",
  "como",
  "para",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "por",
  "con",
  "son",
  "es",
  "el",
  "la",
  "de",
  "un",
  "en",
  "se",
  "y",
  "a",
  "me",
  "sobre",
  "cual",
  "cuales",
]);
export function retrieve(query, docs) {
  const words = [...new Set(norm(query).match(/[a-z0-9]+/g) || [])].filter(
    (w) => w.length > 1 && !stop.has(w),
  );
  if (!words.length) return [];
  return docs
    .map((d) => {
      const text = norm(d.name + " " + d.content);
      const score = words.reduce(
        (s, w) => s + (new RegExp("\\b" + w + "\\b").test(text) ? 1 : 0),
        0,
      );
      const firstMatch = words
        .map((word) => norm(d.content).indexOf(word))
        .filter((index) => index >= 0)
        .sort((a, b) => a - b)[0];
      const start = Math.max(0, (firstMatch ?? 0) - 120);
      const fragment = d.content.slice(start, start + 650);
      return {
        ...d,
        content:
          (start > 0 ? "…" : "") +
          fragment +
          (start + 650 < d.content.length ? "…" : ""),
        score,
      };
    })
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
export function quizScore(course, answers) {
  if (
    answers.length !== course.questions.length ||
    answers.some((a) => !Number.isInteger(a) || a < 0 || a > 2)
  )
    throw new Error("Responde todas las preguntas.");
  const correct = course.questions.reduce(
    (s, q, i) => s + (q.answer === answers[i] ? 1 : 0),
    0,
  );
  return {
    correct,
    total: course.questions.length,
    percent: Math.round((correct / course.questions.length) * 100),
  };
}
export function progressFor(course, done) {
  return Math.round(
    (course.lessons.filter((l) => done.includes(l.id)).length /
      course.lessons.length) *
      100,
  );
}
