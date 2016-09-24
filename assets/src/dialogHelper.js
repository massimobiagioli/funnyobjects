// Classe di utilità per gestione delle dialog
export default class {
    
    // Apertura dialog, dato in ingresso il nome
    static open(detailName) {
        $('#' + detailName).modal('show');
    }

    // Apre dialog gestione dettaglio
    static openDetail() {
        this.open('detail');
    }
    
    // Apre dialog per conferma cancellazione elemento
    static openConfirmDelete() {
        this.open('confirmDelete');
    }

    // Apre dialog per conferma cancellazione sottoelemento
    static openConfirmDeleteSubItem() {
        this.open('confirmDeleteSubItem');
    }

    // Apre dialog per notifica messaggio
    static openNotifyMessage() {
        this.open('notifyMessage');
    }

    // Apre dialog per visualizzazione errore
    static openErrorMessage() {
        this.open('errorMessage');
    }

    // Apre dialog gestione dettaglio sottoelemento
    static openDetailSubItem() {
        this.open('detailSubItem');
    }

    // Chiude dialog gestione dettaglio
    static close(detailName) {
        $('#' + detailName).modal('hide');
    }

    // Apre dialog gestione dettaglio
    static closeDetail() {
        this.close('detail');
    }

    // Chiude dialog per conferma cancellazione elemento
    static closeConfirmDelete() {
        this.close('confirmDelete');
    }

    // Chiude dialog per conferma cancellazione sottoelemento
    static closeConfirmDeleteSubItem() {
        this.close('confirmDeleteSubItem');
    }

    // Chiude dialog per notifica messaggio
    static closeNotifyMessage() {
        this.close('notifyMessage');
    }

    // Chiude dialog per visualizzazione errore
    static closeErrorMessage() {
        this.close('errorMessage');
    }

    // Chiude dialog gestione dettaglio sottoelemento
    static closeDetailSubItem() {
        this.close('detailSubItem');
    }

}