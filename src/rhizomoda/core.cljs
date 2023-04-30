(ns rhizomoda.core)

;; (defn initialize-editor [el, filename]
;;   (js/ace.edit))

;; function initializeEditor(el, filename) {
;;   var editor = ace.edit(el, {
;;     enableLinking: true,
;;     enableMultiselect: false,
;;     fontSize: 11,
;;     mode: 'ace/mode/rhizomoda',
;;     printMargin: 34,
;;     scrollPastEnd: 1,
;;     showLineNumbers: false,
;;     tabSize: 2,
;;     theme: 'ace/theme/ambiance',
;;     useSoftTabs: false,
;;     wrap: 34
;;   });
;;   var document = localStorage.getItem(filename);
;;   var session = editor.getSession();
;;   if (typeof document == 'string') {
;;     // save backup
;;     localStorage.setItem(filename + Date.now(), document);
;;     // load
;;     session.setValue(document);
;;   }
;;   session.on('change', function () {
;;     // autosave
;;     localStorage.setItem(filename, session.getValue());
;;   });
;;   editor.on('linkClick', function (data) {
;;     if (data && data.token && data.token.type == 'link') {
;;       // open link
;;       window.open(data.token.value, '_blank');
;;     }
;;   });
;; }
;; document.addEventListener('keydown', function (e) {
;;   if ((e.ctrlKey || e.metaKey) && e.key === 's') {
;;     // prevent ctrl s
;;     e.preventDefault();
;;   }
;; });

;; select an HTML element
(defn query-selector [selectors]
  (. js/document querySelector selectors))

;; toggle show or hide
(defn show-hide [selectors]
  (-> (query-selector selectors) (.-classList) (.toggle "hidden")))

;; initialize the menu bar
(new js/MenuBar
     (query-selector "#menu-bar")
     (clj->js [{:text "Widgets"
                :subMenuItems
                [{:text "VirtualSky"
                  :handler #(show-hide "#virtual-sky-widget")}]}]))

;; background image classes from CSS
(def wallpaper ["fill-071"
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

;; apply a random wallpaper
(. js/document.body.classList add (rand-nth wallpaper))

;; preparer des questions
;; je cherche des relations en personne avec mes coworkers

;; ask for redacted invite

;; Awareness, intention & Meditation.

;; get tested
;; go to the doctor

;; get stuff from Walling and Spotify

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
