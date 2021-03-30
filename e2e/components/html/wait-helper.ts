import {PageHelper} from './page-helper';
import {browser, ElementFinder, protractor, By} from 'protractor';
// @ts-ignore


export class WaitHelper {
    public static  EC = protractor.ExpectedConditions;
    /*
     * Default timeout for promises
     * @type {number}
     */
    /**
     * Wait for an element to exist
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    public static async waitForElement(targetElement: ElementFinder,
                                timeout = PageHelper.DEFAULT_TIMEOUT,
                                message = 'Element should exist') {
        return browser.wait(WaitHelper.EC.presenceOf(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }
    public static async waitForElementToBeDisplayed(targetElement: ElementFinder,
                                             timeout = PageHelper.DEFAULT_TIMEOUT,
                                             message = 'element should displayed') {
        return browser.wait(WaitHelper.EC.visibilityOf(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }

    public static  async waitForFrameElementToBeDisplayed(targetElement: ElementFinder,
                                                  frame: ElementFinder,
                                                  timeout = PageHelper.timeout.xxs,
                                                  attempts = PageHelper.WAIT_POLL_ATTEMPTS,
                                                  message = 'element should displayed') {
        for (var i = 0; i < attempts; ++i) {
            await WaitHelper.waitForElement(frame);
            await browser.switchTo().frame(await frame.getWebElement());

            let isDisplayed = await browser.wait(WaitHelper.EC.visibilityOf(targetElement),
                timeout)
                .then(() => true, () => false);
            await browser.switchTo().defaultContent();

            if(isDisplayed) {
                return true;
            } else {
                continue;
            }
        }
        fail(`${targetElement.locator().toString()}, ${frame.locator().toString()} ${message}`);
    }
   public static  async waitForElementToBeHidden(targetElement: ElementFinder,
                                          timeout = PageHelper.DEFAULT_TIMEOUT,
                                          message = 'Element should not be visible') {
        return browser.wait(WaitHelper.EC.invisibilityOf(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }

    /**
     * Wait for an element to become clickable
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    // tslint:disable-next-line:member-ordering
    public static async waitForElementToBeClickable(targetElement: ElementFinder,
                                             timeout = PageHelper.DEFAULT_TIMEOUT,
                                             message = 'Element should not clickable') {
        return browser.wait(WaitHelper.EC.elementToBeClickable(targetElement),
            timeout,
            targetElement.locator().toString() + message);
    }

    // tslint:disable-next-line:member-ordering
    public static  async waitForFrameElementToBeClickable(targetElement: ElementFinder,
                                                  frame: ElementFinder,
                                                  timeout = PageHelper.timeout.xxs,
                                                  attempts = PageHelper.WAIT_POLL_ATTEMPTS,
                                                  message = 'element should be clickable') {
        for (var i = 0; i < attempts; ++i) {
            await WaitHelper.waitForElement(frame);
            await browser.switchTo().frame(await frame.getWebElement());

            let isClickable = await browser.wait(WaitHelper.EC.elementToBeClickable(targetElement),
                timeout)
                .then(() => true, () => false);
            await browser.switchTo().defaultContent();

            if(isClickable) {
                return true;
            } else {
                continue;
            }
        }
        fail(`${targetElement.locator().toString()}, ${frame.locator().toString()} ${message}`);
    }


    // tslint:disable-next-line:member-ordering
    public static async waitForElementToResolve(promiseCall: Function,
                                         resolver: Function,
                                         timeout = PageHelper.DEFAULT_TIMEOUT,
                                         message = '') {
        let result = false;
        return browser.wait(() => {
            promiseCall().then((value: any) => (result = resolver(value)));
            return result;
        }, timeout, message);
    }

    // tslint:disable-next-line:member-ordering
    public static async waitForElementToHaveText(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT, message = '') {
        return this.waitForElementToResolve(() => targetElement.getText(), (text: string) => text.length > 0, timeout, message);
    }

    // tslint:disable-next-line:member-ordering
    public static async waitForElementOptionallyPresent(targetElement: ElementFinder, timeout = PageHelper.DEFAULT_TIMEOUT) {
        const isDisplayed = WaitHelper.EC.presenceOf(targetElement);
        return browser.wait(isDisplayed, timeout).then(function () {
            return true;
        }, function () {
            return false;
        });
    }

    // tslint:disable-next-line:member-ordering
    public static async sleep(timeout = PageHelper.DEFAULT_TIMEOUT) {
        if (!( timeout === PageHelper.DEFAULT_TIMEOUT)) {
            timeout = timeout;
        } else {
            timeout = timeout * 1000;
        }
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < timeout);
    }

    // tslint:disable-next-line:member-ordering
    public static async waitForText(textWait: string, timeout = PageHelper.DEFAULT_TIMEOUT, attempts = PageHelper.WAIT_POLL_ATTEMPTS,) {
        let result = false;
        let webBody;
        let  htmlbodyText;
        for (let i = 0; i < attempts; ++i) {
            this.sleep(timeout);
            webBody = browser.findElement(By.tagName('body'));
            htmlbodyText = await webBody.getText();
            if (htmlbodyText.toString().includes(textWait)) {
                result = true;
                return result;
            } else {
                continue;
            }
        }
        return result;
    }

    // tslint:disable-next-line:member-ordering
    public static async waitForTitle(titletWait: string, timeout = PageHelper.DEFAULT_TIMEOUT, attempts = PageHelper.MAX_RETRY_ATTEMPTS) {
        let result = false;
        if (!( timeout === PageHelper.DEFAULT_TIMEOUT)) {
            timeout = timeout;
        } else {
            timeout = timeout * 1000;
        }
        for (let i = 0; i < attempts; ++i) {
            const isTitlePresent = await browser.wait(WaitHelper.EC.titleContains(titletWait),
                timeout)
                .then(() => true, () => false);
            if (isTitlePresent) {
                result = true;
                return result;
            } else {
                continue;
            }
        }
        console.log('I am here 4' + result);
        return result;
    }

    // tslint:disable-next-line:member-ordering
    public static async waitForAlert(timeout = PageHelper.DEFAULT_TIMEOUT, attempts = PageHelper.MAX_RETRY_ATTEMPTS) {
        let result = false;
        if (!( timeout === PageHelper.DEFAULT_TIMEOUT)) {
            timeout = timeout;
        } else {
            timeout = timeout * 1000;
        }
        for (let i = 0; i < attempts; ++i) {
            const isAlertPresent = await browser.wait(WaitHelper.EC.alertIsPresent(),
                timeout)
                .then(() => true, () => false);
            if(isAlertPresent) {
                result = true;
                return result;
            } else {
                continue;
            }
        }
        return result;
    }
}
