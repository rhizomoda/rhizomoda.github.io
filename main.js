var EXAMPLE_DOCUMENT = "\nQUESTION: Why?\n" +
    "NOTE: No reason.\n\n" +
    "QUESTION: What the hell is a rhizo-moda?\n" +
    "NOTE: That's the wrong question. The right question is 'what can a rhizo-moda do for you'?\n\n" +
    "PROJECT: All in a day's work\n" +
    "DONE: Buy cheese\n" +
    "TODO: Make friends\n" +
    "IN PROGRESS: Care for family\n\n" +
    "TOPIC: Keywords\n" +
    "SECTION: More keywords :-)\n" +
    "I.E. \"That is\"\n" +
    "E.G. \"For example\"\n\n" +
    "MAYBE...? Dunno.\n" +
    "TWEAKS: Making small adjustments\n" +
    "WAITING FOR: Sweet release/...\n\n";

function setFontSize(editor, fontSize) {
    editor.setOptions({
        fontSize: fontSize
    });
}

function setModeTheme(editor, theme) {
    editor.setOptions({
        mode: "ace/mode/rhizomoda",
        theme: theme,
        scrollPastEnd: 1,
        showLineNumbers: false
    });
}

function setWrapColumn(editor, wrapColumn) {
    editor.setOptions({
        wrap: wrapColumn,
        printMargin: wrapColumn
    });
}

function setTabSize(editor, tabSize) {
    editor.setOptions({
        tabSize: tabSize,
        useSoftTabs: false
    });
}

function loadSavedFile(session, filename) {
    var value = localStorage.getItem(filename);
    if (typeof value == "string") {
        session.setValue(value);
        localStorage.setItem(filename + Date.now(), value);
    } else {
        session.setValue(EXAMPLE_DOCUMENT);
    }
}

function enableAutoSave(session, filename) {
    session.on("change", function () {
        localStorage.setItem(filename, session.getValue());
    });
}

function disableSaveDialog(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
    }
}

ace.define("ace/mode/rhizomoda_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
    function (require, exports) {
        "use strict";
        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
        var RhizomodaHighlightRules = function () {
            this.$rules = {
                "start": [{
                    token: "string",
                    regex: /(DONE|PROJECT|QUESTION|SECTION|TOPIC)[.!?,:;]+/
                }, {
                    token: "keyword",
                    regex: /(E\.?G|I\.?E|IN PROGRESS|MAYBE|NOTE|TODO|TWEAKS|WAITING FOR)[.!?,:;]+/
                }, {
                    token: "keyword.operator",
                    regex: /(\:\w+\:|\<[\/\\]?3|[\(\)\\\D|\*\$][\-\^]?[\:\;\=]|[\:\;\=B8][\-\^]?[3DOPp\@\$\*\\\)\(\/\|])(?=\s|[\!\.\?]|$)/
                }]
            };
            this.normalizeRules();
        };
        RhizomodaHighlightRules.metaData = {
            name: "rhizomoda"
        };
        oop.inherits(RhizomodaHighlightRules, TextHighlightRules);
        exports.RhizomodaHighlightRules = RhizomodaHighlightRules;
    }
);

ace.define("ace/mode/rhizomoda", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/rhizomoda_highlight_rules"],
    function (require, exports) {
        "use strict";
        var oop = require("../lib/oop");
        var TextMode = require("./text").Mode;
        var RhizomodaHighlightRules = require("./rhizomoda_highlight_rules").RhizomodaHighlightRules;
        var Mode = function () {
            this.HighlightRules = RhizomodaHighlightRules;
            this.$behaviour = this.$defaultBehaviour;
        };
        oop.inherits(Mode, TextMode);
        (function () {
            this.$id = "ace/mode/rhizomoda";
        }).call(Mode.prototype);
        exports.Mode = Mode;
    }
);

(function () {
    ace.require(["ace/mode/rhizomoda"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();

var editor = ace.edit("myeditor");

setFontSize(editor, 14);
setModeTheme(editor, "ace/theme/ambiance");
setWrapColumn(editor, 100);
setTabSize(editor, 8);

var session = editor.getSession();
var filename = "rhizo.document";

loadSavedFile(session, filename);
enableAutoSave(session, filename);
document.addEventListener("keydown", disableSaveDialog);