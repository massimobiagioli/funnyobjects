<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Superclasse Model
 */
class REST_Model extends CI_Model {        
    
    protected $tableName; 
    protected $pk;
    
    public function __construct() {
        parent::__construct();
        $this->initVars();
    }
    
    /**
     * Inizializzazione variabili
     * Implementare nelle sottoclassi
     */
    protected function initVars() {        
    }
    
    /**
     * Caricamento record per chiave
     * @param int $id ID tabella
     * @return mixed Record identificato dalla chiave se trovato, altrimenti false
     */
    public function load($id) {
        try {       
            $query = $this->db->get_where($this->tableName, array($this->pk => $id));                
            return $this->transformResultRow($query->row());
        } catch (Exception $ex) {            
            log_message('error', $ex->getMessage());
            return false;
        }
    }    
        
    /**
     * Caricamento dati in funzione dei criteri di ricerca/ordinamento in ingresso
     * @param object $queryData Oggetto QueryData
     * @return mixed Dati che soddisfano i criteri di ricerca, altrimenti false
     */
    public function query($queryData) {
        try {            
            $this->db->select('*')
                      ->from($this->tableName)
                      ->where($this->getQueryFilters($queryData->filters));
            
            foreach ($queryData->sort as $sort) {
                $this->db->order_by($sort->field, $sort->type);
            }
            
            $this->db->limit($queryData->limit)
                      ->offset($queryData->offset);   
            
            $query = $this->db->get();  
            
            return $this->transformResultList($query->result());
        } catch (Exception $ex) {
            log_message('error', $ex->getMessage());
            return false;
        }
    }            

    /**
     * Conteggio record in funzione dei criteri di ricerca/ordinamento in ingresso
     * @param object $queryData Oggetto QueryData
     * @return mixed Numero record in caso di esito positivo, altrimenti false
     */
    public function countQuery($queryData) {
        try {            
            $this->db->select("count($this->pk) as RC")
                      ->from($this->tableName)
                      ->where($this->getQueryFilters($queryData->filters));
                                    
            $query = $this->db->get();  
            
            return $query->row();
        } catch (Exception $ex) {
            log_message('error', $ex->getMessage());
            return false;
        }
    }            
    
    /**
     * Inserimento di un record sul database
     * @param object $data Dati da inserire
     * @return mixed Record inserito se esito positivo, altrimenti false
     */
    public function insert($data) {
        try {
            $this->db->insert($this->tableName, $data);
            $id = $this->db->insert_id();
            return $this->transformResultRow($this->load($id));
        } catch (Exception $ex) {
            log_message('error', $ex->getMessage());
            return false;
        }
    }

    /**
     * Aggiornamento di un record sul database
     * @param object $id ID del record da aggiornare
     * @param object $data Dati da aggiornare
     * @return mixed Record aggiornato se esito positivo, altrimenti false
     */
    public function update($id, $data) {
        try {
            $this->db->where($this->pk, $id);
            $this->db->update($this->tableName, $data);                                    
            return $this->transformResultRow($this->load($id));            
        } catch (Exception $ex) {
            log_message('error', $ex->getMessage());
            return false;
        }
    }

    /**
     * Cancellazione di un record sul database
     * @param object $id ID del record da cancellare
     * @return mixed Record eliminato se esito positivo, altrimenti false
     */
    public function delete($id) {
        try {
            $row = $this->load($id);
            $this->db->delete($this->tableName, array($this->pk => $id)); 
            return $this->transformResultRow($row);
        } catch (Exception $ex) {
            log_message('error', $ex->getMessage());
            return false;
        }
    }
    
    private function getQueryFilters($inputFilters) {
        $queryFilters = array();
        
        foreach ($inputFilters as $inputFilter) {
            $k = $inputFilter->name . ($inputFilter->operator ? (' ' . $inputFilter->operator) : '');
            $queryFilters[$k] = $inputFilter->value;
        }
        
        return $queryFilters;
    }
    
    /**
     * Trasforma record risultato
     * @param array $row Record da trasformare     
     * @return array Record trasformato
     */
    protected function transformResultRow($row) {
        return $row;
    }
    
    /**
     * Trasforma lista risultati
     * @param array $results Risultati da trasformare
     * @return array Risultati dopo la trasformazione
     */    
    private function transformResultList($results) {
        return array_map(array($this, 'transformResultRow'), $results);
    }
    
    public function getTableName() {
        return $this->tableName;
    }

    public function getPk() {
        return $this->pk;
    }

    public function setTableName($tableName) {
        $this->tableName = $tableName;
    }

    public function setPk($pk) {
        $this->pk = $pk;
    }
    
}
