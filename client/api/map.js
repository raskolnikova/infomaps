import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listMap() {
        return axios.get(`${apiPrefix}/maps`);
    },

    createMap(data) {
        return axios.post(`${apiPrefix}/maps`, data);
    },

    deleteMap(mapId) {
        return axios.delete(`${apiPrefix}/maps/${mapId}`);
    },

    updateMap(mapId,data) {
        return axios.put(`${apiPrefix}/maps/${mapId}`,data);
    }

}
