import Vue from 'vue'
import Vuex from 'vuex'
import gridHelper from './gridHelper'
import modelHelper from './modelHelper'

Vue.use(Vuex);

const state = {
    action: {},
    labels: {},
    messages: {},
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
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
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
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
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
    },
    CONFIRM_DETAIL(state, sender, modelName, detailData, rowId, data) {
        Vue.set(state.data, 'currentRow', data);
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.messages, 'notify', modelHelper.getNotifyMessage(modelName, state.action.name, data));
        gridHelper.detail.closeDetail();
        gridHelper.detail.openNotifyMessage();
        gridHelper.actions.reload();
    },
    CONFIRM_DELETE(state, sender, modelName, rowId, data) {
        Vue.set(state.data, 'currentRow', data);
        Vue.set(state.labels, 'dialogTitle', modelHelper.getConfirmDeleteDialogTitle(modelName));
        Vue.set(state.messages, 'notify', modelHelper.getNotifyMessage(modelName, state.action.name, data));
        gridHelper.detail.closeConfirmDelete();
        gridHelper.detail.openNotifyMessage();
        gridHelper.actions.reload();
    },
    SERVER_ERROR(state, sender, modelName, req, err) {
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.messages, 'error', modelHelper.getErrorMessage(modelName, state.action.name, err));
        gridHelper.detail.openErrorMessage();
    },
}

export default new Vuex.Store({
    state,
    mutations
})
