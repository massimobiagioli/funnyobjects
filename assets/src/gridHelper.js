let gridHelper = {
    config: {
        ajaxSettings: {
            method: 'GET',
            cache: false,
            headers: {
                'X-CI-APIKEY': 'HelloWorld123!'
            }
        },
        labels: {
            all: 'Tutti',
            infos: 'Visualizzazione {{ctx.start}} di {{ctx.end}} (totale elementi: {{ctx.total}})',
            loading: 'Caricamento',
            noResults: 'Nessun risultato',
            refresh: 'Ricarica',
            search: 'Ricerca'
        }
    },
    formatters: {
        formatDate: (toFormat) => {
            let dateFormat = require('dateformat');
            return dateFormat(new Date(toFormat), "dd-mm-yyyy h:MM:ss");
        },
        formatCheckbox: (value) => {
            return '<input type="checkbox" disabled' + (value === 0 ? ' checked' : '') + '>';
        },
        formatActions: (rowId) => {
            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + rowId + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                   "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + rowId + "\"><span class=\"fa fa-trash-o\"></span></button>";
        }
    },
    queryData: {
        init: (req) => {
            return {
                limit: req.rowCount,
                offset: parseInt(req.current / req.rowCount) || 0,
                filters: [],
                sort: []
            };
        },
        setSearchPhraseFilter: (qd, req, name) => {
            if (req.searchPhrase) {
                qd.filters.push({
                    name: name,
                    operator: 'LIKE',
                    value: '%' + req.searchPhrase + '%' 
                });
            }
            return qd;
        },
        setSort: (qd, req) => {
            if (req.sort) {
                qd.sort.push({
                    field: Object.keys(req.sort)[0],
                    type: req.sort[Object.keys(req.sort)[0]].toUpperCase()
                });
            }
            return qd;
        },
        encode: (qd) => {
            return encodeURIComponent(btoa(JSON.stringify(qd)));
        }
    },
    search: {
        getDefaultSearchUrl: (path, req, searchFieldName) => {    
            let queryData = gridHelper.queryData.init(req);
            queryData = gridHelper.queryData.setSearchPhraseFilter(queryData, req, searchFieldName);
            queryData = gridHelper.queryData.setSort(queryData, req);
            return path + gridHelper.queryData.encode(queryData);
        }
    }
};

export default gridHelper