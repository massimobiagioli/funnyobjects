<?php
require_once APPPATH . 'models/REST_Model.php';

class FunnyObjectIO_model extends REST_Model {
    
    protected function initVars() {
        $this->tableName = 'funny_objects_io';
        $this->pk = 'fio_id';
    }
        
}
