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
    });
    it('Basic Plugin test', async () => {
      await driver.executeScript('fake: setFakeSessionData', [{socket: 'Stairway to Heaven'}]);
      const sessionData = await driver.executeScript('fake: getFakeSessionData', []);
      console.log('Session Data', sessionData);
    });

    afterEach(async () => {
      await driver.deleteSession();
      if (server) await server.close();
    });
  });