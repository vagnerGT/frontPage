
window.addEventListener("load", function (){
    document.body.style.display = "block";
});

//node Object
var NodeObj = function (element) {
    this.element = element;

    this.child = function (index) {
        return nodes.list[element.children[index].id];
    }

    this.parent = function () {
        return nodes.list[element.parent.id];
    }
    
    this.class = (function () {
        let defaultClass = typeof element.className === "string" ? element.className.split(" ") : [""];

        function add (name) {
            if (name === "default" && defaultClass[0] !== "")
                element.classList.add(...defaultClass);
            if (typeof name === "string" && name !== "default")
                element.classList.add(...name.split(" "));
            return this.class;
        }

        function remove (name) {
            if (name === "default" && defaultClass[0] !== "")
                element.classList.remove(...defaultClass);
            if (typeof name === "string" && name !== "default")
                element.classList.remove(...name.split(" "));
            return this.class;
        }

        return {
            add: add.bind(this),
            remove: remove.bind(this),
        }
    }).call(this);

    this.animation = (function () {
        let running = {};

        function stopAll () {
            for(const v in running){
                element.classList.remove(`${v}-animation`);
            }
            running = {};
            element.offsetHeight;
        }

        function run (name) {
            stopAll();
            running[name] = true;
            element.classList.add(`${name}-animation`);
            return this.animation;
        }

        return {
            run: run.bind(this),
        }
    }).call(this);

}

//node object prototype
NodeObj.prototype.onScreenResize = (function () {
    let list = {};

    function update() {
        for (const f in list) list[f]();
    }
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    
    return function (action) {
        if(typeof action != "function") return;
        list[this.element.id] = action.bind(this);
        return this;
    }
})();

NodeObj.prototype.onClick = function (action) {
    if(typeof action != "function") return;
    this.element.addEventListener("click", action.bind(this));
    return this;
}




//nodes
var nodes = (function () {
    let count = 0;
    let list = {};

    function getUID(){
        count++;
        return "UID-" + count;
    }

    function add(element) {
        if(!element.id) element.id = getUID();
        list[element.id] = new NodeObj(element);
    }

    function getNodes() {
        for (const v of document.getElementsByTagName("*")) add(v);
        return list;
    }

    getNodes();

    return {
        list,
    }
})();

export default nodes;