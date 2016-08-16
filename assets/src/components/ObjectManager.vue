<style>
    .starter-template {
        padding: 40px 15px;
        text-align: center;
    }
</style>

<template>
    <div class="starter-template">
        
        <div class="page-header">
            <h1>Gestione Oggetti</h1>
        </div>

        <table id="main-grid" class="table table-condensed table-hover table-striped" data-ajax="true" data-toggle="bootgrid">
            <thead>
                <tr>
                    <th data-column-id="fob_id" data-type="numeric" data-identifier="true">ID</th>
                    <th data-column-id="fob_des">Descrizione</th>
                    <th data-column-id="fob_created" data-formatter="fob_created_formatter" data-order="desc">Creato il</th>
                    <th data-column-id="fob_disabled" data-formatter="fob_disabled_formatter">Disabilitato</th>
                    <th data-column-id="actions" data-formatter="actions_formatter" data-sortable="false">Azioni</th>
                </tr>
            </thead>
        </table>

    </div>
</template>

<script>    
import gridHelper from '../gridHelper'

export default {
    ready() {
        this.initGrid()
    },
    methods: {
        initGrid: () => {
            let originalRequest = {};
            let grid = $("#main-grid").bootgrid({
                ajaxSettings: gridHelper.config.ajaxSettings,
                requestHandler: (request) => {
                    originalRequest = request;
                    return {};
                },
                url: () => {
                    return gridHelper.search.getDefaultSearchUrl('/funnyobjs/index.php/api/funnyobject/', originalRequest, 'fob_des');
                },
                labels: gridHelper.config.labels,
                formatters: {
                    'fob_created_formatter': (column, row) => {
                        return gridHelper.formatters.formatDate(row.fob_created);
                    },
                    'fob_disabled_formatter': (column, row) => {
                        return gridHelper.formatters.formatCheckbox(row.fob_disabled);
                    },
                    'actions_formatter': (column, row) => {
                        return gridHelper.formatters.formatActions(row.fob_id);
                    }
                }
            })
            .on("loaded.rs.jquery.bootgrid", () => {
                grid.find(".command-edit").on("click", (e) => {
                    let rowId = grid.find(".command-edit").data("row-id");
                    alert("You pressed edit on row: " + rowId);
                }).end().find(".command-delete").on("click", (e) => {
                    let rowId = grid.find(".command-edit").data("row-id");
                    alert("You pressed delete on row: " + rowId);
                });
            });
        }
    },
    vuex: {
        actions: {
        },
        getters: {
        }
    }
}
</script>
