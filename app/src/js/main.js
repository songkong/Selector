/**
 * Created by kongsong on 2017/2/1.
 */
var menuList = require('./data.js');
var CanvasComponent = require('./canvas.js');
ReactDOM.render(<CanvasComponent className = 'canvas-wrapper' btnText = {{start: 'Start', stop: 'Stop'}} initText = '吃什么?' menuList = {menuList} />, document.getElementById('main-wrapper'));