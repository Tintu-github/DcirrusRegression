import {by, element, browser, ElementFinder} from 'protractor';
import {BackgroudHelper} from '../stephelpers/backgroudHelper';
import {miscHelpers} from "../stephelpers/miscHelpers";
import {WaitHelper} from "../components/html/wait-helper";
import {ElementHelperonPage} from "../components/html/element-helper";
import {ElementHelper} from "../stephelpers/elementHelper";
const  {Before, Then} = require('cucumber');
let {setDefaultTimeout} = require('cucumber');
var expect = require('chai').expect
setDefaultTimeout(100 * 1000);

Before({timeout: 100 * 1000}, function() {
    // Does some slow browser/filesystem/network actions
});

Then(/^I get into window that will check "([^"]*)" with admin rights has permissions for "([^"]*)"$/, async (userName: string, inputFolder: string) =>{
     if (!(await BackgroudHelper.executionReturn())) {
                 let elementFresh = await element(by.xpath("//a[@title = 'Refresh']/i"));
                 await ElementHelperonPage.click(elementFresh);
                 await WaitHelper.sleep(1000);
                const newWindowFolder = await element(by.xpath("//li[contains(text(),'" + inputFolder + miscHelpers.randomFolder + "')]"));
                // await miscHelpers.setScrollPage(newWindowFolder)
                await ElementHelperonPage.click(newWindowFolder);
                console.log(inputFolder + miscHelpers.randomFolder);
                await WaitHelper.sleep(3000);
                elementFresh = await element(by.xpath("//a[@title = 'Refresh']/i"));
                await ElementHelperonPage.click(elementFresh);
                await WaitHelper.sleep(1000);
                const elementUserName = await element(by.xpath("//input[@title='" + userName + "']"));
                let selected = await elementUserName.isSelected();
                expect(await selected).to.equal(true);
                for (let j = 3; j <= 10; j++) {
                    selected = element(by.xpath("//input[@title='" + userName + "']//..//..//..//td['" + j + "']//div//input")).isSelected();
                    expect(await selected).to.equal(true);
                }
                await ElementHelperonPage.click(elementFresh);
                }
            });

// Then(/^I created the "([^"]*)" with "([^"]*)"$/, async (folder: string, maxLimit: string) =>{
//     if (!(await BackgroudHelper.executionReturn())) {
//
//         const folderDest = folder + miscHelpers.setRandomFolder(maxLimit);
//         const TestInput = "./e2e/page-objects/TestCasesData/TestInput/";
//         const folderD = "./e2e/page-objects/TestCasesData/" + folderDest;
//         miscHelpers.copyFolder(TestInput, folderD);
//     }
// });


Then(/^I uploaded the existing folder "([^"]*)" with element "([^"]*)"$/, async (folder: string, elementName: string) =>{
    if (!(await BackgroudHelper.executionReturn())) {
        browser.switchTo().frame(1);
        const elementFolderFrame: ElementFinder = await ElementHelper.elementFinder(elementName);
        elementFolderFrame.sendKeys("./e2e/page-objects/TestCasesData/" + folder + miscHelpers.randomFolder);
        browser.switchTo().frame(0);

    }
});
