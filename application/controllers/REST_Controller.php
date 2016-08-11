<?php
defined('BASEPATH') OR exit('No direct script access allowed');

define('HEADER_API_KEY', 'X-CI-APIKEY');
define('ENV_API_KEY', 'CI_APIKEY');
        
/**
 * Superclasse controller
 */
class REST_Controller extends CI_Controller {    
    
    protected $model;
    
    public function __construct() {        
        parent::__construct();     
        $this->initVars();        
        $this->authenticateCORS();
    }
    
    /**
     * Inizializzazione variabili
     * Implementare nelle sottoclassi
     */
    protected function initVars() {
    }
    
    /**
     * Caricamento dati model per chiave
     * @param int $id ID model
     */
    public function load($id) {
        // Controllo autorizzazioni
        if (!$this->checkAuth()) {
            $this->handleUnhautorized();
            die();
        }
        
        $this->preLoad($id);
        
        // Effettua caricamento da model
        $this->loadModel();
        $row = $this->fetchModelRecord($id);
        if (!$row) {
            $this->handleInternalError();
            die();
        }
        
        $this->postLoad($row);
        
        // Gestione risposta json
        $this->handleJsonResponse($row);
    }
    
    /**
     * Effettua operazioni pre-caricamento record
     * (Personalizzare nelle sottoclassi)
     * @param int $id ID del record da caricare
     */
    protected function preLoad($id) {
    }

    /**
     * Effettua operazioni post-caricamento record
     * (Personalizzare nelle sottoclassi)
     * @param array $row Record caricato
     */
    protected function postLoad($row) {        
    }
    
    /**
     * Carica dati del record dal model, in funzione della chiave passata
     * @param int $id ID record
     * @return Dati reperiti dal model in caso di esito potitivo, altrimenti false
     */
    protected function fetchModelRecord($id) {
        $modelName = $this->model;
        return $this->$modelName->load($id);
    }        

    /**
     * Effettua conteggio dei record per una query
     * @param string $filters queryData serializzato in json
     */
    public function countQuery($filters) {        
        // Controllo autorizzazioni
        if (!$this->checkAuth()) {
            $this->handleUnhautorized();
            die();
        }
        
        // Parsing dei parametri in ingresso
        $queryData = $this->parseQueryFilters($filters);
        if ($queryData == null) {
            $this->handleInternalError();
            die();
        }
        
        // Effettua caricamento da model
        $this->loadModel();
        $data = $this->countModelQuery($queryData);
        if (!$data) {
            $this->handleInternalError();
            die();
        }
                
        // Gestione risposta json
        $this->handleJsonResponse($data);
    }    
    
    /**
     * Caricamento dati
     * @param string $filters queryData serializzato in json
     */
    public function query($filters) {        
        // Controllo autorizzazioni
        if (!$this->checkAuth()) {
            $this->handleUnhautorized();
            die();
        }
        
        // Parsing dei parametri in ingresso
        $queryData = $this->parseQueryFilters($filters);
        if ($queryData == null) {
            $this->handleInternalError();
            die();
        }
        
        $this->preQuery($queryData);
        
        // Effettua caricamento da model
        $this->loadModel();
        $data = $this->fetchModelQuery($queryData);
        if ($data === false) {
            $this->handleInternalError();
            die();
        }
                
        $this->postQuery($queryData, $data);
        
        // Gestione risposta json
        $this->handleJsonResponse($data);
    }

    /**
     * Effettua operazioni pre-caricamento dati
     * (Personalizzare nelle sottoclassi)
     * @param object $queryData QueryData
     */    
    protected function preQuery($queryData) {        
    }

    /**
     * Effettua operazioni post-caricamento dati
     * (Personalizzare nelle sottoclassi)
     * @param object $queryData QueryData
     * @param array $data Dati caricati dal model
     */        
    protected function postQuery($queryData, $data) {        
    }
    
    /**
     * Carica dati dal model, in funzione del QueryData
     * @param int $queryData QueryData
     * @return Dati reperiti dal model in caso di esito potitivo, altrimenti false
     */
    protected function fetchModelQuery($queryData) {
        $modelName = $this->model;
        return $this->$modelName->query($queryData);
    }
    
    /**
     * Conta record per una specifica query
     * @param int $queryData QueryData
     * @return Conteggio dei record in caso di esito potitivo, altrimenti false
     */
    protected function countModelQuery($queryData) {
        $modelName = $this->model;
        return $this->$modelName->countQuery($queryData);
    }
    
    /**
     * Inserimento di un nuovo elemento
     */
    public function insert() {
        // Controllo autorizzazioni
        if (!$this->checkAuth()) {
            $this->handleUnhautorized();
            die();
        }
        
        // Effettua il parsing dei dati in ingresso
        $toInsert = $this->parseInputData();
        
        $this->preInsert($toInsert);
        
        // Effettua salvataggio dei dati
        $this->loadModel();
        $inserted = $this->insertModel($toInsert);
        if (!$inserted) {
            $this->handleInternalError();
            die();
        }
        
        $this->postInsert($inserted);
        
        // Gestione risposta json
        $this->handleJsonResponse($inserted);
    }

