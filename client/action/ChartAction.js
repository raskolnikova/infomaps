import AppDispatcher from '../dispatcher/AppDispatcherChart'
import api from '../api/chart';
import Constants from '../constants/AppConstants'


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

    updateChart(chartId,chart) {
      console.log(chart);
        api.updateChart(chartId,chart)
        .then(() =>
            this.loadChart()
        )
        .catch(err =>
            console.error(err)
        );
    }




};

export default chartActions;
