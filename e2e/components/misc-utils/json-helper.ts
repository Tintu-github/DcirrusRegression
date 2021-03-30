import * as fs from 'fs';
import * as path from 'path';

export class JsonHelper {
    static filepath_Success: string ;
   // @ts-ignore
    static  getAllFiles(fileName: string, dirPath: string): string {
        // @ts-ignore
        fs.readdirSync(dirPath).forEach( function(file: string): string  {
            console.log('I am coming here');
            const filepath = path.join(dirPath , file);
            const stat =  fs.lstatSync(filepath);
            console.log( stat.isDirectory());
            if ( stat.isDirectory()) {
                console.log(filepath + '\n');
                JsonHelper.getAllFiles(fileName, filepath);
            } else {
                console.log(file + '\n');
                if ((file.localeCompare(fileName)) === 0 ) {
                    JsonHelper.filepath_Success = path.join(dirPath, file);
                    console.log('comparision successful' + JsonHelper.filepath_Success);
                }
            }
        });
        return JsonHelper.filepath_Success;
    }

   static getElement(fileName: string, elementStr: string): string {
        const jsonData = require(fileName);
        return jsonData[elementStr];
    }

    static  getPage(fileName: string, pageStr: string): string {
        const jsonData = require(fileName);
        return jsonData[pageStr];
    }
}
