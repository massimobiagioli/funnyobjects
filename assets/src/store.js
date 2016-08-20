import Vue from 'vue'
import Vuex from 'vuex'
import gridHelper from './gridHelper'

Vue.use(Vuex);

const state = {
    action: {},
    labels: {},
    data: {
        currentRow: {}
    }
};

export const mutations = {
    NEW_ITEM(state, sender, modelName, rowId) {
        Vue.set(state, 'action', {  
            name: 'new',
            sender,
            modelName
        });
        Vue.set(state.labels, 'dialogTitle', 'Nuovo Oggetto');
        Vue.set(state.data, 'currentRow', {});
        gridHelper.detail.openDetail();
    }, 
    EDIT_ITEM(state, sender, modelName, rowId, data) {
        Vue.set(state, 'action', {  
            name: 'edit',
            sender,
            modelName,
            rowId
        });
        Vue.set(state.labels, 'dialogTitle', 'Modifica Oggetto');
        Vue.set(state.data, 'currentRow', data);
        gridHelper.detail.openDetail();
    },
    DELETE_ITEM(state, sender, modelName, rowId, data) {
        Vue.set(state, 'action', {  
            name: 'delete',
            sender,
            modelName,
            rowId
        });
        Vue.set(state.data, 'currentRow', data);
        gridHelper.detail.openConfirmDelete();
    }
}

export default new Vuex.Store({
    state,
    mutations
})
