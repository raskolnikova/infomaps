import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listScript() {
        return axios.get(`${apiPrefix}/scripts`);
    },

    createScript(data) {
        return axios.post(`${apiPrefix}/scripts`, data);
    },

    deleteScript(scriptId) {
        return axios.delete(`${apiPrefix}/scripts/${scriptId}`);
    },

    updateScript(scriptId,data) {
        return axios.put(`${apiPrefix}/scripts/${scriptId}`,data);
    }

}
