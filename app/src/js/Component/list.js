
var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');
var ListComponent = React.createClass({
    render: function () {
        return (
            <li className="menu-item">{this.props.listText}<span className="btn-delete" onClick={this.props.deleteHandler}><i className="icon-trash icon-large"></i></span></li>
        );
    }
});


function mapDispatchToProps(dispatch, ownProps) {
    return {
        deleteHandler: function() {
            dispatch(action.deleteItem(ownProps.id));
        }
    };
}

module.exports = connect(
    null,
    mapDispatchToProps
)(ListComponent);