import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcherUser';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _users = [];
let _loadingError = null;
let _isLoading = true;
let _isExistUser=false;

function formatUser(user) {
    return {
        id: user._id,
        email:user.email,
        password: user.password
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getUsers() {
        return _users;
    },
       getAnswerFromServer() {
        return _isExistUser;
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
    console.log(action.type)
    switch(action.type) {
        case AppConstants.LOAD_USER_REQUEST: {
            _isLoading = true;
            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_SUCCESS: {
            _isLoading = false;
            _users = action.user.map( formatUser );
            _loadingError = null;
            TasksStore.emitChange();
            break;
        }
        case AppConstants.LOAD_USER_FAIL: {
            _loadingError = action.error;
            TasksStore.emitChange();
            break;
        }

          case AppConstants.LOAD_USER_ISEXIST: {
            _isExistUser=true;
            TasksStore.emitChange();
            break;
        }

         case AppConstants.LOAD_USER_ISNOTEXIST: {
            _isExistUser=false;
            TasksStore.emitChange();
            break;
        }

        default: {
            console.trace('No such handler');
        }
    }
});

export default TasksStore;
