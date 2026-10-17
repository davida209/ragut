import "./style.css";
import {
  shell,
  footer,
  bindMenu,
  esc,
  load,
  save,
  toast,
  empty,
  normalize,
} from "./utils.js";
import {
  courses,
  documents,
  retrieve,
  quizScore,
  progressFor,
} from "./model.js";
const stored = load("les-ragut-v1", {});
let state = {
  name: typeof stored?.name === "string" ? stored.name : "",
  done: Array.isArray(stored?.done) ? stored.done : [],
  scores:
    stored?.scores && typeof stored.scores === "object" ? stored.scores : {},
  custom: Array.isArray(stored?.custom) ? stored.custom : [],
};
let view = "dashboard",
  selectedCourse = courses[0],
  lessonIndex = 0,
  chat = [];
function persist() {
  save("les-ragut-v1", state);
}
function landing() {
  document.querySelector("#app").innerHTML =
    `${shell({ brand: "RagUT", mark: "R", nav: '<a href="#contenido">Qué puedes explorar</a><a href="https://portfoliolester.vercel.app/" target="_blank" rel="noopener noreferrer">Portafolio ↗</a>' })}<main id="main"><section class="hero"><div class="campus-intro"><p class="eyebrow">RAGUT / CAMPUS DE SOFTWARE</p><h1>Tu formación,<br>en un solo espacio.</h1><p>Revisa tus lecciones, consulta los materiales y lleva un registro de lo que aprendiste.</p><div class="learning-preview"><span aria-hidden="true">▤</span><p><strong>Desarrollo web · APIs · Git</strong><small>3 cursos, 9 lecciones y evaluaciones de práctica.</small></p></div><div class="learning-preview"><span aria-hidden="true">⌕</span><p><strong>Consulta con fuentes</strong><small>Busca en el material y en tus propios documentos.</small></p></div></div><div class="panel entry-card"><span class="badge">CAMPUS DE DEMOSTRACIÓN</span><h2 style="margin:25px 0 12px">Acceder al campus</h2><p class="muted">Continúa con un perfil de prueba.</p><form id="entry" style="margin-top:25px"><div class="field"><label for="student-name">Nombre del estudiante</label><input id="student-name" name="studentName" maxlength="60" value="Estudiante demo" required></div><button class="btn wide" type="submit">Entrar al campus demo →</button><p class="hint" style="margin-top:18px">Sin registro ni contraseña. El progreso se conserva en este navegador.</p></form></div></section><section class="section alt" id="contenido"><p class="eyebrow">APRENDER HACIENDO</p><h2>Rutas de aprendizaje disponibles</h2><div class="card-grid" style="margin-top:30px">${courses.map((c) => `<article class="card"><div class="course-art" style="--course:${c.color}"><span>${esc(c.icon)}</span><small>${c.category.toUpperCase()}</small></div><div class="card-content"><h3>${c.name}</h3><p>${c.description}</p><p class="hint" style="margin-top:18px">3 lecciones · Evaluación de práctica</p></div></article>`).join("")}</div><p class="notice">La consulta documental utiliza búsqueda local por palabras y fragmentos citados. Es un simulador de recuperación de contenido, sin un modelo de IA conectado.</p></section></main>${footer("RagUT", "les-ragut-v1")}`;
  bindMenu();
  document.querySelector("#entry").onsubmit = (e) => {
    e.preventDefault();
    state.name = e.currentTarget.studentName.value.trim();
    if (!state.name) return;
    persist();
    render();
  };
}
function render() {
  if (!state.name) return landing();
  document.querySelector("#app").innerHTML =
    `${shell({ brand: "RagUT", mark: "R", nav: '<button id="logout">Salir del demo</button>' })}<div class="campus"><aside class="sidebar"><p class="eyebrow">MI CAMPUS</p>${[
      ["dashboard", "◫", "Resumen"],
      ["courses", "▤", "Mis cursos"],
      ["chat", "✧", "Consulta documental"],
      ["library", "▥", "Biblioteca"],
    ]
      .map(
        ([id, icon, label]) =>
          `<button class="side-link ${view === id ? "active" : ""}" data-view="${id}"><span>${icon}</span>${label}</button>`,
      )
      .join(
        "",
      )}<div class="sidebar-note"><strong>${esc(state.name)}</strong><p>Perfil de prueba</p><span class="badge">DATOS LOCALES</span></div></aside><main id="main" class="campus-main"></main></div>${footer("RagUT", "les-ragut-v1")}`;
  bindMenu();
  document.querySelectorAll("[data-view]").forEach(
    (b) =>
      (b.onclick = () => {
        view = b.dataset.view;
        render();
      }),
  );
  document.querySelector("#logout").onclick = () => {
    state.name = "";
    persist();
    landing();
  };
  if (view === "dashboard") dashboard();
  if (view === "courses") courseList();
  if (view === "lesson") lesson();
  if (view === "quiz") quiz();
  if (view === "chat") chatView();
  if (view === "library") library();
}
function card(c) {
  const progress = progressFor(c, state.done);
  return `<article class="card"><div class="course-art" style="--course:${c.color}"><span>${esc(c.icon)}</span><small>${c.category.toUpperCase()}</small></div><div class="card-content"><h3>${c.name}</h3><p>${c.description}</p><div class="progress"><span style="width:${progress}%"></span></div><div class="card-row"><span class="hint">${progress}% completado</span><button class="btn small" data-course="${c.id}">${progress ? "Continuar" : "Empezar"} →</button></div></div></article>`;
}
function bindCourses() {
  document.querySelectorAll("[data-course]").forEach(
    (b) =>
      (b.onclick = () => {
        selectedCourse = courses.find((c) => c.id === b.dataset.course);
        lessonIndex = Math.max(
          0,
          selectedCourse.lessons.findIndex((l) => !state.done.includes(l.id)),
        );
        view = "lesson";
        render();
      }),
  );
}
function dashboard() {
  document.querySelector("#main").innerHTML =
    `<p class="eyebrow">RESUMEN / TU APRENDIZAJE</p><h1 class="page-title">Hola, ${esc(state.name)}.</h1><p class="muted" style="margin-top:15px">Consulta tu avance y retoma el siguiente módulo.</p><div class="metric-grid" style="margin:30px 0"><div class="metric"><strong>${state.done.filter((id) => documents.some((d) => d.id === id)).length}/9</strong><span>Lecciones completadas</span></div><div class="metric"><strong>${courses.filter((c) => progressFor(c, state.done) === 100).length}/3</strong><span>Rutas completadas</span></div><div class="metric"><strong>${Object.keys(state.scores).length}</strong><span>Evaluaciones realizadas</span></div></div><div class="section-title"><h2>Tu próxima ruta</h2><button class="btn secondary small" id="all-courses">Ver todos los cursos →</button></div><div class="card-grid">${courses.map(card).join("")}</div>`;
  document.querySelector("#all-courses").onclick = () => {
    view = "courses";
    render();
  };
  bindCourses();
}
function courseList() {
  document.querySelector("#main").innerHTML =
    `<p class="eyebrow">APRENDE A TU RITMO</p><h1 class="page-title">Mis cursos</h1><div class="toolbar"><div class="search"><input type="search" id="course-search" aria-label="Buscar curso" placeholder="Buscar una ruta de aprendizaje"></div></div><div id="courses-list" class="card-grid"></div>`;
  const output = document.querySelector("#courses-list");
  const show = () => {
    const q = normalize(document.querySelector("#course-search").value);
    const list = courses.filter((c) =>
      normalize(c.name + " " + c.category).includes(q),
    );
    output.innerHTML = list.length
      ? list.map(card).join("")
      : empty("No hay cursos para esa búsqueda", "Prueba con web, APIs o Git.");
    bindCourses();
  };
  document.querySelector("#course-search").oninput = show;
  show();
}
function lesson() {
  const c = selectedCourse,
    l = c.lessons[lessonIndex];
  document.querySelector("#main").innerHTML =
    `<p class="eyebrow">${c.name}</p><div class="lesson-layout"><aside class="panel"><h3>Contenido del curso</h3>${c.lessons.map((x, i) => `<button class="lesson-link ${i === lessonIndex ? "active" : ""}" data-lesson="${i}"><span>${state.done.includes(x.id) ? "✓" : String(i + 1).padStart(2, "0")}</span>${x.title}</button>`).join("")}<button class="btn secondary wide" id="open-quiz" style="margin-top:25px">Evaluación de práctica →</button></aside><article class="panel"><span class="badge">LECCIÓN ${lessonIndex + 1} / 3</span><h2 style="margin:22px 0">${l.title}</h2><p style="font-size:15px">${l.text}</p><pre class="code"><code>${esc(l.code)}</code></pre><div class="notice">Idea para practicar: aplica este concepto a una página o un proyecto propio y observa qué cambia.</div><div class="card-row"><button class="btn ${state.done.includes(l.id) ? "secondary" : ""}" id="complete">${state.done.includes(l.id) ? "✓ Completada · desmarcar" : "Marcar como completada"}</button><button class="btn secondary" id="next-lesson">${lessonIndex === 2 ? "Ir a evaluación" : "Siguiente →"}</button></div></article></div>`;
  document.querySelectorAll("[data-lesson]").forEach(
    (b) =>
      (b.onclick = () => {
        lessonIndex = Number(b.dataset.lesson);
        lesson();
      }),
  );
  document.querySelector("#complete").onclick = () => {
    state.done = state.done.includes(l.id)
      ? state.done.filter((id) => id !== l.id)
      : [...state.done, l.id];
    persist();
    lesson();
  };
  document.querySelector("#open-quiz").onclick = () => {
    view = "quiz";
    render();
  };
  document.querySelector("#next-lesson").onclick = () => {
    if (lessonIndex < 2) {
      lessonIndex++;
      lesson();
    } else {
      view = "quiz";
      render();
    }
  };
}
function quiz() {
  const c = selectedCourse;
  document.querySelector("#main").innerHTML =
    `<p class="eyebrow">EVALUACIÓN DE PRÁCTICA / ${c.name}</p><h1 class="page-title">Comprueba lo que aprendiste.</h1><p class="muted" style="margin:18px 0 25px">Tres preguntas. Puedes repetirlas las veces que necesites.</p><form class="panel" id="quiz-form">${c.questions.map((q, i) => `<fieldset class="quiz-question"><legend>${i + 1}. ${q.text}</legend>${q.options.map((o, j) => `<label><input type="radio" name="q${i}" value="${j}" required>${o}</label>`).join("")}</fieldset>`).join("")}<button class="btn" type="submit">Revisar respuestas →</button><div id="quiz-result" aria-live="polite"></div></form>`;
  document.querySelector("#quiz-form").onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const answers = c.questions.map((_, i) => Number(data.get("q" + i)));
    const score = quizScore(c, answers);
    state.scores[c.id] = score.percent;
    persist();
    document.querySelector("#quiz-result").innerHTML =
      `<div class="summary"><h3>${score.correct} de ${score.total} respuestas correctas · ${score.percent}%</h3>${c.questions.map((q, i) => `<p style="margin-top:12px">${answers[i] === q.answer ? "✓" : "↺"} ${esc(q.text)}<br><strong>Respuesta: ${q.options[q.answer]}</strong></p>`).join("")}<p class="hint" style="margin-top:20px">Este resultado es de práctica, sin validez académica.</p></div>`;
  };
}
function chatView() {
  document.querySelector("#main").innerHTML =
    `<p class="eyebrow">BUSCA / CONECTA / VERIFICA</p><h1 class="page-title">Consulta documental</h1><p class="muted" style="margin:18px 0">Respuestas extraídas de tu biblioteca, con fuentes a la vista.</p><div class="notice">Motor local de recuperación por palabras. No utiliza una API de IA ni genera respuestas fuera del material disponible.</div><div class="chips" style="margin-bottom:20px"><button class="chip" data-prompt="¿Qué es una API?">¿Qué es una API?</button><button class="chip" data-prompt="¿Cómo funciona CSS Grid?">CSS Grid</button><button class="chip" data-prompt="¿Qué es autenticación?">Autenticación</button></div><div id="messages" class="stack"></div><form id="chat-form" class="chat-form"><input name="query" aria-label="Pregunta al material" placeholder="Escribe una pregunta sobre el material…" maxlength="250" required><button class="btn" type="submit">Consultar →</button></form>`;
  const show = () => {
    document.querySelector("#messages").innerHTML = chat.length
      ? chat
          .map(
            (m) =>
              `<div class="chat-query">${esc(m.query)}</div><div class="chat-answer panel">${m.results.length ? `<span class="badge">${m.results.length} FUENTES RELACIONADAS</span>${m.results.map((d, i) => `<h3>[${i + 1}] ${esc(d.name)}</h3><p>${esc(d.content.slice(0, 650))}${d.content.length > 650 ? "…" : ""}</p><p class="hint" style="margin-top:10px">Fuente: ${esc(d.source || d.name)} · Fragmento recuperado</p>`).join("")}` : "<h3>No encontré una fuente relacionada.</h3><p>Prueba palabras más específicas o agrega un documento de texto a la biblioteca.</p>"}</div>`,
          )
          .join("")
      : empty(
          "Una pregunta es un buen comienzo",
          "Prueba uno de los ejemplos o consulta los documentos de la biblioteca.",
        );
  };
  const ask = (query) => {
    chat.push({
      query,
      results: retrieve(query, [...documents, ...state.custom]),
    });
    show();
  };
  document.querySelector("#chat-form").onsubmit = (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value.trim();
    if (!q) return;
    ask(q);
    e.currentTarget.reset();
  };
  document
    .querySelectorAll("[data-prompt]")
    .forEach((b) => (b.onclick = () => ask(b.dataset.prompt)));
  show();
}
function library() {
  document.querySelector("#main").innerHTML =
    `<p class="eyebrow">MATERIAL DE CONSULTA</p><h1 class="page-title">Biblioteca</h1><p class="muted" style="margin:18px 0 25px">Las nueve lecciones también funcionan como fuentes para tus consultas.</p><form id="upload" class="panel"><h3>Agrega un documento de prueba</h3><div class="field"><label for="text-file">Texto o Markdown · máximo 50 KB</label><input type="file" name="file" id="text-file" accept=".txt,.md,text/plain,text/markdown" required></div><p class="hint">Usa contenido ficticio o público. Se guarda localmente; no se sube a un servidor. Máximo 10 documentos propios.</p><button class="btn small" style="margin-top:20px" type="submit">Agregar a la biblioteca</button></form><div class="panel" style="margin-top:25px">${[...documents, ...state.custom].map((d) => `<div class="list-row"><div><strong>${esc(d.name)}</strong><p>${esc(d.source || "Documento local")} · ${d.content.length} caracteres</p></div>${state.custom.some((x) => x.id === d.id) ? `<button class="btn secondary small" data-remove="${esc(d.id)}">Eliminar</button>` : '<span class="badge">MATERIAL BASE</span>'}</div>`).join("")}</div>`;
  document.querySelector("#upload").onsubmit = async (e) => {
    e.preventDefault();
    const file = e.currentTarget.file.files[0];
    if (!file) return;
    if (!/\.(txt|md)$/i.test(file.name) || file.size > 51200) {
      toast("Elige un archivo .txt o .md de hasta 50 KB.");
      return;
    }
    if (state.custom.length >= 10) {
      toast("Elimina un documento antes de agregar otro.");
      return;
    }
    const content = await file.text();
    if (!content.trim()) {
      toast("El archivo no contiene texto.");
      return;
    }
    state.custom.push({
      id: crypto.randomUUID(),
      name: file.name,
      source: "Documento local",
      content: content.slice(0, 51200),
    });
    persist();
    library();
    toast("Documento agregado a la biblioteca local.");
  };
  document.querySelectorAll("[data-remove]").forEach(
    (b) =>
      (b.onclick = () => {
        state.custom = state.custom.filter((d) => d.id !== b.dataset.remove);
        persist();
        library();
        toast("Documento de prueba eliminado.");
      }),
  );
}
if (state.name) render();
else landing();
