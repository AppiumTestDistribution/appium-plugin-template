import BasePlugin from "@appium/base-plugin";
import B from 'bluebird';

export default class TemplatePlugin extends BasePlugin {
  constructor(name, cliArgs) {
    super(name, cliArgs);
  }

  static async updateServer(expressApp, httpServer, cliArgs) {
    expressApp.all("/cliArgs", (req, res) => {
      res.send(JSON.stringify(cliArgs));
    });
  }

  static executeMethodMap = /** @type {const} */ ({
    // this execute method overrides fake-drivers fake: getThing, for testing
    'fake: getFakeSessionData': {
      command: 'getFakeSessionData',
    },

    // this is a totally new execute method
    'fake: setFakeSessionData': {
      command: 'setFakeSessionData',
      params: {required: ['socket'], optional: []},
    },
  });

  async execute(next, driver, script, args) {
    return await this.executeMethod(next, driver, script, args);
  }

  async setFakeSessionData(next, driver, socket) {
    await B.delay(1);
    console.log('Args', `Plugged in to ${socket}`);
    driver.fakeSessionData = socket;
    return driver.fakeSessionData;
  }

  async getFakeSessionData(next, driver) {
    await B.delay(1);
    return driver.fakeSessionData || null;
  }

  async getFakePluginArgs() {
    await B.delay(1);
    return this.cliArgs;
  }
}
