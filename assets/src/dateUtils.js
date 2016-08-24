// Classe di utilità per la gestione delle date
export default class {
    
    // Formatta data utilizzando il formato specificato
    static formatDate(date, format = "dd-mm-yyyy h:MM:ss") {
        let dateFormat = require('dateformat');
        return dateFormat(new Date(date), format);
    }

}