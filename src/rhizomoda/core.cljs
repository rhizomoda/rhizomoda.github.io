(ns rhizomoda.core)

(defn initialize-editor [el, key]
  (let [editor
        (.edit js/ace el
               (clj->js
                {:enableLinking true
                 :enableMultiselect false
                 :fontSize 16
                 ;:mode "ace/mode/rhizomoda"
                 :printMargin 62
                 :scrollPastEnd 1
                 :showLineNumbers false
                 :tabSize 2
                 :theme "ace/theme/ambiance"
                 :wrap 62}))
        content (.getItem js/localStorage key)
        session (.getSession editor)]
    (when (string? content)
      (.setItem js/localStorage (str key (.now js/Date)) content)
      (.setValue session content))
    (.on session "change"
         #(.setItem js/localStorage key (.getValue session)))
    (.on editor "linkClick"
         (fn [data]
           (when data
             (when-let [token (.-token data)]
               (when (= (.-type token) "link")
                 (.open js/window (.-value token) "_blank"))))))))

(initialize-editor "primary-editor" "index.document")
(initialize-editor "secondary-editor" "moda.document")
(initialize-editor "tertiary-editor" "rhizo.document")

(.addEventListener
 js/document "keydown"
 (fn [e]
   (let [ctrl (.-ctrlKey e)
         meta (.-metaKey e)
         char (.-key e)
         is-save-key (and (or ctrl meta) (= char "s"))]
     (when is-save-key (.preventDefault e)))))

;; ace.define(
;;   'ace/mode/rhizomoda',
;;   [
;;     'require',
;;     'exports',
;;     'ace/lib/oop',
;;     'ace/mode/text_highlight_rules',
;;     'ace/mode/folding/cstyle',
;;     'ace/mode/text'
;;   ],
;;   function (require, exports) {
;;     'use strict';
;;     var oop = require('../lib/oop');

;;     function highlightRules() {
;;       this.$rules = {
;;         'start': [{
;;           token: 'keyword',
;;           regex: /(IN PROGRESS|PROGRESSION|MAYBE|P-E|NOTE|TODO|AFFAIRE|URL|WAITING FOR|EN ATTENTE)[.!?,:;]+/
;;         }, {
;;           token: 'string',
;;           regex: /(DONE|FINI|PROJECT|PROJET|QUESTION|SECTION|TOPIC|SUJET)[.!?,:;]+/
;;         }, {
;;           token: 'link',
;;           regex:  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
;;         }]
;;       };
;;       this.normalizeRules();
;;     };
;;     oop.inherits(highlightRules, require('./text_highlight_rules').TextHighlightRules);

;;     function Mode() {
;;       this.$behaviour = this.$defaultBehaviour;
;;       this.foldingRules = new require('./folding/cstyle').FoldMode();
;;       this.HighlightRules = highlightRules;
;;     };
;;     oop.inherits(Mode, require('./text').Mode);
;;     (function () {
;;       this.$id = 'ace/mode/rhizomoda';
;;     }).call(Mode.prototype);
;;     exports.Mode = Mode;
;;   }
;; );
;; ace.require(['ace/mode/rhizomoda']);
