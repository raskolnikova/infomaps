import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listDataset() {
        return axios.get(`${apiPrefix}/datasets`);
    },

    createDataset(data) {
        return axios.post(`${apiPrefix}/import`, data);
    },

    deleteDataset(datasetId) {
        return axios.delete(`${apiPrefix}/import/${datasetId}`);
    }
}
