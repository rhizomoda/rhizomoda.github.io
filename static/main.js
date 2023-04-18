var root = document.body;

m.render(root, [
    m("div", {class: "editor", id: "primary"}),
    m("div", {class: "editor", id: "replica"})
]);

var primary = ace.edit("primary");
var replica = ace.edit("replica");
