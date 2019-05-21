import * as fs from 'fs';
import * as path from 'path';

import { bindCallback, of, Observable, Observer, fromEventPattern } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { configPath } from '../gannett/config/app.config';

import { mkPath$ } from './filesystem';



export const open$ = bindCallback(fs.open);

export const mkdir$ = bindCallback(fs.mkdir);

export const openFile$ = bindCallback(fs.open);

export const readFile$ = bindCallback(fs.readFile);

export const access$ = bindCallback(fs.access);

export const stat$ = bindCallback(fs.stat);


export function createFileSafe$(file: fs.PathLike): Observable<boolean> {
    return openFile$(file, 'ax')
        .pipe(switchMap( (res: any) => {
            if (res instanceof Error) {
                return of(false)
            } 
            return of(true);
        }));
}

export function exists$(path: fs.PathLike): Observable<boolean> {
    return stat$(path)
        .pipe(map(result => {
            if (result instanceof Error) {
                return false
            }
            return true
        }));
}

export function getConfigFile$(fileName: string): Observable<any> {
    const filePath = path.join(process.cwd(), configPath, fileName)
    const file = require(filePath);
    return of(file);
}

export function getConfig$ (fileName: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        const filePath = path.join(process.cwd(), configPath, fileName);
        const file = require(filePath);
        observer.next(file)
    })
}
export function getFile$(...pathParts: string[]): Observable<any> {
    const fileName = path.join(process.cwd(), ...pathParts);
    const file = require(fileName);
    return of(file);
}

// export function createDir(...pathParts: string[]): Observable<boolean> {
//     return mkPath$(...pathParts)
//         .pipe(switchMap(createdPath => mkdir$(createdPath)))
// }
/** 
 * fromEventPattern(addEventHandler, remvoeEventHandler); 
 * 
 * function addEventHandler(handler) {
 *  document.addEventListener('click', handler);
 * }
 * function removeEventHandler(handler) {
 *  document.removeEventListener(handler);
 * }
 * */


