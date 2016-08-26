<style>
</style>

<template>

    <!-- Error Message -->
    <div class="modal fade" id="errorMessage" tabindex="-1" role="dialog" aria-labelledby="errorLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <!-- Header -->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="errorLabel">{{dialogTitle}}</h4>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <span>{{errorMessage}}</span>
                </div>

                <!-- Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>    

export default {
    vuex: {
        actions: {
        },
        getters: {
        }
    },
    props: ['dialogTitle', 'errorMessage']
}
</script>
