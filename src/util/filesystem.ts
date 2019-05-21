import * as path from 'path';
import * as fs from 'fs';

import { of, Observable } from 'rxjs';

export function mkPath$(...pathParts: string[]): Observable<string> {
    return of(path.join(process.cwd(), ...pathParts ));
}

// export function getFile$(filePath): Observable<fs.PathLike> {
//     return of();
// }