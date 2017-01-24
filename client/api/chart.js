import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listChart() {
        return axios.get(`${apiPrefix}/charts`);
    },

    createChart(data) {
        return axios.post(`${apiPrefix}/charts`, data);
    },

    deleteChart(chartId) {
        return axios.delete(`${apiPrefix}/charts/${chartId}`);
    }
}
