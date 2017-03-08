
var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var createStore = Redux.createStore;
var reducer = require('./Reducer/reducer.js');


// Store
var store = createStore(reducer);

var MenuComponent = require('./Component/menu.js');
var CanvasComponent = require('./Component/canvas.js');

ReactDOM.render(
    <Provider store={store}>
        <div>
            <MenuComponent />
            <CanvasComponent className = 'canvas-wrapper' btnText = {{start: 'Start', stop: 'Stop'}} initText = '吃什么?' emptyText = "菜单空空如也"/>
        </div>
    </Provider>
    , document.getElementById('main-wrapper'));