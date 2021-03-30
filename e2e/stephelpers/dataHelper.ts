import * as path from 'path';
import {JsonHelper} from '../components/misc-utils/json-helper';

export class DataHelper {

    static async dataFinder(dataFile: string, dataStr: string) {
        dataFile = dataFile + '.json';
        const dirPath = path.resolve( 'e2e/page-objects');
        dataFile = await JsonHelper.getAllFiles(dataFile, dirPath);
        console.log(dataFile);
        const dataFound = JsonHelper.getElement(dataFile, dataStr);
        console.log(dataFound);
        return dataFound;
    }
}
