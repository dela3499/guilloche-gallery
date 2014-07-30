/** @jsx React.DOM */



// Prepare mixins which allow React components to trigger actions and read/sync-with data stores
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass ({displayName: 'App',
    mixins: [FluxMixin, StoreWatchMixin("AppStore")],
    getStateFromFlux: function () {
        var flux = this.getFlux();
        return {
            activePattern: flux.store("AppStore").activePattern,
            patterns: flux.store("AppStore").patterns
        }
    },  
    render: function () {
        var thumbnails = [];
        for (var i = 0; i < this.state.patterns.length; i++) {
            thumbnails.push(Guilloche({id: i, size: 150, pattern: this.state.patterns[i], options: config.options[i], drawParams: {opacity:.05,lineWidth:1,color:"black"}, update: i==this.state.activePattern}));
        };
                            console.log("app.js");
        return (
            React.DOM.div({id: "main"}, 
                React.DOM.div({id: "ui-container"}, 
                    React.DOM.div({id: "text-container"}, 
                        React.DOM.div({id: "ui-background"}), 
                        React.DOM.h1(null, "GUILLOCHE GALLERY"), 
                        React.DOM.h2(null, "made by ", React.DOM.a({href: "#", target: "_blank"}, "@dela3499"), " and inspired by ", React.DOM.a({href: "http://www.subblue.com/projects/guilloche", target: "_blank"}, "subblue")
                        )
                    ), 
                    React.DOM.div({id: "thumbnail-container"}, 
                    thumbnails
                    )
                ), 
                React.DOM.div({id: "display-container"}, 
                    Guilloche({id: -1, size: 750, pattern: this.state.patterns[this.state.activePattern], drawParams: {opacity:.05,lineWidth:1,color:"blue"}, update: true})
                )
            )
        );
    }
});
var Guilloche = React.createClass ({displayName: 'Guilloche',
    mixins: [FluxChildMixin],
    componentDidMount: function () {   
        this.createAnimation();
        this.draw();
    },
    componentDidUpdate: function () {
        this.draw();
    },  
    shouldComponentUpdate: function () {
        return this.props.update;
    },
    render: function () {
        return (
            React.DOM.canvas({height: this.props.size, width: this.props.size, onMouseEnter: this.play, onMouseLeave: this.pause})
        );
    },
    createAnimation: function () {
        this.getFlux().actions.createAnimation({
            id: this.props.id,
            options: this.props.options    
        });
    },
    play: function () {
        this.getFlux().actions.play(this.props.id);
    },
    pause: function () {
        
        this.getFlux().actions.pause(this.props.id);
    },
    draw: function (c) {
        var c = this.getDOMNode().getContext('2d'),
            x = addToArray(scaleArray(this.props.pattern.x,this.props.size),this.props.size/2),
            y = addToArray(scaleArray(this.props.pattern.y,this.props.size),this.props.size/2);
        c.clearRect(0,0,this.props.size,this.props.size);
        var strokeColor = [255,255,255];
        if (this.props.drawParams.color == "black") {
            strokeColor = [0,0,0];
        } else if (this.props.drawParams.color == "blue") {
            strokeColor = [44,79,101];
        };
            
        c.strokeStyle = "rgba(" + strokeColor[0] + "," + strokeColor[1] + "," + strokeColor[2] + "," + this.props.drawParams.opacity + ")";
        c.lineWidth = this.props.drawParams.lineWidth;
        for (var i = 0; i < x.length - 1; i++) {
            c.beginPath();
            c.moveTo(x[i],y[i]);
            c.lineTo(x[i+1],y[i+1]);
            c.closePath();
            c.stroke();
        }
    }        
        
});
var AppStore = Fluxxor.createStore({
    initialize: function () {
        this.bindActions(
            "PLAY_ANIMATION", this.playAnim,
            "CREATE_ANIMATION", this.createAnim,
            "PAUSE_ANIMATION", this.pauseAnim
        );        
        this.animations = [];
        this.patterns = [];
        this.activePattern = 0;
        for (var i = 0; i < 12; i++) {
            this.patterns.push(getGuilloche({}));
        };
        requestAnimationFrame(this.update);
    },
    createAnim: function (p) {
        this.animations[p.id] = {
            id: p.id,
            keyframe: 0,
            playing: false,
            options: p.options
        };
        var options = {},
            anim = this.animations[p.id];
        if (anim.options) {
            anim.options.map(function (x) {
                options[x.parameter] = x.values[0];
            })
        };
        this.patterns[p.id] = getGuilloche(options);
        this.emit('change');
    },
    playAnim: function (p) {
        this.animations[p.id].playing = true;
        this.activePattern = p.id;
    },
    pauseAnim: function (p) {
        this.animations[p.id].playing = false;
    },
    update: function () {
        var store = this;
        this.animations.map(function (anim) {
            if (anim.playing) {
                var options = {};
                if (anim.options) {
                    anim.options.map(function (x) {
                        options[x.parameter] = x.values[anim.keyframe % x.values.length];
                    })
                };
                store.patterns[anim.id] = getGuilloche(options);
                anim.keyframe++;
                store.emit("change");
            };
        });
        requestAnimationFrame(this.update);
    },
        
});
var stores = {
    AppStore: new AppStore()
};
var actions = {
    play: function (payload) {
        this.dispatch("PLAY_ANIMATION", {id:payload});
    },
    pause: function (payload) {
        this.dispatch("PAUSE_ANIMATION", {id:payload});
    },
    createAnimation: function (payload) {
        this.dispatch("CREATE_ANIMATION", {id:payload.id,
                                           options: payload.options});
    }
};
var flux = new Fluxxor.Flux(stores,actions);
React.renderComponent(
    App({flux: flux}),
    document.getElementById('content')
);
