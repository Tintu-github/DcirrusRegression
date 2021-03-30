import { browser } from 'protractor';
import { PageHelper } from '../stephelpers/pageHelper';
import {BackgroudHelper} from '../stephelpers/backgroudHelper';
const  { Before, Given, When } = require('cucumber');

Before({timeout: 60 * 1000}, function() {
    // Does some slow browser/filesystem/network actions
});

Given(/^I navigate to the "([^"]*)" page$/, async (pageName: string) => {
    if (!(await BackgroudHelper.executionReturn())) {
        await PageHelper.pageSet(pageName);
    }

});

When(/^I refresh the page$/, async () => {
    if (!(await BackgroudHelper.executionReturn())) {
        const currentUrl = await browser.getCurrentUrl();
        await PageHelper.navigateToUrl(currentUrl);
    }
});

When(/^I navigate to the URL "([^"]*)"$/, async (pageUrl: string) => {
    console.log("I am here1")
    if (!(await BackgroudHelper.executionReturn())) {
        console.log("I am here2")
        await PageHelper.navigateToUrl(pageUrl);
        console.log("I am here3");
    }
    });
