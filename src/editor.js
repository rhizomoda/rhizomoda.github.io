// editor.js
function initializeEditor(el, filename) {
  var editor = ace.edit(el, {
    enableLinking: true,
    enableMultiselect: false,
    fontSize: 11,
    mode: 'ace/mode/rhizomoda',
    printMargin: 34,
    scrollPastEnd: 1,
    showLineNumbers: false,
    tabSize: 2,
    theme: 'ace/theme/ambiance',
    useSoftTabs: false,
    wrap: 34
  });
  var session = editor.getSession();
  var document = localStorage.getItem(filename);
  if (typeof document == 'string') {
    // save backup
    localStorage.setItem(filename + Date.now(), document);
    // load
    session.setValue(document);
  }
  session.on('change', function () {
    // autosave
    localStorage.setItem(filename, session.getValue());
  });
  editor.on('linkClick', function (data) {
    if (data && data.token && data.token.type == 'link') {
      // open link
      window.open(data.token.value, '_blank');
    }
  });
}
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    // prevent ctrl s
    e.preventDefault();
  }
});
