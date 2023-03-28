import BasePlugin from "@appium/base-plugin";
import log from "./logger";
export default class TemplatePlugin extends BasePlugin {
  constructor(name, cliArgs) {
    super(name, cliArgs);
  }

  static executeMethodMap = {
    "plugin: template": {
      command: "setTemplatePlugin",
      params: { required: ["socket"], optional: [] },
    },
  };

  async execute(next, driver, script, args) {
      return await this.executeMethod(next, driver, script, args )
  }
  async setTemplatePlugin(next, driver, socket) {
    log.info(`Setting template plugin ${socket}`);
    return;
  }

  async findElement(next, driver, ...args) {
    log.info("**** Before findElement of Template Plugin ****");
    const screenshot = await driver.getScreenshot();
    console.log(screenshot);
    const response = await next();
    log.info("**** AFter findElement of Template Plugin ****");
    return response;
  }
  static async updateServer(expressApp, httpServer, cliArgs) {
    expressApp.all("/cliArgs", (req, res) => {
      console.log(JSON.stringify(cliArgs));
      res.send(JSON.stringify(cliArgs));
    });
    expressApp.all("/hello", (req, res) => {
      res.send("Hello Selenium Conf!!!");
    });
  }
}
