const moment = require('moment');

const dtl = {
    main: () => console.log(moment),
    dayInMs: 86400000 ,
    getDate: date => {
      let newDate =  moment(date).format("YYYY-MM-DD");
      return newDate;
    },
    getFutureDate: (date, numOfTimeFrame, timeFrame = 'days') => {
       return moment(date).add(numOfTimeFrame, timeFrame).format("YYYY-MM-DD");
    },
    getWeek: (dt) =>  {
      var tdt = new Date(dt.valueOf());
      console.log("Got date: ", tdt.toUTCString())
     var dayn = (tdt.getDay() + 6) % 7;
     console.log(dayn)
     tdt.setDate(tdt.getDate() - dayn + 3);
     console.log(tdt.valueOf())
     var firstThursday = tdt.valueOf();
     tdt.setMonth(0, 1);
     console.log(tdt.toUTCString());
     if (tdt.getDay() !== 4) 
       {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
     return 1 + Math.ceil((firstThursday - tdt) / 604800000);
    },
    buildGannettCalendar: (firstDayOfYear) => {
      let GannettCalendar = [];
      let GannettStartOfWeek = dtl.getDate(firstDayOfYear)
      let weeks = 52;
      for(let i = 1; i <= weeks; i++) {
          let wk = {}
          let endOfWeek = dtl.getFutureDate(GannettStartOfWeek, 6);
          wk.week = i;
          wk.GannettStartOfWeek = GannettStartOfWeek;
          wk.endOfWeek = endOfWeek;
          GannettCalendar.push(wk);
          GannettStartOfWeek = dtl.getFutureDate(endOfWeek, 1);
          log(wk) 
      }

      return GannettCalendar;
  }
  

}

module.exports = dtl;
//  let dt = new Date('2018-09-01');
//  console.log(dt.getDay())
//  console.log(l.getWeek(dt));
