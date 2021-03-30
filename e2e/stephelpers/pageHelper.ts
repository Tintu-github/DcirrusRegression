import {browser} from 'protractor';
import * as path from 'path';
import {JsonHelper} from '../components/misc-utils/json-helper';

export class PageHelper {
    static pageName: string ;

    static async pageSet(pageName: string ) {
        this.pageName = pageName;
    }

    static async navigateToUrl(pageName: string ) {
        this.pageName = pageName;
        const pagePath = path.resolve( 'e2e/page-objects/pages.json');
        pageName = JsonHelper.getPage(pagePath, pageName);
        console.log(pageName);
        await browser.get(pageName);

    }

}
