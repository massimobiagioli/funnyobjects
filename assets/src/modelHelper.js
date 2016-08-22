let modelHelper = {
    getDetailDialogTitle: (modelName, action) => {
        let dialogTitle = (action === 'new' ? 'Nuovo' : 'Modifica');
        dialogTitle += ' ' + modelHelper.modelNameToDescription(modelName);
        return dialogTitle;
    },
    getConfirmDeleteDialogTitle: (modelName) => {
        return 'Cancellazione ' + modelHelper.modelNameToDescription(modelName);
    },
    getNotifyMessage: (modelName, action, data) => {
        let msg = "Operazione effettuata con successo - "
        msg += modelHelper.modelNameToDescription(modelName) + ': ' + data.fob_des;
        return msg;
    },
    getErrorMessage: (modelName, action, err) => {
        return "ERRORE: " + err;
    },
    modelNameToDescription: (modelName) => {
        let desc = '';
        switch (modelName) {
            case 'funnyobject':
                desc = ' Oggetto';
                break;
            default:
                desc = ' Elemento'
                break;
        }
        return desc;
    }
};

export default modelHelper
