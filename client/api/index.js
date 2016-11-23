import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listDataSet() {
        return axios.get(`${apiPrefix}/import`);
    },

    createDataSet(data) {
        return axios.post(`${apiPrefix}/import`, data);
    },

    deleteDataSet(dataSetId) {
        return axios.delete(`${apiPrefix}/import/${dataSetId}`);
    }
}
