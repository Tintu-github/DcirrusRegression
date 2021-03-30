const browserList = require('./browser-list.js');
const testrail = require("testrail-api");
const setupUtilities = require('./setup-utilities');

const browserStackBrowser = browserList[setupUtilities.getParam("chrome", "--params.browserstack.browser", false)];
const configSetup = {
    restartBrowserBetweenTests: false,
    multiCapabilities: [{
        browserName: 'chrome',
        shardTestFiles: 'true',
        maxInstances: 5
    }],
    allScriptsTimeout: 300000,
    suites: {
        smoke_tests: './e2e/test-suites/smoke-test-suite/**/*.e2e-spec.ts'
    },
    capabilities: {
        "browserName": "chrome",
        'chromeOptions': {
            args: ['--no-sandbox', '--test-type=browser'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': 'Downloads'
                }
            }
        }
    },
    bsCapabilities: {
        'browserName': browserStackBrowser.browserName,
        'browser_version': browserStackBrowser.browser_version,
        'os': browserStackBrowser.os,
        'os_version': browserStackBrowser.os_version,
        'resolution': browserStackBrowser.resolution,
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || setupUtilities.getParam("", "--params.browserstack.user", false),
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || setupUtilities.getParam("", "--params.browserstack.key", false),
        'browserstack.local': process.env.BROWSERSTACK_LOCAL || setupUtilities.getParam(true, "--params.browserstack.local", false),
        'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER || setupUtilities.getParam("LocalIdentifier", "--params.browserstack.localIdentifier", false),
        'build': process.env.BROWSERSTACK_BUILD || setupUtilities.getParam('Local Build - ' + new Date().toISOString(), "--params.browserstack.build", false),
        'browserstack.debug': 'true',
        'acceptSslCerts': 'true',
        'trustAllSSLCertificates': 'true',
        'browserstack.timezone': 'UTC',
        'browserstack.safari.allowAllCookies': 'true'
    },
    params: {
        login: {
            admin: {
                user: "admin",
                password: "exinda"
            }
        },
        testrail: {
            postResult: process.env.TESTRAIL_POST_RESULT || setupUtilities.toBoolean(setupUtilities.getParam(true, "--params.testrail.postResult", false)),
            projectId: process.env.TESTRAIL_PROJECT_ID || setupUtilities.getParam(361, "--params.testrail.projectId", false),
            milestoneName: process.env.TESTRAIL_MILESTONE_NAME || setupUtilities.getParam("Default milestone", "--params.testrail.projectId", false),
            versionName: process.env.VERSION || setupUtilities.getParam("Default version name", "--params.testrail.versionName", false),
            host: process.env.TESTRAIL_HOST || setupUtilities.getParam("https://testrail.devfactory.com/", '--params.testrail.host', false),
            user: process.env.TESTRAIL_USER || setupUtilities.getParam('testrail.automation', "--params.testrail.user", false),
            password: process.env.TESTRAIL_PASSWORD || setupUtilities.getParam('Ac7k4BLp85', '--params.testrail.password', false),
            isUniqueMilestone: process.env.TESTRAIL_IS_UNIQUE_MILESTONE || setupUtilities.toBoolean(setupUtilities.getParam(true, "--params.testrail.isUniqueMilestone", false)),
            createRunFromSuite: process.env.TESTRAIL_CREATE_RUN_FROM_SUITE || setupUtilities.toBoolean(setupUtilities.getParam(true, "--params.testrail.createRunFromSuite", false))
        },
        version: process.env.VERSION || setupUtilities.getParam('7.4.0', "--params.testrail.versionName", false),
        selenium: {
            hub: process.env.SELENIUM_URL || setupUtilities.getParam('http://10.69.7.171:4444/wd/hub', "--params.selenium.hub", false)
        },
        browserstack: {
            user: '', //Don't specify anything here it's just for a reference purpose that it can be a param
            key: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            local: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            localIdentifier: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            build: '',//Don't specify anything here it's just for a reference purpose that it can be a param
        },

    },
    baseUrl: 'http://www.google.com',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () {
        }
    }
};
module.exports = configSetup;