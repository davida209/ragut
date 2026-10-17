import test from "node:test";
import assert from "node:assert/strict";
import {
  courses,
  documents,
  retrieve,
  quizScore,
  progressFor,
} from "../src/model.js";
test("retrieval returns cited material and no fabricated fallback", () => {
  assert.ok(
    retrieve("¿Qué es una API?", documents).some((d) => d.id === "rest"),
  );
  assert.deepEqual(retrieve("¿Qué es?", documents), []);
  assert.deepEqual(retrieve("astronomía cuántica", documents), []);
});
test("quiz reports correct answers and rejects incomplete input", () => {
  assert.equal(quizScore(courses[0], [0, 1, 1]).percent, 100);
  assert.equal(quizScore(courses[0], [0, 0, 0]).correct, 1);
  assert.throws(() => quizScore(courses[0], [0]));
});
test("progress counts only known lesson ids", () => {
  assert.equal(progressFor(courses[0], ["html", "css", "js", "other"]), 100);
  assert.equal(progressFor(courses[0], ["html", "other"]), 33);
});
test("retrieval finds relevant fragments deep in uploaded text", () => {
  const content =
    "Texto de contexto. ".repeat(100) +
    "El identificador ultramarino conecta las tareas.";
  const result = retrieve("ultramarino", [
    { id: "custom", name: "Notas", content },
  ]);
  assert.equal(result.length, 1);
  assert.ok(result[0].content.includes("ultramarino"));
  assert.ok(result[0].content.length < content.length);
});
