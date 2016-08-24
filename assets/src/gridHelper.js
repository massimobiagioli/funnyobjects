import serverSettings from './config/serverSettings.json'
import dateUtils from './dateUtils'

// Classe di utilità per gestione grid
export default class {

    // Formatter colonna datetime    
    static formatDate(toFormat) {
        return dateUtils.formatDate(toFormat);
    }

    // Formatter colonna checkbox
    static formatCheckbox(value) {
        return '<input type="checkbox" disabled' + (value === '1' ? ' checked' : '') + '>';
    }

    // Formatter colonna actions
    static formatActions(rowId) {
        return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + rowId + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + rowId + "\"><span class=\"fa fa-trash-o\"></span></button>";
    }

    // Ricarica grid
    static reload(gridName = 'main-grid') {
        $("#main-grid").bootgrid('reload');
    }

    // Restituisce impostazioni ajax per caricamento grid
    static getAjaxSettings() {
        return {
            method: 'GET',
            cache: false,
            headers: serverSettings.headers
        };
    }

    // Restituisce labels per grid
    static getLabels() {
        return {
            all: 'Tutti',
            infos: 'Visualizzazione da {{ctx.start}} a {{ctx.end}} (totale elementi: {{ctx.total}})',
            loading: 'Caricamento',
            noResults: 'Nessun risultato',
            refresh: 'Ricarica',
            search: 'Ricerca'
        };
    }

}