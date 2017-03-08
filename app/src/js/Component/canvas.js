
var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');
var CanvasComponent = React.createClass({
    eyes: {
        leftEye: {
            x: 125,
            y: 350,
            radius: 40
        },
        rightEye: {
            x: 265,
            y: 350,
            radius: 40
        }
    },
    timer: null,
    componentDidMount: function () {
        this.initCanvas({count: 0, text: this.props.initText, smile: false});
    },
    componentDidUpdate: function () {
        var self = this;
        var menuLength = self.props.menuList.length;
        if (self.props.beginSelect) {
            var count = 0;
            self.timer = setInterval(function () {
                self.initCanvas({count: count++, text: self.props.menuList[Math.floor(Math.random() * menuLength)].value, smile: false});
            },100);
        } else if(self.props.isEmptyTextShowed) {
            self.initCanvas({count: 0, text: self.props.emptyText, smile: false});
        } else if(self.timer){
            clearInterval(self.timer);
            self.timer = null;
            self.initCanvas({count: 5, text: self.props.menuList[Math.floor(Math.random() * menuLength)].value, smile: true});
        } else {
            self.initCanvas({count: 0, text: self.props.initText, smile: false});
        }
    },
    drawEyes: function (option) {
        var ctx =  option.ctx;
        var params = this.eyes[option.direction];
        var deg = 2 * Math.PI / 360 * option.deg;
        var x_offset = 21 * Math.cos(deg);
        var y_offset = 21 * Math.sin(deg);
        ctx.lineWidth=5;
        ctx.strokeStyle="#fff";
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(params.x  + x_offset, params.y  + y_offset, params.radius / 4, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    },
    drawMouse: function (option) {
        var ctx = option.ctx;
        ctx.fillStyle="#fff";
        ctx.beginPath();
        if (option.smile) {
            ctx.arc(195, 420, 40, 0, Math.PI, false);
        } else {
            ctx.arc(195, 440, 10, 0, Math.PI * 2, true);
        }
        ctx.fill();
        ctx.closePath();
    },
    drawBox: function (option) {
        var ctx = option.ctx;
        var text = option.text;
        ctx.strokeStyle="#fff";
        ctx.moveTo(264, 275);
        ctx.lineTo(250, 240);
        ctx.moveTo(263, 275);
        ctx.lineTo(285, 240);
        ctx.lineTo(325, 240);
        ctx.arcTo(345, 240, 345, 220, 20);
        ctx.arcTo(345, 60, 325, 60, 20);
        ctx.arcTo(55, 60, 55, 80, 20);
        ctx.arcTo(55, 240, 75, 240, 20);
        ctx.lineTo(252,240);
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = "32pt Calibri";
        ctx.textAlign = 'center';
        ctx.fillText(text,200,165,240);
    },
    initCanvas: function (option) {
        var deg = option.count* 36 + 90;
        var ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle = '#82ebc6';
        ctx.fillRect(0,0,400,500);
        this.drawEyes({ctx: ctx, direction: 'leftEye', deg: deg});
        this.drawEyes({ctx: ctx, direction: 'rightEye', deg: deg});
        this.drawMouse({ctx: ctx, smile: option.smile});
        this.drawBox({ctx: ctx, text: option.text});
    },
    render: function () {
        var currentText = this.props.beginSelect? this.props.btnText.stop: this.props.btnText.start;
        return (
            <div className="canvas-wrapper">
                <canvas ref="canvas" width={400} height={500} />
                <div className="btn-wrapper">
                    <div onClick={this.props.clickHandler} className="btn-primary">{currentText}</div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state)  {
    return {
        beginSelect: state.beginSelect,
        isEmptyTextShowed: state.isEmptyTextShowed,
        menuList: state.menuList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clickHandler: function() {
            dispatch(action.toggleBtn());
        }
    };
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(CanvasComponent);