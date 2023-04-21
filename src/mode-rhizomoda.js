// mode-rhizomoda.js
ace.define(
  'ace/mode/rhizomoda',
  [
    'require',
    'exports',
    'ace/lib/oop',
    'ace/mode/text_highlight_rules',
    'ace/mode/folding/cstyle',
    'ace/mode/text'
  ],
  function (require, exports) {
    'use strict';
    var oop = require('../lib/oop');

    function highlightRules() {
      this.$rules = {
        'start': [{
          token: 'keyword',
          regex: /(IN PROGRESS|PROGRESSION|MAYBE|P-E|NOTE|TODO|AFFAIRE|URL|WAITING FOR|EN ATTENTE)[.!?,:;]+/
        }, {
          token: 'string',
          regex: /(DONE|FINI|PROJECT|PROJET|QUESTION|SECTION|TOPIC|SUJET)[.!?,:;]+/
        }, {
          token: 'link',
          regex:  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        }]
      };
      this.normalizeRules();
    };
    oop.inherits(highlightRules, require('./text_highlight_rules').TextHighlightRules);

    function Mode() {
      this.$behaviour = this.$defaultBehaviour;
      this.foldingRules = new require('./folding/cstyle').FoldMode();
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
