import AppDispatcher from '../dispatcher/AppDispatcherScript'
import Constants from '../constants/AppConstants'
import api from '../api/script';


const scriptActions = {
    loadScripts() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_SCRIPT_REQUEST
        });

        api.listScript()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_SCRIPT_SUCCESS,
                script: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_SCRIPT_FAIL,
                error: err
            })
        );
    },

    createScript(script) {
        api.createScript(script)
        .then(() =>
            this.loadScripts()
        )
        .catch(err =>
            console.error(err),
        );
    },

    deleteScript(scriptId) {
        api.deleteScript(scriptId)
        .then(() =>
            this.loadScripts()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateScript(scriptId,script) {
        api.updateScript(scriptId,script)
        .then(() =>
            this.loadScript()
        )
        .catch(err =>
            console.error(err)
        );
    }

};

export default scriptActions;
