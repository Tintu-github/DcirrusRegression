import { WaitHelper } from '../components/html/wait-helper';
import {BackgroudHelper} from '../stephelpers/backgroudHelper';
const  {Before,  Then } = require('cucumber');

Before({timeout: 60 * 1000}, function() {
    // Does some slow browser/filesystem/network actions
});

Then(/^I wait "([^"]*)" seconds$/, async (waitValue: number) => {
    if (!(await BackgroudHelper.executionReturn())) {
        waitValue = waitValue * 1000;
        await WaitHelper.sleep(waitValue);
    }
});

Then(/^I wait "([^"]*)" title loaded$/, async (titleDesc: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        await WaitHelper.waitForTitle(titleDesc);
    }
});

Then(/^I wait "([^"]*)" title loaded for "([^"]*)" seconds$/, async (titleDesc: string, waitTime: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        // tslint:disable-next-line:radix
        await WaitHelper.waitForTitle(titleDesc, parseInt(waitTime));
    }
});
    // tslint:disable-next-line:no-shadowed-variable
Then(/^I wait alert loaded$/, async () => {
        if (!(await BackgroudHelper.executionReturn())) {
            await WaitHelper.waitForAlert();
        }
    });

Then(/^I wait alert loaded for "([^"]*)" seconds$/, async (waitTime: string) => {
        if (!(await BackgroudHelper.executionReturn())) {
            // tslint:disable-next-line:radix
            await WaitHelper.waitForAlert(parseInt(waitTime));
        }
});

Then(/^I wait "([^"]*)" text loaded$/, async (textDesc: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        await WaitHelper.waitForText(textDesc);
    }
});

Then(/^I wait "([^"]*)" text loaded for "([^"]*)" seconds$/, async (textDesc: string, waitTime: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        // tslint:disable-next-line:radix
        await WaitHelper.waitForText(textDesc, parseInt(waitTime));
    }
});
