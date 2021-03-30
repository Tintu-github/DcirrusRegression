import {browser} from "protractor";

export class miscHelpers {
    public static  randomFolder = 1;

    static async setRandomFolder(maxLimit: String) {
        miscHelpers.randomFolder = Math.floor(Math.random() * Number(maxLimit));
    }

    static async setScrollPage(element: any) {
        function execScroll() {
            return browser.executeScript("arguments[0].scrollIntoView();",
                element.getWebElement())
        }
        browser.wait(execScroll, 5000);
    };
}




