// Gestore QueryData
export default class {
    
    // Inizializza struttura QueryData in funzione della request
    static init(req) {
        return {
            limit: req.rowCount,
            offset: req.rowCount * (req.current > 0 ? req.current - 1 : 0),  
            filters: [],
            sort: []
        };
    }

    // Imposta filtro in funzione della frase di ricerca
    static setSearchPhraseFilter(qd, req, name) {
        if (req.searchPhrase) {
            qd.filters.push({
                name: name,
                operator: 'LIKE',
                value: '%' + req.searchPhrase + '%' 
            });
        }
        return qd;
    }

    // Imposta filtro per ricerca elementi figli
    static setSubItemFilter(qd, parentId, name) {
        qd.filters.push({
            name: name,
            operator: '=',
            value: parentId
        });
        return qd;
    }

    // Imposta ordinamento
    static setSort(qd, req) {
        if (req.sort) {
            qd.sort.push({
                field: Object.keys(req.sort)[0],
                type: req.sort[Object.keys(req.sort)[0]].toUpperCase()
            });
        }
        return qd;
    }

    // Codifica request
    static encode(qd) {
        return encodeURIComponent(btoa(JSON.stringify(qd)));
    }
    
}