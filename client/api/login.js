import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {


    // listUsers() {
    //     return axios.get(`${apiPrefix}/login`);
    // },

    createUser(data) {
        return axios.post(`${apiPrefix}/registration`, data);
    },

    // deleteDataset(datasetId) {
    //     return axios.delete(`${apiPrefix}/datasets/${datasetId}`);
    // }
}