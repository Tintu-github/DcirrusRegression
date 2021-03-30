// Because this file imports from  protractor, you'll need to have it as a
// project dependency. Please see the reference config: lib/config.ts for more
// information.
//
// Why you might want to create your config with typescript:
// Editors like Microsoft Visual Studio Code will have autocomplete and
// description hints.
//
// To run this example, first transpile it to javascript with `npm run tsc`,
// then run `protractor conf.js`.
import * as protractor from 'protractor';
import e2econfig = require('./e2e.conf.json');
import { browser } from 'protractor';

const scenario_tags = [];
scenario_tags.push('~@wip');
if (process.env.WEB_TAG) {
  scenario_tags.push(process.env.WEB_TAG);
} else {
  scenario_tags.push('@smoke');
}

if (process.env.FORM_PLATFORM_TAG) {
  scenario_tags.push(process.env.PLATFORM_TAG);
} else {
  scenario_tags.push('@desktop');
}

export let config: protractor.Config = {

  directConnect: false,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  capabilities: {
      'goog:chromeOptions': {
          w3c: false
      },
      browserName: 'chrome'
//       chromeOptions: {
//
//       args: [
//        '--headless' ,'disable-web-security=true', '--no-sandbox', '--disable-infobars'
//       ],
//       mobileEmulation: setupDeviceEmulation(),
//       prefs: {
//         'profile.default_content_setting_values.geolocation': false,
//         'profile.password_manager_enabled': false,
//         'credentials_enable_service': false,
//         'password_manager_enabled': false
// }
//     }
  },

  specs: [e2econfig.features],
  baseUrl: e2econfig.baseUrl,
  // seleniumAddress: 'http://localhost:4444/wd/hub',

  allScriptsTimeout: e2econfig.testsConfigurationVariables.allScriptsTimeout,


  useAllAngular2AppRoots: e2econfig.testsConfigurationVariables.required.isAngular2App,

  cucumberOpts: {
    require: e2econfig.cucumberRequire,
    format: 'json:reports/results.json',
    strict: true,
    tags: scenario_tags
  },

   plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options:{
            // read the options part for more options
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true
        }
    }],


  // generate test report folder
  onPrepare: function () {
    // pass custom & required config parameters

      browser.waitForAngularEnabled(false);
      browser.params.requiredConfig = (e2econfig.testsConfigurationVariables || {required:null}).required;
      browser.params.customConfig = (e2econfig.testsConfigurationVariables || {custom:null}).custom;
      browser.driver.manage().window().setSize(1680, 1050);
  },

};
