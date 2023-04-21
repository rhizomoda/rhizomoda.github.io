// editor.js

function initializeEditor(el, filename) {
  var editor = ace.edit(el, {
    fontSize: 11,
    mode: "ace/mode/rhizomoda",
    printMargin: 34,
    scrollPastEnd: 1,
    showLineNumbers: false,
    tabSize: 2,
    theme: "ace/theme/ambiance",
    useSoftTabs: false,
    wrap: 34
  });
  var session = editor.getSession();
  var document = localStorage.getItem(filename);
  if (typeof document == "string") {
    localStorage.setItem(filename + Date.now(), document);
    session.setValue(document);
  }
  session.on("change", function () {
    localStorage.setItem(filename, session.getValue());
  });
}

document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
  }
});
