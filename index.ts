import * as fs from 'fs';
import * as path from 'path';

import { switchMap, map, filter, subscribeOn } from 'rxjs/operators';

import { of, combineLatest } from 'rxjs';
import { getInsightsAccounts$, getWeekRange$, getMultiWeekRanges$, getMultiWeekRangesMap$ } from './src/gannett/facebook/facebook';
import { getConfigFile$ } from './src/util';

const main = async () => {

const accounts$ = getInsightsAccounts$();
const weekRange$ = getWeekRange$(2);
const weekRanges$ = getMultiWeekRanges$(3, 10);
const multiWeekRange$ = getMultiWeekRangesMap$(3, 10);

combineLatest(accounts$, weekRange$, weekRanges$, multiWeekRange$)
    .subscribe(([accounts, weekRange,weekRanges, multiWeekRange]) => {
       console.log(multiWeekRange)
    })
}
// main();

import { FB_API } from './src/gannett'

FB_API.getAccnts$()
    .subscribe(d => {
        console.log(d)
    })