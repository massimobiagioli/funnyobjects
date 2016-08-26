// Model Helper
export default class {

    // Imposta titolo per dialog dettaglio
    static getDetailDialogTitle(modelName, action) {
        let dialogTitle = (action === 'new' ? 'Nuovo' : 'Modifica');
        dialogTitle += ' ' + this.modelNameToDescription(modelName);
        return dialogTitle;
    }

    // Imposta titolo per dialog conferma cancellazione
    static getConfirmDeleteDialogTitle(modelName) {
        return 'Cancellazione ' + this.modelNameToDescription(modelName);
    }

    // Imposta messaggio dialog di notifica
    static getNotifyMessage(modelName, action, data) {
        let msg = 'Operazione effettuata con successo';
        switch (modelName) {
            case 'funnyobject':
                msg += ' - ' + this.modelNameToDescription(modelName) + ': ' + data.fob_des;
                break;
            default:
                break;
        }
        return msg;
    }

    // Imposta messaggio dialog di errore
    static getErrorMessage(modelName, action, err) {
        return "ERRORE: " + err;
    }

    // Ricava descrizione da nome model
    static modelNameToDescription(modelName) {
        let desc = '';
        switch (modelName) {
            case 'funnyobject':
                desc = ' Oggetto';
                break;
            case 'settings':
                desc = ' Impostazioni'
                break;
            default:
                desc = ' Elemento'
                break;
        }
        return desc;
    }

}