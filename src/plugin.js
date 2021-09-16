import BasePlugin from "@appium/base-plugin";
import log from "../logger";

const SOURCE_URL_RE = new RegExp('/session/[^/]+/plugin/actions/');


export default class GesturesPlugin extends BasePlugin {
    constructor(pluginName) {
        super(pluginName);
    }

    static newMethodMap = {
        '/session/:sessionId/plugin/actions/dragAndDrop': {
            POST: {command: 'dragAndDrop', payloadParams: {required: ['sourceId', 'destinationId']}}
        },
    }

    shouldAvoidProxy(method, route, body) {
        return SOURCE_URL_RE.test(route);
    }

    async dragAndDrop(next, driver) {
      log.info('Drag and Drop is handled by the new plugin...');
    }

    async findElement(next, driver) {
        console.log('Finding elements blah blah..');
        await next();
    }

}