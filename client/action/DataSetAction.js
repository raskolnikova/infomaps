import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const DatasetActions = {
    loadDataset() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_DATASET_REQUEST
        });

        api.listDataset()
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

    createDataset(dataset) {
        api.createDataset(dataset)
        .then(() =>
            this.loadDataset(),
        )
        .catch(err =>
            console.error(err),
        );
    },

    deleteDataset(dataSetId) {
        api.deleteDataSet(dataSetId)
        .then(() =>
            this.loadDataSet()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default DatasetActions;
