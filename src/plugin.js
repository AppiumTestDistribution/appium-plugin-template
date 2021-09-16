import BasePlugin from "@appium/base-plugin";
import log from "../logger";
import {get, post} from './Api'

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
        this.body = body;
        return SOURCE_URL_RE.test(route);
    }

    async dragAndDrop(next, driver) {
        const source = await get(`http://${driver.uiautomator2.host}:${driver.uiautomator2.systemPort}/wd/hub/session/${driver.uiautomator2.jwproxy.sessionId}/element/${this.body.sourceId}/rect`);

        const destination = await get(`http://${driver.uiautomator2.host}:${driver.uiautomator2.systemPort}/wd/hub/session/${driver.uiautomator2.jwproxy.sessionId}/element/${this.body.destinationId}/rect`);

        const [ {x: sourceX, y:sourceY}, {x:destinationX, y:destinationY}] = await Promise.all([
            _getCenter(source),
            _getCenter(destination)
        ]);

        const actionsData = {
            "actions": [
                {
                    "id": "finger", "type": "pointer", "parameters": { "pointerType": "touch" },
                    "actions": [
                        { "duration": 0, "type": "pause" },
                        { "duration": 0, "x": sourceX, "y": sourceY, "type": "pointerMove", "origin": "viewport" },
                        { "button": 1, "type": "pointerDown" },
                        { "duration": 600, "type": "pause" },
                        { "duration": 600, "x": destinationX, "y": destinationY, "type": "pointerMove", "origin": "viewport" },
                        { "button": 1, "type": "pointerUp" }]
                }]
        }

        await post({
            url: `http://${driver.uiautomator2.host}:${driver.uiautomator2.systemPort}/wd/hub/session/${driver.uiautomator2.jwproxy.sessionId}/actions`,
            data: actionsData
        });

    }

    _getCenter(value) {
        return {
            x: value.x + value.width / 2,
            y: value.y + value.height/2,
        }
    }

    async findElement(next, driver) {
        console.log('Finding elements blah blah..');
        return await next();
    }

}