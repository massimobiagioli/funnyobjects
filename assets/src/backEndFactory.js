import backEnd from './backEnd'
import serverSettings from './config/serverSettings.json'

// Factory per oggetto backEnd
export default class {

    // Crea oggetto backEnd
    static create() {
        return new backEnd(serverSettings.baseUrl, serverSettings.headers);
    }

}