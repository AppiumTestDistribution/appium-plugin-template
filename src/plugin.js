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

  static newMethodMap = /** @type {const} */ ({
    "/session/:sessionId/fake_data": {
      GET: { command: "getFakeSessionData", neverProxy: true },
      POST: {
        command: "setFakeSessionData",
        payloadParams: { required: ["data"] },
        neverProxy: true,
      },
    },
    "/session/:sessionId/fakepluginargs": {
      GET: { command: "getFakePluginArgs", neverProxy: true },
    },
  });

  async setFakeSessionData(next, driver, ...args) {
    await B.delay(1);
    driver.fakeSessionData = args[0];
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
