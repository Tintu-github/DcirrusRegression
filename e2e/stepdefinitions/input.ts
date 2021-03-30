import { ElementFinder } from 'protractor';
import { ElementHelper } from '../stephelpers/elementHelper';
import { DataHelper } from '../stephelpers/dataHelper';
import { TextboxHelper } from '../components/html/textbox-helper';
import {BackgroudHelper} from '../stephelpers/backgroudHelper';
import {miscHelpers} from "../stephelpers/miscHelpers";
const  {Before,  When } = require('cucumber');

Before({timeout: 60 * 1000}, function() {
    // Does some slow browser/filesystem/network actions
});

When(/^I fill in the "([^"]*)" input with "([^"]*)"$/, async (elementName: string, inputValue: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        if(inputValue === "captcha"){
        } else {
            const element: ElementFinder = await ElementHelper.elementFinder(elementName);
            await TextboxHelper.sendKeys(element, inputValue);
        }
    }
});

// tslint:disable-next-line:max-line-length
When(/^I fill in the "([^"]*)" input with "([^"]*)" and key value "([^"]*)"$/, async (elementName: string, jsonInputFile: string,  inputValue: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        const element: ElementFinder = await ElementHelper.elementFinder(elementName);
        inputValue = await DataHelper.dataFinder(jsonInputFile, inputValue);
        await TextboxHelper.sendKeys(element, inputValue);
    }

});

// tslint:disable-next-line:max-line-length
When(/^I fill in the "([^"]*)" input with "([^"]*)" and max limit "([^"]*)"$/, async (elementName: string, inputFileFolder: string,  maxLimit: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        const element: ElementFinder = await ElementHelper.elementFinder(elementName);
        miscHelpers.setRandomFolder(maxLimit);
        const  random = miscHelpers.randomFolder;
        await TextboxHelper.sendKeys(element, inputFileFolder + random);
        console.log(inputFileFolder+miscHelpers.randomFolder);
    }

});

