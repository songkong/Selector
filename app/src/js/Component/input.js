var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');

var inputValue = '';
var InputComponent = React.createClass({
    handleChange: function (e) {
        inputValue = e.target.value;
    },
    render: function () {
        return (
            <div className="input-wrapper">
                <input type="text" name="input-add" className="menu-input" onChange={this.handleChange}/>
                <button className="btn-add" onClick={this.props.addHandler}>Add</button>
            </div>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return {
        addHandler: function() {
            dispatch(action.insertItem(inputValue));
        }
    };
}
module.exports = connect(
    null,
    mapDispatchToProps
)(InputComponent);