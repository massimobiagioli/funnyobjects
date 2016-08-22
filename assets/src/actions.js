import backEnd from './backEnd'

export const newItem = ({dispatch, state}, sender, modelName) => {
    dispatch('NEW_ITEM', sender, modelName);
}

export const editItem = ({dispatch, state}, sender, modelName, rowId) => {
    backEnd.load(modelName, rowId, (data) => {
        dispatch('EDIT_ITEM', sender, modelName, rowId, data);
    });
}

export const deleteItem = ({dispatch, state}, sender, modelName, rowId) => {
    backEnd.load(modelName, rowId, (data) => {
        dispatch('DELETE_ITEM', sender, modelName, rowId, data);
    }, (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
    });
}

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

export const confirmDelete = ({dispatch, state}, sender, modelName, rowId) => {
    let onSuccess = (data) => {
        dispatch('CONFIRM_DELETE', sender, modelName, rowId, data);
    };
    let onError = (req, err) => {
        dispatch('SERVER_ERROR', sender, modelName, req, err);
    }
    backEnd.del(modelName, rowId, onSuccess, onError);
}