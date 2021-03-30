import { Then, Before } from 'cucumber';
import { browser, protractor } from 'protractor';
import {BackgroudHelper} from '../stephelpers/backgroudHelper';

Before({timeout: 60 * 1000}, function() {
    // Does some slow browser/filesystem/network actions
});

Then(/^I press the enter key$/, async () => {
    if (!(await BackgroudHelper.executionReturn())) {
        await browser.actions().sendKeys(protractor.Key.RETURN).perform();
    }
});

Then(/^I press the tab key$/, async () => {
    if (!(await BackgroudHelper.executionReturn())) {
        await browser.actions().sendKeys(protractor.Key.TAB).perform();
    }

});
