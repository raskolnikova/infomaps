import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcherMap';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _maps = [];
let _loadingError = null;
let _isLoading = true;

function formatMap(map) {
    return {
        id: map._id,
        name: map.name,
        data:map.data,
        type:map.type,
        visibleColumns:map.visibleColumns,
        colorSchema:map.colorSchema,
        createdAt: map.createdAt,
        domen:map.domen,
        ISO3Column:map.ISO3Column
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getMaps() {
        return _maps;
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
        case AppConstants.LOAD_MAP_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_MAP_SUCCESS: {
            _isLoading = false;
            _maps = action.map.map( formatMap );
            _loadingError = null;

            TasksStore.emitChange();

            break;
        }

        case AppConstants.LOAD_MAP_FAIL: {
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
