import { PageHelper } from './pageHelper';
import { JsonHelper} from '../components/misc-utils/json-helper';
import { by, element} from 'protractor';
import * as path from "path";

export class ElementHelper {

    static async elementFinder(elementStr: string) {
        let currentPage = PageHelper.pageName;
        currentPage = currentPage + '.json';
        currentPage = currentPage.split(' ').join('_')
        const dirPath = path.resolve( 'e2e/page-objects');
        const elementFile = await JsonHelper.getAllFiles(currentPage, dirPath);
        console.log(elementFile);
        const elementFound = JsonHelper.getElement(elementFile, elementStr);
        console.log(elementFound[0]);
        console.log(elementFound[1])
        if (elementFound[0] === 'xpath') {
           const  elementFinder = element(by.xpath(elementFound[1]));
           return elementFinder;
        }
        if (elementFound[0] === 'linkText') {
            const  elementFinder = element(by.linkText(elementFound[1]));
            return elementFinder;
        }
        if (elementFound[0] === 'id') {
            const  elementFinder = element(by.id(elementFound[1]));
            return elementFinder;
        }
    }
}
