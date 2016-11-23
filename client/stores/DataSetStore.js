import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _dataset = [];
let _loadingError = null;
let _isLoading = true;

function formatDataSet(dataset) {
    return {
        id: dataset._id,
        name: dataset.name,
        createdAt: dataset.createdAt
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getDataSet() {
        return _dataset;
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
        case AppConstants.LOAD_DATASET_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_DATASET_SUCCESS: {
            _isLoading = false;
            _dataset = action.dataset.map( formatDataSet );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_DATASET_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;
