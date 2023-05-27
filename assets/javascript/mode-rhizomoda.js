ace.define(
  'ace/mode/rhizomoda',
  [
    'require',
    'exports',
    'ace/lib/oop',
    'ace/mode/text_highlight_rules',
    'ace/mode/text'
  ],
  function (require, exports) {
    'use strict';
    var oop = require('../lib/oop');

    function highlightRules() {
      this.$rules = {
        'start': [{
          token: 'keyword',
          regex: /(IDEA|IN PROGRESS|MAYBE|NOTE|TODO|URL|WAITING FOR)[.!?,:;]+/
        }, {
          token: 'string',
          regex: /(DONE|PROJECT|QUESTION|SECTION|SUBJECT|TOPIC)[.!?,:;]+/
        }, {
          token: 'link',
          regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        }]
      };
      this.normalizeRules();
    };
    oop.inherits(highlightRules, require('./text_highlight_rules').TextHighlightRules);

    function Mode() {
      this.$behaviour = this.$defaultBehaviour;
      this.HighlightRules = highlightRules;
    };
    oop.inherits(Mode, require('./text').Mode);
    (function () {
      this.$id = 'ace/mode/rhizomoda';
    }).call(Mode.prototype);
    exports.Mode = Mode;
  }
);
ace.require(['ace/mode/rhizomoda']);
