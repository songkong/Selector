var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');
var ListComponent = require('./list');
var InputComponent = require('./input');
var MenuComponent = React.createClass({
    render: function () {
        var menuDisplay = this.props.isMenuShowed? 'block': 'none';
        var icon = this.props.isMenuShowed? 'icon-arrow-right': 'icon-arrow-left';
        return (
            <div className="menu-wrapper">
                <div className="btn-menu" onClick={this.props.clickHandler}><i className={icon}></i></div>
                <div className="menu-body" style={{display: menuDisplay}}>
                    <InputComponent/>
                    <ul className="menu-detail">
                        {
                            this.props.menuList.map(function(item, index){
                                return <ListComponent listText ={item.value} key ={index} id = {item.id}/>;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state)  {
    return {
        isMenuShowed: state.isMenuShowed,
        menuList: state.menuList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clickHandler: function() {
            dispatch(action.displayMenu());
        }
    };
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent);