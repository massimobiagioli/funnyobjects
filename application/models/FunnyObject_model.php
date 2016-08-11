<?php
require_once APPPATH . 'models/REST_Model.php';

class FunnyObject_model extends REST_Model {
    
    protected function initVars() {
        $this->tableName = 'funny_objects';
        $this->pk = 'fob_id';
    }
        
}
