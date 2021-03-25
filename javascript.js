
import nodes from './nodeManager.js';

nodes.list["navigation"].onScreenResize(function () {
    if (window.innerWidth <= 600){
        this.child(0).class.remove("default").add("menu-open-btn");
        this.child(1).class.remove("default").add("nav-menu");
    }else {
        this.child(0).class.remove("menu-open-btn").add("default");
        this.child(1).class.remove("nav-menu").add("default");
    }

});

nodes.list["menu-open-btn"].onClick(function () {
    this.animation.run("stretch");
    nodes.list["navigation"].child(1).animation.run("translate-down");
});

nodes.list["menu-close-btn"].onClick(function () {
    this.animation.run("stretch");
    nodes.list["navigation"].child(1).animation.run("translate-up");
});

nodes.list["banner"].onScreenResize(function () {
    if (window.innerWidth <= 800){
        //this.child(1).class.add("disabled");
    }else {
        //this.child(1).class.remove("disabled");
    }
});

nodes.list["explore-button"].onClick(function () {
    //this.animation.run("stretch");
});

nodes.list["facebook-icon"].onClick(function () {
    this.animation.run("stretch");
});

nodes.list["twitter-icon"].onClick(function () {
    this.animation.run("stretch");
});

nodes.list["instagram-icon"].onClick(function () {
    this.animation.run("stretch");
});


// functions

