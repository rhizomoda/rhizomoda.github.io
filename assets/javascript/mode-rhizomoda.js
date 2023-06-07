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
          token: "keyword",
          regex: /(IDEA|MAYBE|TODO|WAITING FOR)[.!?,:;]+/
        }, {
          token: "string",
          regex: /(QUESTION|SYSTEM)[.!?,:;]+/
        }, {
          token: "constant",
          regex: /(NOTE)[.!?,:;]+/
        }, {
          token: "support.function",
          regex: /(IN PROGRESS)[.!?,:;]+/
        }, {
          token: "support.class",
          regex: /(ITEM|LINK)[.!?,:;]+/
        }, {
          token: "variable.parameter",
          regex: /(SECTION)[.!?,:;]+/
        }, {
          token: "constant.numeric",
          regex: /(PROJECT)[.!?,:;]+/
        }, {
          token: "keyword.operator",
          regex: /(DONE)[.!?,:;]+/
        }, {
          token: "support.type",
          regex: /(TOPIC)[.!?,:;]+/
        }, {
          token: "link",
          regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
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
