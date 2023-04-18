var root = document.body;

m.render(root, [
    m("main", {class: "grid"}, [
        m("div", {class: "editor", id: "replica"}),
        m("div", {class: "editor", id: "primary"})
    ])
]);
