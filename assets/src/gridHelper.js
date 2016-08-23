import backEnd from './backEnd'
import dateUtils from './dateUtils'

let gridHelper = {
    config: {
        ajaxSettings: {
            method: 'GET',
            cache: false,
            headers: backEnd.headers
        },
        labels: {
            all: 'Tutti',
            infos: 'Visualizzazione da {{ctx.start}} a {{ctx.end}} (totale elementi: {{ctx.total}})',
            loading: 'Caricamento',
            noResults: 'Nessun risultato',
            refresh: 'Ricarica',
            search: 'Ricerca'
        }
    },
    formatters: {
        formatDate: (toFormat) => dateUtils.formatDate(toFormat),
        formatCheckbox: (value) => {
            return '<input type="checkbox" disabled' + (value === '1' ? ' checked' : '') + '>';
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
                offset: req.rowCount * (req.current > 0 ? req.current - 1 : 0),  
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
    },
    detail: {
        open: (detailName) => {
            $('#' + detailName).modal('show');
        },
        openDetail: () => {
            gridHelper.detail.open('detail');
        },
        openConfirmDelete: () => {
            gridHelper.detail.open('confirmDelete');
        },
        openNotifyMessage: () => {
            gridHelper.detail.open('notifyMessage');
        },
        openErrorMessage: () => {
            gridHelper.detail.open('errorMessage');
        },
        close: (detailName) => {
            $('#' + detailName).modal('hide');
        },
        closeDetail: () => {
            gridHelper.detail.close('detail');
        },
        closeConfirmDelete: () => {
            gridHelper.detail.close('confirmDelete');
        },
        closeNotifyMessage: () => {
            gridHelper.detail.close('notifyMessage');
        },
        closeErrorMessage: () => {
            gridHelper.detail.close('errorMessage');
        },
    },
    actions: {
        reload: (gridName = 'main-grid') => {
            $("#main-grid").bootgrid('reload');
        }
    }
};

export default gridHelper