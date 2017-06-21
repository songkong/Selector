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
    // Copy the data to menuList
    clone: function () {
        var copy = [];
        var keySet = [];
        for (var i = localStorage.length-1; i >= 0; i--) {
            var key = localStorage.key(i);
            if (key != 'nextId') {
                keySet.push(key);
            }
        }
        // Reverse order to make the inserted item at the top of the list
        keySet.sort(function (pre, next) {
            return -(pre - next);
        });
        for (var j = 0; j < keySet.length; j++) {
            copy.push({
                id: keySet[j],
                value: this.get(keySet[j])
            });
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
function updateState(beginSelect, isMenuShowed, isEmptyTextShowed) {
    if (local.isEmpty()){
        local.initLocal(menuList);
    }
    return {
        beginSelect: beginSelect,
        isMenuShowed: isMenuShowed,
        isEmptyTextShowed: isEmptyTextShowed,
        menuList: local.clone()
    };
}

function reducer(state, action) {
    if (typeof state === 'undefined') {
        return updateState(false, false, false);
    }
    switch(action.type){
        case type.TOGGLE_BTN:
            if (!state.isMenuShowed) {
                if (state.menuList.length) {
                    return updateState(!state.beginSelect, state.isMenuShowed, false);
                } else {
                    return updateState(state.beginSelect, state.isMenuShowed, true);
                }
            }
            break;
        case type.DISPLAY_MENU:
            if (!state.beginSelect){
                return updateState(state.beginSelect, !state.isMenuShowed, state.isEmptyTextShowed);
            }
            break;
        case type.DELETE_ITEM:
            local.remove(action.id);
            return updateState(state.beginSelect, state.isMenuShowed, state.isEmptyTextShowed);
        case type.INSERT_ITEM:
            // Only add distinct elements
            if (local.get(action.value) != -1) {
                break;
            }
            local.set(local.get('nextId'), action.value);
            local.set('nextId', parseInt(local.get('nextId')) + 1);
            return updateState(state.beginSelect, state.isMenuShowed, false);
    }
    return state;
}
module.exports = reducer;