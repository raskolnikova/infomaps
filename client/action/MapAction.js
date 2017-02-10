import AppDispatcher from '../dispatcher/AppDispatcherMap'
import Constants from '../constants/AppConstants'
import api from '../api/map';


const mapActions = {
    loadMaps() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_MAP_REQUEST
        });

        api.listMap()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MAP_SUCCESS,
                map: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MAP_FAIL,
                error: err
            })
        );
    },

    createMap(map) {
        api.createMap(map)
        .then(() =>
            this.loadMaps()
        )
        .catch(err =>
            console.error(err),
        );
    },

    deleteMap(mapId) {
        api.deleteMap(mapId)
        .then(() =>
            this.loadMaps()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateMap(mapId,map) {
      console.log(map);
        api.updateMap(mapId,map)
        .then(() =>
            this.loadMaps()
        )
        .catch(err =>
            console.error(err)
        );
    }




};

export default mapActions;
