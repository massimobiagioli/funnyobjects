<?php
require_once APPPATH . 'models/REST_Model.php';

class Settings_model extends REST_Model {
    
    protected function initVars() {
        $this->tableName = 'settings';
        $this->pk = 'set_id';
    }
        
}
