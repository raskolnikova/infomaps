import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcherChart';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _charts = [];
let _loadingError = null;
let _isLoading = true;

function formatChart(chart) {
    return {
        id: chart._id,
        name: chart.name,
        file:chart.file,
        visibleColumns:chart.visibleColumns,
        type:chart.type,
        createdAt: chart.createdAt
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getСharts() {
        return _charts;
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
        case AppConstants.LOAD_CHART_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CHART_SUCCESS: {
            _isLoading = false;
            _charts = action.chart.map( formatchart );
            _loadingError = null;

            TasksStore.emitChange();

            break;
        }

        case AppConstants.LOAD_CHART_FAIL: {
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
