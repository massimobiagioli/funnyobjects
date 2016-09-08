import Vue from 'vue'
import Vuex from 'vuex'
import gridHelper from './gridHelper'
import modelHelper from './modelHelper'

Vue.use(Vuex);

// Inizializzazione state
const state = {
    action: {},
    labels: {},
    messages: {},
    data: {
        currentRow: {},
    }
};

export const mutations = {
    
    // Reset State
    RESET_STATE(state) {
        Vue.set(state, 'action', {});
        Vue.set(state, 'labels', {});
        Vue.set(state, 'messages', {});
        Vue.set(state.data, 'currentRow', {});
        Vue.set(state.data, 'currentRowSubItem', {});
    }, 

    // Preparazione aggiunta di un nuovo elemento
    NEW_ITEM(state, sender, modelName, rowId) {
        Vue.set(state, 'action', {  
            name: 'new',
            sender,
            modelName
        });
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.data, 'currentRow', {});
    }, 

    // Preparazione modifica elemento esistente
    EDIT_ITEM(state, sender, modelName, rowId, data) {
        Vue.set(state, 'action', {  
            name: 'edit',
            sender,
            modelName,
            rowId
        });
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.data, 'currentRow', data);
    },

    // Preparazione cancellazione elemento esistente
    DELETE_ITEM(state, sender, modelName, rowId, data) {
        Vue.set(state, 'action', {  
            name: 'delete',
            sender,
            modelName,
            rowId
        });
        Vue.set(state.data, 'currentRow', data);
    },

    // Conferma inserimento/modifica elemento
    CONFIRM_DETAIL(state, sender, modelName, detailData, rowId, data) {
        Vue.set(state.data, 'currentRow', data);
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.messages, 'notify', modelHelper.getNotifyMessage(modelName, state.action.name, data));
        gridHelper.reload();
    },

    // Conferma cancellazione elemento
    CONFIRM_DELETE(state, sender, modelName, rowId, data) {
        Vue.set(state.data, 'currentRow', data);
        Vue.set(state.labels, 'dialogTitle', modelHelper.getConfirmDeleteDialogTitle(modelName));
        Vue.set(state.messages, 'notify', modelHelper.getNotifyMessage(modelName, state.action.name, data));
        gridHelper.reload();
    },

    // Gestione errore server
    SERVER_ERROR(state, sender, modelName, req, err) {
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.messages, 'error', modelHelper.getErrorMessage(modelName, state.action.name, err));
    },

    // Gestione sottoelementi
    EDIT_SUBITEMS(state, sender, modelName, rowId, data) {
        Vue.set(state, 'action', {  
            name: 'edit-subitems',
            sender,
            modelName,
            rowId
        });
        Vue.set(state.data, 'currentRow', data);
    },

    // Preparazione aggiunta di un nuovo sottoelemento
    NEW_SUBITEM(state, sender, modelName, parentId) {
        Vue.set(state, 'action', {  
            name: 'new',
            sender,
            modelName,
            parentId
        });
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.data, 'currentRow', {});
        Vue.set(state.data, 'currentRowSubItem', {});
    }
}

export default new Vuex.Store({
    state,
    mutations
})
