/** @jsx React.DOM */



// Prepare mixins which allow React components to trigger actions and read/sync-with data stores
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass ({
    mixins: [FluxMixin, StoreWatchMixin("AppStore")],
    getStateFromFlux: function () {
        var flux = this.getFlux();
        console.log("getting state from flux");
        console.log(flux.store("AppStore").patterns.map(function (p) {return p.x.length;}));
        return {
            activePattern: flux.store("AppStore").activePattern,
            patterns: flux.store("AppStore").patterns
        }
    },  
    componentWillMount: function () {
        console.log("APP will mount");
    },    
    componentDidMount: function () {
        console.log("APP did mount");
    },
    render: function () {
        var thumbnails = [];
        for (var i = 0; i < this.state.patterns.length; i++) {
            thumbnails.push(<Guilloche id={i} size={150} pattern={this.state.patterns[i]} options={config.options[i]} drawParams={{opacity:.05,lineWidth:1,color:"black"}} update={i==this.state.activePattern}/>);
        };
        return (
            <div id="main">
                <div id="ui-container">
                    <div id="ui-background"></div>        
                    <h1>GUILLOCHE GALLERY</h1>
                    <h2>made by <a href="#">@dela3499</a> and inspired by <a href="http://www.subblue.com/projects/guilloche">subblue</a> 
                    </h2>
                    <div id="thumbnail-container">
                    {thumbnails}
                    </div>
                </div>
                <div id="display-container">
                    <Guilloche id={-1} size={750} pattern={this.state.patterns[this.state.activePattern]} drawParams={{opacity:.05,lineWidth:1,color:"black"}} update={true}/>
                </div>                            
            </div>
        );
    }
});
var Guilloche = React.createClass ({
    mixins: [FluxChildMixin],
    componentWillMount: function () {
        console.log("componentWillMount");
//        this.createAnimation();
    },
    componentDidMount: function () {
        console.log("componentDidMount");    
        this.createAnimation();
        this.draw();
    },
    componentDidUpdate: function () {
        console.log("componentDidUpdate");
        this.draw();
    },  
    shouldComponentUpdate: function () {
//        return false;
        return this.props.update;
    },
    render: function () {
        return (
            <canvas height={this.props.size} width={this.props.size} onMouseEnter={this.play} onMouseLeave={this.pause}></canvas>
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
        var props = this.props;
        console.log(props);
        var c = this.getDOMNode().getContext('2d'),
            x = addToArray(scaleArray(this.props.pattern.x,this.props.size),this.props.size/2),
            y = addToArray(scaleArray(this.props.pattern.y,this.props.size),this.props.size/2);
        c.clearRect(0,0,this.props.size,this.props.size);
        var strokeColor = 255;
        if (this.props.drawParams.color == "black") {
            strokeColor = 0;
        };
            
        c.strokeStyle = "rgba(" + strokeColor + "," + strokeColor + "," + strokeColor + "," + this.props.drawParams.opacity + ")";
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
        console.log("INITIALIZING APPSTORE");
        requestAnimationFrame(this.update);
    },
    createAnim: function (p) {
        console.log("creating animation for: " + p.id);
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
//        console.log("UPDATE");
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
        console.log("updating store");
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
    <App flux={flux}/>,
    document.getElementById('content')
);
