<?php
require_once APPPATH . 'controllers/REST_Controller.php';

class Settings extends REST_Controller {
    
    protected function initVars() {
        $this->model = 'settings';
    }        

}
