export default {
    formatDate: (date, format = "dd-mm-yyyy h:MM:ss") => {
        let dateFormat = require('dateformat');
        return dateFormat(new Date(date), format);
    }
}