var type = require('./type');

var action = {
    insertItem: function (value) {
        return {
            type: type.INSERT_ITEM,
            value
        }
    },
    deleteItem: function (id) {
        return {
            type: type.DELETE_ITEM,
            id
        }
    },
    displayMenu: function () {
        return {
            type: type.DISPLAY_MENU
        }
    },
    toggleBtn: function () {
        return {
            type: type.TOGGLE_BTN
        }
    }
} ;

module.exports = action;