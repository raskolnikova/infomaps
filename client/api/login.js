import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {


     checkUser(data) {
         return axios.post(`${apiPrefix}/login`, data);
     },

    createUser(data) {
        return axios.post(`${apiPrefix}/registration`, data);
    },

    // deleteDataset(datasetId) {
    //     return axios.delete(`${apiPrefix}/datasets/${datasetId}`);
    // }
}