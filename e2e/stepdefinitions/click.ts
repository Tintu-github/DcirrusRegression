import { ElementFinder, element, By } from 'protractor';
import { ElementHelper } from '../stephelpers/elementHelper';
import { ElementHelperonPage } from '../components/html/element-helper';
import {BackgroudHelper} from '../stephelpers/backgroudHelper';
import {miscHelpers} from "../stephelpers/miscHelpers";
const  {Before,  When } = require('cucumber');

Before({timeout: 60 * 1000}, function() {
    // Does some slow browser/filesystem/network actions
});

When(/^I click the "([^"]*)" (button|link|icon|element|radio button)$/, async (elementName: string, action: string ) => {
    if (!(await BackgroudHelper.executionReturn())) {
        if ((action === 'button' || action === 'link' || action === 'icon' || action === 'element' || action === 'radio button')) {
            const element: ElementFinder = await ElementHelper.elementFinder(elementName);
            await ElementHelperonPage.click(element);
        }

    }
});

When(/^I click the "([^"]*)" folder button$/, async (elementName: string ) => {
    if (!(await BackgroudHelper.executionReturn())) {
        const elementFolder =  await element(By.xpath("(//*[@data-foldername='"+ elementName + miscHelpers.randomFolder +"'])[2]"));
        await ElementHelperonPage.click(elementFolder);
    }
});
