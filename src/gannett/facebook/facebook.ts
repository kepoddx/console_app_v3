import { getConfigFile$, getConfig$ } from '../../util';
import { filter, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { WeekRange, AdAccount } from '../config/app.config';
const config = require('../config/app.config');

export function getInsightsAccounts$ (): Observable<AdAccount[]> {
    return getConfig$('fb_ad_accounts.json')
        .pipe(map(accounts => accounts.filter((account: any) => account.insights_include === true)))
}

export function getInsightsExcludedAccounts$ (): Observable<AdAccount[]> {
    return getConfig$('fb_ad_accounts.json')
        .pipe(map(accounts => accounts.filter((account: any) => account.insights_include != true)))
}

export function getWeekRange$(wk): Observable<string> {
    return getConfig$('Gannett_Weeks_DataMap.json')
        .pipe(map(weeks => {
            const wkMap = new Map(Object.entries(weeks));
            const weekRange = wkMap.get(wk.toString()) as WeekRange;
            return `'since':'${weekRange.startOfWeek}','until':'${weekRange.endOfWeek}'`;
        }))
}

export function getMultiWeekRanges$(fromWk, toWk): Observable<string> {
    return getConfig$('Gannett-Calendar-weekDays.json')
        .pipe(map(weeks => {
            const filteredWeeks = weeks.filter(week => (week.week >= fromWk && week.week <= toWk ));
            return filteredWeeks;
        }))
}

export function getMultiWeekRangesMap$(fromWk, toWk): Observable<string> {
    return getConfig$('Gannett-Calendar-weekDays.json')
        .pipe(map(weeks => {
            const filteredWeeks = weeks.filter(week => (week.week >= fromWk && week.week <= toWk ));
            const fbRequestRange = filteredWeeks.map(week => {
                return { since: week.startOfWeek, until: week.endOfWeek }
            })
            return fbRequestRange;
        }))
}

export function generateReport$(account_id, time_range, breakdown = 'basic') {

}

export function generateAllReports$(account_id, time_range, breakdown = 'basic') {

}