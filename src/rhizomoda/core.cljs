(ns rhizomoda.core)

(defn initialize-editor [el key]
  (let [editor
        (.edit js/ace el
               (clj->js
                {:enableLinking true
                 :enableMultiselect false
                 :fontSize 16
                 :mode "ace/mode/rhizomoda"
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
             (when-let [token (aget data "token")]
               (when (= (aget token "type") "link")
                 (.open js/window (aget token "value") "_blank"))))))))

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
