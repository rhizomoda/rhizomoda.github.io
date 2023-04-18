ace.define("ace/mode/rhizomoda", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/text_highlight_rules"],
    function (require, exports) {
        "use strict";

        var oop = require("../lib/oop");
        var TextMode = require("./text").Mode;
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        function RhizomodaHighlightRules() {
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
            fileTypes: ['document'],
            name: 'rhizomoda'
        };

        oop.inherits(RhizomodaHighlightRules, TextHighlightRules);

        function Mode() {
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

var root = document.body;

m.render(root, [
    m("div", {
        class: "editor",
        id: "primary"
    }),
    m("div", {
        class: "editor",
        id: "replica"
    })
]);

var editorOptions = {
    fontSize: 14,
    mode: "ace/mode/rhizomoda",
    scrollPastEnd: 1,
    showLineNumbers: false,
    tabSize: 8,
    theme: "ace/theme/ambiance",
    useSoftTabs: false,
    wrap: 80
};

ace.require(["ace/mode/rhizomoda"]);

var primary = {
    editor: ace.edit("primary", editorOptions),
    filename: "moda.document"
};

var replica = {
    editor: ace.edit("replica", editorOptions),
    filename: "rhizo.document"
};

hookup(primary);
hookup(replica);

function hookup(p) {
    p.session = p.editor.getSession();
    var value = localStorage.getItem(p.filename);

    if (typeof value == "string") {
        localStorage.setItem(p.filename + Date.now(), value);
        p.session.setValue(value);
    }

    p.session.on("change", function () {
        localStorage.setItem(p.filename, p.session.getValue());
    });
}

document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
    }
});
