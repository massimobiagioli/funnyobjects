<?php
require_once APPPATH . 'controllers/REST_Controller.php';

class FunnyObjectIO extends REST_Controller {
    
    protected function initVars() {
        $this->model = 'funnyobjectio';
    }        

}
