import { remote } from 'webdriverio';
import { command } from 'webdriver';
import path from 'path';

const APPIUM_HOST = '127.0.0.1';
const THIS_PLUGIN_DIR = path.join(__dirname, '..', '..');
const APPIUM_HOME = path.join(THIS_PLUGIN_DIR, 'local_appium_home');
const TEST_FAKE_APP = path.join(
  APPIUM_HOME,
  'node_modules',
  '@appium',
  'fake-driver',
  'test',
  'fixtures',
  'app.xml'
);
let server;
const WDIO_PARAMS = {
  connectionRetryCount: 0,
  hostname: APPIUM_HOST,
  port: 4723,
  path: '/wd/hub',
};
const capabilities = {
  platformName: 'Fake',
  'appium:automationName': 'Fake',
  'appium:app': TEST_FAKE_APP,
};
  describe('with CLI args', () => {
    let driver;
    beforeEach(async () => {
      driver = await remote({ ...WDIO_PARAMS, capabilities });
      driver.addCommand(
        'setFakeSessionData',
        command('POST', '/session/:sessionId/fake_data', {
          command: 'setFakeSessionData',
          parameters: [
            {
              name: 'data',
              type: 'object',
              description: 'a valid parameter',
              required: true,
            },
          ],
        })
      );

      driver.addCommand(
        'getFakeSessionData',
        command('GET', '/session/:sessionId/fake_data', {
          command: 'getFakeSessionData',
          parameters: [],
          returns: {
            type: 'object',
            name: 'activity',
            description: 'Name of the current activity',
          },
        })
      );
    });

    it('Basic Plugin test', async () => {
      const res = { fake: 'fakeResponse' };
      await driver.setFakeSessionData(res);
      console.log(await driver.getFakeSessionData());
    });

    afterEach(async () => {
      await driver.deleteSession();
      if (server) await server.close();
    });
  });