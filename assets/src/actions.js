import funnyobjects from './funnyobjects'

export const newItem = ({dispatch, state}, sender, modelName) => {
    dispatch('NEW_ITEM', sender, modelName);
}

export const editItem = ({dispatch, state}, sender, modelName, rowId) => {
    funnyobjects.load(rowId, (data) => {
        dispatch('EDIT_ITEM', sender, modelName, rowId, data);
    });
}

export const deleteItem = ({dispatch, state}, sender, modelName, rowId) => {
    funnyobjects.load(rowId, (data) => {
        dispatch('DELETE_ITEM', sender, modelName, rowId, data);
    });
}
