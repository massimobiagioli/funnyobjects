import backEndFactory from './backEndFactory'

// Crea oggetto per gestione backEnd
let backEnd = backEndFactory.create();

// Preparazione aggiunta di un nuovo elemento
export const newItem = ({dispatch, state}, sender, modelName) => {
    dispatch('NEW_ITEM', sender, modelName);
}

// Preparazione modifica di un elemento esistente
export const editItem = ({dispatch, state}, sender, modelName, rowId) => {
    backEnd.load(modelName, rowId, (data) => {
        dispatch('EDIT_ITEM', sender, modelName, rowId, data);
    });
}

// Preparazione cancellazione di un elemento
export const deleteItem = ({dispatch, state}, sender, modelName, rowId) => {
    backEnd.load(modelName, rowId, (data) => {
        dispatch('DELETE_ITEM', sender, modelName, rowId, data);
    }, (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
    });
}

// Conferma inserimento/modifica elemento
export const confirmDetail = ({dispatch, state}, sender, modelName, detailData, rowId) => {
    let onSuccess = (data) => {
        dispatch('CONFIRM_DETAIL', sender, modelName, detailData, rowId, data);
    };
    let onError = (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
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
    };
    let onError = (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
    }
    backEnd.del(modelName, rowId, onSuccess, onError);
}