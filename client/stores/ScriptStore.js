import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcherScript';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _scripts = [];
let _loadingError = null;
let _isLoading = true;

function formatScript(script) {
    return {
        id: script._id,
        name: script.name,
        maps:script.maps,
        charts:script.charts,
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getScripts() {
        return _scripts;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_SCRIPT_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_SCRIPT_SUCCESS: {
            _isLoading = false;
            _scripts = action.script.map( formatScript );
            _loadingError = null;

            TasksStore.emitChange();

            break;
        }

        case AppConstants.LOAD_SCRIPT_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();

            break;
        }

        default: {
            console.log(action.type);
        }
    }
});

export default TasksStore;
