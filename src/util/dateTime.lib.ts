const moment = require('moment');

export const DAY_IN_MS = 86400000;

export function getDate (date) {
    let newDate =  moment(date).format("YYYY-MM-DD");
    return newDate;
  }

export function getFutureDate(date, numOfTimeFrame, timeFrame = 'days') {
    return moment(date).add(numOfTimeFrame, timeFrame).format("YYYY-MM-DD");
}

// export function getWeek(dt)  {
//     var tdt = new Date(dt.valueOf());
//    var dayn = (tdt.getDay() + 6) % 7;
//    tdt.setDate(tdt.getDate() - dayn + 3);
//    var firstThursday = tdt.valueOf();
//    tdt.setMonth(0, 1);
//    if (tdt.getDay() !== 4) 
//      {
//     tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
//       }
//    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
//   }

export interface WeekMap {
    week: number;
    startOfWeek: string;
    endOfWeek: string;
}

export function buildGannettCalendar(firstDayOfYear) {
    let calander = [] as Object[];
    let startOfWeek = getDate(firstDayOfYear);
    let weeks = 52;
    for(let i = 1; i <= weeks; i++) {
        let endOfWeek = getFutureDate(startOfWeek, 6);
        let week = i;
        calander.push({week, startOfWeek, endOfWeek});
        startOfWeek = getFutureDate(endOfWeek, 1);
    }
  
    return calander;
  }

export class WeekDays {
    [key: string]: any;
}

export function addDays(weeks) {
    let newCalendar: Object[] = [];
    let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    weeks.map((week: any) => {
        let weekDays: any = {};
        days.map(day => {
            let date = getFutureDate(week.startOfWeek, days.indexOf(day));
            weekDays[day] = date;
        })
        newCalendar.push(Object.assign({}, week, weekDays));
      
        
    })
    return newCalendar;
}