    /**
     * Effettua operazioni pre-inserimento record
     * (Personalizzare nelle sottoclassi)
     * @param array $toInsert Elemento da inserire
     */        
    protected function preInsert($toInsert) {    
    }

    /**
     * Effettua operazioni post-inserimento record
     * (Personalizzare nelle sottoclassi)
     * @param array $inserted Elemento inserito
     */        
    protected function postInsert($inserted) {        
    }
    
    /**
     * Effettua inserimento di un nuovo elemento
     * @param object $toInsert Dati da inserire
     * @return mixed Nuovo elemento inserito se esito positivo, altrimenti false
     */
    protected function insertModel($toInsert) {
        $modelName = $this->model;
        return $this->$modelName->insert($toInsert);
    }
    
    /**
     * Aggiornamento di un elemento esistente
     * @param int $id ID dell'elemento da aggiornare
     */
    public function update($id) {
        // Controllo autorizzazioni
        if (!$this->checkAuth()) {
            $this->handleUnhautorized();
            die();
        }
        
        // Effettua il parsing dei dati in ingresso
        $toUpdate = $this->parseInputData();
        
        $this->preUpdate($id, $toUpdate);
        
        // Effettua salvataggio dei dati
        $this->loadModel();
        $updated = $this->updateModel($id, $toUpdate);
        if (!$updated) {
            $this->handleInternalError();
            die();
        }
        
        $this->postUpdate($updated);
        
        // Gestione risposta json
        $this->handleJsonResponse($updated);
    }    
    
    /**
     * Effettua operazioni pre-aggiornamento record
     * (Personalizzare nelle sottoclassi)
     * @param int $id ID dell'elemento da aggornare
     * @param array $toUpdate Elemento da aggiornare
     */      
    protected function preUpdate($id, $toUpdate) {        
    }

    /**
     * Effettua operazioni post-aggiornamento record
     * (Personalizzare nelle sottoclassi)
     * @param array $updated Elemento aggiornato
     */      
    protected function postUpdate($updated) {        
    }
    
    /**
     * Effettua aggiornamento di un record esistente
     * @param object $toUpdate Dati da aggiornare
     * @return mixed Elemento aggiornato se esito positivo, altrimenti false
     */
    protected function updateModel($id, $toUpdate) {
        $modelName = $this->model;
        return $this->$modelName->update($id, $toUpdate);
    }
    
    /**
     * Effettua cancellazione di un elemento
     * @param int $id ID dell'elemento da cancellare
     */
    public function delete($id) {
        // Controllo autorizzazioni
        if (!$this->checkAuth()) {
            $this->handleUnhautorized();
            die();
        }
                
        $this->preDelete($id);
        
        // Effettua cancellazione dei dati
        $this->loadModel();
        $deleted = $this->deleteModel($id);
        if (!$deleted) {
            $this->handleInternalError();
            die();
        }
        
        $this->postDelete($deleted);
        
        // Gestione risposta json
        $this->handleJsonResponse($deleted);
    }
    
    /**
     * Effettua operazioni pre-cancellazione record
     * (Personalizzare nelle sottoclassi)
     * @param int $id ID dell'elemento da cancellare
     */      
    protected function preDelete($id) {        
    }

    /**
     * Effettua operazioni post-cancellazione record
     * (Personalizzare nelle sottoclassi)
     * @param array $deleted Elemento cancellato
     */      
    protected function postDelete($deleted) {        
    }    
    
    /**
     * Effettua canvellazione di un record esistente
     * @param int $id ID elemento da cancellare
     * @return mixed Elemento cancellato se esito positivo, altrimenti false
     */
    protected function deleteModel($id) {
        $modelName = $this->model;
        return $this->$modelName->delete($id);
    }
    
    /**
     * Effettua controllo autenticazione
     * @return boolean true se autenticato, altrimenti false
     */
    protected function checkAuth() {
        if (!array_key_exists(HEADER_API_KEY, $this->input->request_headers())) {
            return false;
        }                        
        return $this->input->request_headers()[HEADER_API_KEY] === getenv(ENV_API_KEY);
    }
    
    /**
     * Effettua il caricamento dei model necessari alla manipolazione dei dati
     */
    private function loadModel() {
        $this->load->model($this->model . '_model', $this->model, TRUE);
        $this->loadCustomModels();
    }
    
    /**
     * Effettua il caricamento di model personalizzati
     * (Personalizzare nelle sottoclassi)
     */
    protected function loadCustomModels() {        
    }
    
    private function parseQueryFilters($filters) {
        return json_decode(base64_decode(urldecode($filters)));
    }

    private function parseInputData() {
        return json_decode(file_get_contents("php://input"));
    }

    private function handleJsonResponse($data) {
        $this->output->set_content_type('application/json')
                     ->set_status_header('200')
                     ->set_output(json_encode($data));
    }
    
    private function handleUnhautorized() {
        $this->setStatusHeader('401');
    }
    
    private function handleInternalError() {
        $this->setStatusHeader('500');
    }
    
    private function setStatusHeader($status) {
        $this->output->set_status_header($status);
    }
        
    private function authenticateCORS() {        
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }
    }
    
}