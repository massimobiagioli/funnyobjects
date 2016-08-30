import queryDataHandler from './queryDataHandler'

// Gestione backEnd con Codeigniter
export default class {
    
    constructor(baseUrl, headers) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    // Restituisce url da utilizzare nella grid per il caricamento dei dati
    getUrlForQuery(modelName, req, searchFieldName) {    
        let queryData = queryDataHandler.init(req);
        queryData = queryDataHandler.setSearchPhraseFilter(queryData, req, searchFieldName);
        queryData = queryDataHandler.setSort(queryData, req);
        return this.baseUrl + '/' + modelName + '/' + queryDataHandler.encode(queryData);
    }

    // Restituisce url da utilizzare nella grid per il caricamento di sottoelementi
    getUrlForQuerySubItem(modelName, parentId, req, searchFieldName) {
        let queryData = queryDataHandler.init(req);
        queryData = queryDataHandler.setSubItemFilter(queryData, parentId, searchFieldName);
        queryData = queryDataHandler.setSort(queryData, req);
        return this.baseUrl + '/' + modelName + '/' + queryDataHandler.encode(queryData);
    }

    // Carica elemento in funzione dell'identificativo row
    load(modelName, rowId, onSuccess, onError) {
        $.ajax({
            url: this.baseUrl + '/' + modelName + '/' + rowId,
            headers: this.headers,
            success: onSuccess,
            error: onError
        });
    }

    // Inserisce un nuovo elemento
    insert(modelName, data, onSuccess, onError) {
        $.ajax({
            method: 'POST',
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: this.baseUrl + '/' + modelName,
            data: JSON.stringify(data),
            headers: this.headers,
            success: onSuccess,
            error: onError
        });
    }

    // Aggiorna elemento in funzione dell'identificativo row
    update(modelName, rowId, data, onSuccess, onError) {
        $.ajax({
            method: 'PUT',
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: this.baseUrl + '/' + modelName + '/' + rowId,
            data: JSON.stringify(data),
            headers: this.headers,
            success: onSuccess,
            error: onError
        });
    }

    // Cancella elemento in funzione dell'identificativo row
    del(modelName, rowId, onSuccess, onError) {
        $.ajax({
            method: 'DELETE',
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: this.baseUrl + '/' + modelName + '/' + rowId,
            headers: this.headers,
            success: onSuccess,
            error: onError
        });
    }

}