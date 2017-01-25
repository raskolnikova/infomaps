import AppDispatcher from '../dispatcher/AppDispatcherChart';
import Constants from '../constants/AppConstants';

import api from '../api/chart';

const chartActions = {
    loadChart() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_CHART_REQUEST
        });

        api.listChart()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CHART_SUCCESS,
                chart: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CHART_FAIL,
                error: err
            })
        );
    },

    createChart(chart) {
        api.createChart(chart)
        .then(() =>
            this.loadChart()
        )
        .catch(err =>
            console.error(err),
        );
    },

    deleteChart(chartId) {
        api.deleteChart(chartId)
        .then(() =>
            this.loadChart()
        )
        .catch(err =>
            console.error(err)
        );
    },

    getChartById(chartId) {
        api.getChartById(chartId)
        .then(() =>
            this.loadChart()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default chartActions;
