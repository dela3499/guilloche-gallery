/** @jsx React.DOM */

// Prepare mixins which allow React components to trigger actions and read/sync-with data stores
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass ({
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
        for (var i = 0; i < 18; i++) {
            thumbnails.push(<Guilloche id={i} size={150} pattern={this.state.patterns[i]}/>);
        };
        return (
            <div id="container-1">
                <Guilloche id={-1} size={750} pattern={this.state.patterns[this.state.activePattern]}/>
            </div>
            <div id="container-2">
                <h1>Guilloche Gallery</h1>
                <h2>made by <a href="#">@dela3499</a> 
                    & inspired by <a href="http://www.subblue.com/projects/guilloche">subblue</a> 
                </h2>
                {thumbnails}
            </div>
        );
    }
});
var Guilloche = React.createClass ({
    mixins: [FluxChildMixin],
    componentDidUpdate: function () {
        this.draw();
    },    
    render: function () {
        return (
            <canvas height={this.props.size} width={this.props.size} onMouseEnter={this.play} onMouseLeave{this.pause}></canvas>
        );
    },
    play: function () {
        this.getFlux().actions.play(this.props.id);
    },
    pause: function () {
        this.getFlux().actions.pause(this.props.id);
    },
    draw: function (c) {
        var c = this.getDOMNode().getContext('2d'),
            x = this.props.pattern.x,
            y = this.props.pattern.y;
        c.clearRect(0,0,this.props.size,this.props.size);
        c.strokeStyle = "rgba(255,255,255,0.05)";
        c.lineWidth = 1;
        for (var i = 0; i < x.length - 1; i++) {
            c.beginPath();
            c.moveTo(x[i],y[i]);
            c.lineTo(x[i+1],y[i+1]);
            c.closePath();
            c.stroke();
        }
    }        
        
});

var X = React.createClass ({
    render: function () {
        return (
            <div></div>
        );
    }
});

var flux = new Fluxxor.Flux(stores,actions);
React.renderComponent(
    <App flux={flux}/>,
    document.getElementById('content')
);
