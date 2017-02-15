var menuList = require('./data.js');
var type = require('../Action/type.js');

// localStorage
var local = {
    // load data.js
    initLocal: function (data) {
        var self =  this;
        self.set('nextId', data.length + 1);
        data.forEach(function (item) {
            self.set(item.id, item.value);
        });
    },
    isEmpty: function () {
        return !localStorage.length;
    },
    set: function (key, value) {
        localStorage.setItem(key, value);
    },
    get: function (key) {
        return localStorage.getItem(key);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clone: function () {
        var copy = [];
        for (var i=localStorage.length-1; i>=0; i--) {
            var key = localStorage.key(i);
            if (key != 'nextId') {
                copy.push({
                    id: key,
                    value: this.get(key)
                });
            }
        }
        return copy;
    }
};

/* state = {
        beginSelect: false,
        isMenuShowed: false,
        isBlankTextShowed: false,
        menuList: [{id: '123', 'value': 'abc'}]
   }
*/
function updateState(beginSelect, isMenuShowed, isBlankTextShowed) {
    if (local.isEmpty()){
        local.initLocal(menuList);
    }
    return {
        beginSelect: beginSelect,
        isMenuShowed: isMenuShowed,
        isBlankTextShowed: isBlankTextShowed,
        menuList: local.clone()
    };
}

function reducer(state, action) {
    if (typeof state === 'undefined') {
        return updateState(false, false, false);
    }
    switch(action.type){
        case type.TOGGLE_BTN:
            if (state.menuList.length) {
                return updateState(!state.beginSelect, state.isMenuShowed, false);
            } else {
                return updateState(state.beginSelect, state.isMenuShowed, true);
            }
        case type.DISPLAY_MENU:
            if (!state.beginSelect){
                return updateState(state.beginSelect, !state.isMenuShowed, state.isBlankTextShowed);
            }
            break;
        case type.DELETE_ITEM:
            local.remove(action.id);
            return updateState(state.beginSelect, state.isMenuShowed, state.isBlankTextShowed);
        case type.INSERT_ITEM:
            local.set(local.get('nextId'), action.value);
            local.set('nextId', parseInt(local.get('nextId')) + 1);
            return updateState(state.beginSelect, state.isMenuShowed, false);
    }
    return state;
}
module.exports = reducer;