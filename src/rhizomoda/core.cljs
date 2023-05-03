(ns rhizomoda.core)

(def wallpapers ["fill-071"
                 "fill-074"
                 "fill-075"
                 "fill-076"
                 "fill-080"
                 "fill-087"
                 "fill-096"
                 "fill-099"
                 "fill-103"
                 "fill-108"
                 "fill-114"
                 "fill-115"])

(.add js/document.body.classList (rand-nth wallpapers))

(defn initialize-editor [el, filename]
  (let [editor
        (.edit js/ace el
               (clj->js
                {:enableLinking true
                 :enableMultiselect false
                 :fontSize 11
                 ;:mode "ace/mode/rhizomoda"
                 :printMargin 34
                 :scrollPastEnd 1
                 :showLineNumbers false
                 :tabSize 2
                 :theme "ace/theme/ambiance"
                 :wrap 34}))
        document (.getItem js/localStorage filename)
        session (.getSession editor)]
    (when (string? document)
      (.setItem js/localStorage (+ filename (.now js/Date)) document)
      (.setValue session document))
    (.on session "change"
         #(.setItem js/localStorage filename (.getValue session)))
    (.on editor "linkClick"
         (fn [data]
           (when data
             (when-let [token (.-token data)]
               (when (= (.-type token) "link")
                 (.open js/window (.-value token) "_blank"))))))))

(initialize-editor "primary-editor" "index.document")
(initialize-editor "secondary-editor" "moda.document")
(initialize-editor "tertiary-editor" "rhizo.document")

(def S #(.querySelector js/document %))

(defn toggle-hidden [el] #(-> el .-classList (.toggle "hidden")))

(new js/MenuBar (S "#menu-bar")
     (clj->js
      [{:text "Widgets"
        :subMenuItems
        [{:text "VirtualSky"
          :handler (toggle-hidden (S "#virtual-sky-widget"))}]}]))

(defn prevent-save-dialog [e]
  (let [ctrl (.-ctrlKey e)
        meta (.-metaKey e)
        char (.-key e)
        is-save-key (and (or ctrl meta) (= char "s"))]
    (when is-save-key (.preventDefault e))))

(.addEventListener js/document "keydown" prevent-save-dialog)

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
