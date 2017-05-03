import AppDispatcher from '../dispatcher/AppDispatcherUser';
import Constants from '../constants/AppConstants';

import api from '../api/login';

const UserActions = {
    checkUser(user) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_USER_REQUEST
        });

        api.checkUser(user)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_SUCCESS,
                isAllRight: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_FAIL,
                error: err
            })
        );
    },
    createUser(user) {
        api.createUser(user)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_ISNOTEXIST,
                isExistUser: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_ISEXIST,
                error: err
            })
        );
    },

    // deleteDataset(datasetId) {
    //     api.deleteDataset(datasetId)
    //     .then(() =>
    //         this.loadDataset()
    //     )
    //     .catch(err =>
    //         console.error(err)
    //     );
    // }
};

export default UserActions;
