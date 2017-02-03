/**
 * Created by kongsong on 2017/2/2.
 */
var CanvasComponent = React.createClass({displayName: "CanvasComponent",
    componentDidMount: function () {
        this.initCanvas();
    },
    eyes: {
        leftEye: {
            x: 250,
            y: 700,
            radius: 80
        },
        rightEye: {
            x: 550,
            y: 700,
            radius: 80
        }
    },
    drawEyes: function (ctx, direction) {
        var params = this.eyes[direction];
        ctx.lineWidth=10;
        ctx.strokeStyle="#fff";
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(params.x + 30, params.y - 30, params.radius / 4, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    },
    drawMouse: function (ctx) {
        ctx.fillStyle="#fff";
        ctx.beginPath();
        ctx.arc(400, 900, 80, 0, Math.PI, true);
        ctx.fill();
        ctx.closePath();
    },
    initCanvas: function () {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle = '#82ebc6';
        ctx.fillRect(0,0,800,1000);
        ctx.fillStyle = '#fff';
        this.drawEyes(ctx, 'leftEye');
        this.drawEyes(ctx, 'rightEye');
        this.drawMouse(ctx);
        ctx.strokeStyle="#fff";
        ctx.moveTo(525, 550);
        ctx.lineTo(510, 480);
        ctx.moveTo(525, 550);
        ctx.lineTo(570, 480);
        ctx.lineTo(650, 480);
        ctx.arcTo(690, 480, 690, 440, 40);
        ctx.arcTo(690, 120, 650, 120, 40);
        ctx.arcTo(110, 120, 110, 160, 40);
        ctx.arcTo(110, 480, 150, 480, 40);
        ctx.lineTo(513,480);
        ctx.stroke();
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("canvas", {ref: "canvas", width: 800, height: 1000}), 
                React.createElement("span", null, "Click Me")
            )
        );
    }
});