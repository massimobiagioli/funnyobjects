import backEndFactory from './backEndFactory'
import dialogHelper from './dialogHelper'
import modelHelper from './modelHelper'

// Crea oggetto per gestione backEnd
let backEnd = backEndFactory.create();

// Reset State
export const resetState = ({dispatch, state}) => {
    dispatch('RESET_STATE');
}

// Preparazione aggiunta di un nuovo elemento
export const newItem = ({dispatch, state}, sender, modelName) => {
    dispatch('NEW_ITEM', sender, modelName);
    dialogHelper.openDetail();
}

// Preparazione modifica di un elemento esistente
export const editItem = ({dispatch, state}, sender, modelName, rowId) => {
    backEnd.load(modelName, rowId, (data) => {
        dispatch('EDIT_ITEM', sender, modelName, rowId, data);
        dialogHelper.openDetail();
    });
}

// Preparazione cancellazione di un elemento
export const deleteItem = ({dispatch, state}, sender, modelName, rowId) => {
    backEnd.load(modelName, rowId, (data) => {
        dispatch('DELETE_ITEM', sender, modelName, rowId, data);
        dialogHelper.openConfirmDelete();
    }, (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
        dialogHelper.openErrorMessage();
    });
}

// Conferma inserimento/modifica elemento
export const confirmDetail = ({dispatch, state}, sender, modelName, detailData, rowId) => {
    let onSuccess = (data) => {
        dispatch('CONFIRM_DETAIL', sender, modelName, detailData, rowId, data);
        dialogHelper.closeDetail();
        dialogHelper.openNotifyMessage();
    };
    let onError = (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
        dialogHelper.openErrorMessage();
    }
    if (!rowId) {
        backEnd.insert(modelName, detailData, onSuccess, onError);
    } else {
        backEnd.update(modelName, rowId, detailData, onSuccess, onError);
    }
}

// Conferma cancellazione elemento
export const confirmDelete = ({dispatch, state}, sender, modelName, rowId) => {
    let onSuccess = (data) => {
        dispatch('CONFIRM_DELETE', sender, modelName, rowId, data);
        dialogHelper.closeConfirmDelete();
        dialogHelper.openNotifyMessage();
    };
    let onError = (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
        dialogHelper.openErrorMessage();
    }
    backEnd.del(modelName, rowId, onSuccess, onError);
}

// Gestione sottoelementi
export const editSubItems = ({dispatch, state}, sender, modelName, rowId) => {
    backEnd.load(modelName, rowId, (data) => {
        dispatch('EDIT_SUBITEMS', sender, modelName, rowId, data);
        dialogHelper.open(modelHelper.getSubItemsDialogName(modelName));
    });
}

// Preparazione aggiunta di un nuovo sottoelemento
export const newSubItem = ({dispatch, state}, sender, modelName, parentId) => {
    dispatch('NEW_SUBITEM', sender, modelName, parentId);
    dialogHelper.openDetailSubItem();
}

// Conferma inserimento/modifica sottoelemento
export const confirmDetailSubItem = ({dispatch, state}, sender, modelName, detailData, rowId) => {
    let onSuccess = (data) => {
        dispatch('CONFIRM_DETAIL_SUBITEM', sender, modelName, detailData, rowId, data);
        dialogHelper.closeDetailSubItem();
        dialogHelper.openNotifyMessage();
    };
    let onError = (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
        dialogHelper.openErrorMessage();
    }
    if (!rowId) {
        backEnd.insert(modelName, detailData, onSuccess, onError);
    } else {
        backEnd.update(modelName, rowId, detailData, onSuccess, onError);
    }
}