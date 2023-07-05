ace.define(
  "ace/mode/rhizomoda",
  [
    "require",
    "exports",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules",
    "ace/mode/text"
  ],
  function (require, exports) {
    "use strict";
    var oop = require("../lib/oop");

    function HighlightRules() {
      this.$rules = {
        "start": [{
          token: "constant",
          regex: /(JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\.([0-9]{2}\.)?([0-9]{4}\.)?/
        }, {
          token: "constant.numeric",
          regex: /(DONE|[0-9]+\.WINS)\./
        }, {
          token: "link",
          regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        }, {
          token: "keyword.operator",
          regex: /(PUSH)\./,
        }, {
          token: "string",
          regex: "^\\s*>.*$"
        }, {
          token: "support.function",
          regex: /(DAILY|HABIT|MAYBE|TASK)\./
        }, {
          token: "support.type",
          regex: /(PROJECT|SECTION|TOPIC)\./
        }]
      };
      this.normalizeRules();
    };
    oop.inherits(HighlightRules, require("./text_highlight_rules").TextHighlightRules);

    function Mode() {
      this.$behaviour = this.$defaultBehaviour;
      this.HighlightRules = HighlightRules;
    };
    oop.inherits(Mode, require("./text").Mode);
    (function () {
      this.$id = "ace/mode/rhizomoda";
    }).call(Mode.prototype);
    exports.Mode = Mode;
  }
);
ace.require(["ace/mode/rhizomoda"]);
