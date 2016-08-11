<?php
require_once APPPATH . 'controllers/REST_Controller.php';

class FunnyObject extends REST_Controller {
    
    protected function initVars() {
        $this->model = 'funnyobject';
    }        

}
