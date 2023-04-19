ace.define("ace/mode/rhizomoda",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/mode/text", "ace/mode/text_highlight_rules"],
    function (require, exports) {
        "use strict";

        var oop = require("../lib/oop");
        var BaseFoldMode = require("./folding/fold_mode").FoldMode;
        var TextMode = require("./text").Mode;
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        function FoldMode(markers) {
            this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
        }

        oop.inherits(FoldMode, BaseFoldMode);

        (function () {
            this.getFoldWidgetRange = function (session, foldStyle, row) {
                var line = session.getLine(row);
                var match = line.match(this.foldingStartMarker);

                if (match) {
                    if (match[1]) {
                        return this.openingBracketBlock(session, match[1], row, match.index);
                    }
                    if (match[2]) {
                        return this.indentationBlock(session, row, match.index + match[2].length);
                    }

                    return this.indentationBlock(session, row);
                }
            };

        }).call(FoldMode.prototype);

        function HighlightRules() {
            this.$rules = {
                "start": [{
                    token: "string",
                    regex: /(DONE|PROJECT|QUESTION|SECTION|TOPIC)[.!?,:;]+/
                }, {
                    token: "keyword",
                    regex: /(E\.?G|I\.?E|IN PROGRESS|MAYBE|NAME|NOTE|TODO|TWEAKS|WAITING FOR)[.!?,:;]+/
                }, {
                    token: "keyword.operator",
                    regex: /(\:\w+\:|\<[\/\\]?3|[\(\)\\|\*\$][\-\^]?[\:\;\=]|[\:\;\=B8][\-\^]?[3DOPp\@\$\*\\\)\(\/\|])(?=\s|[\!\.\?]|$)/
                }]
            };

            this.normalizeRules();
        };

        HighlightRules.metaData = {
            fileTypes: ['document'],
            name: 'rhizomoda'
        };

        oop.inherits(HighlightRules, TextHighlightRules);

        function Mode() {
            this.foldingRules = new FoldMode("\\:");
            this.HighlightRules = HighlightRules;
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
    m("main", [
        m("div", {
            class: "editor",
            id: "myprimary"
        }),
        m("div", {
            class: "editor",
            id: "mysecondary"
        }),
        m("div", {
            class: "editor",
            id: "mytertiary"
        })
    ])
]);

var editorOptions = {
    fontSize: 11,
    mode: "ace/mode/rhizomoda",
    printMargin: 34,
    scrollPastEnd: 1,
    showLineNumbers: false,
    tabSize: 2,
    theme: "ace/theme/ambiance",
    useSoftTabs: false,
    wrap: 34
};

ace.require(["ace/mode/rhizomoda"]);

var primary = {
    editor: ace.edit("myprimary", editorOptions),
    filename: "index.document"
};

var secondary = {
    editor: ace.edit("mysecondary", editorOptions),
    filename: "moda.document"
};

var tertiary = {
    editor: ace.edit("mytertiary", editorOptions),
    filename: "rhizo.document"
};

hookup(primary);
hookup(secondary);
hookup(tertiary);

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

var wallpapers = [
    "fill-071",
    "fill-074",
    "fill-075",
    "fill-076",
    "fill-080",
    "fill-087",
    "fill-096",
    "fill-099",
    "fill-103",
    "fill-108",
    "fill-112",
    "fill-114",
    "fill-115",
    "fill-120",
    "fill-121",
    "fill-122",
    "fill-133",
    "fill-134",
    "fill-135",
    "fill-140"
];

document.body.classList.add(wallpapers[Math.floor(Math.random() * wallpapers.length)]);
