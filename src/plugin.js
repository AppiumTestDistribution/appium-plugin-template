import BasePlugin from '@appium/base-plugin';

export default class TemplatePlugin extends BasePlugin {
  constructor(name, cliArgs) {
    super(name, cliArgs);
  }

  static async updateServer(expressApp, httpServer, cliArgs) {
    expressApp.all('/cliArgs', (req, res) => {
      console.log(JSON.stringify(cliArgs))
      res.send(JSON.stringify(cliArgs));
    });
  }
}
