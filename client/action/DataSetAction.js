import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const DataSetActions = {
    loadDataSet() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_DATASET_REQUEST
        });

        api.listDataSet()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_DATASET_SUCCESS,
                dataset: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_DATASET_FAIL,
                error: err
            })
        );
    },

    createDataSet(dataset) {
        api.createDataSet(dataset)
        .then(() =>
            this.loadDataSet(),
        )
        .catch(err =>
            console.error(err),
        );
console.log(dataset)
    },

    deleteDataSet(dataSetId) {
        api.deleteDataSet(dataSetId)
        .then(() =>
            this.loadDataSet()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default DataSetActions;
