// Coding Challenge #2 With AI

/*
Let's say you're building a time tracking application for freelancers. At some point in building this app, you need a function that receives daily work hours for a certain week, and returns:
1. Total hours worked
2. Average daily hours
3. The day with the most hours worked
4. Number of days worked
5. Whether the week was full-time (worked 35 hours or more)

TEST DATA: [7.5, 8, 6.5, 0, 8.5, 4, 0]
*/

'use strict';
const days = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday',
};

const timeTrackingAppForFreelancers = weekworkTimes => {
  let totalHours = 0;
  let workedDays = weekworkTimes.length;
  for (let day of weekworkTimes) {
    totalHours += day;
    if (day === 0) workedDays -= 1;
  }
  let averageDailyHOurs = totalHours / weekworkTimes.length;
  let mostWorked = weekworkTimes.indexOf(Math.max(...weekworkTimes));
  let mostWorkedDay = days[mostWorked];
  let isFullTimeWeek = totalHours >= 35 ? true : false;

  return {
    totalHours: totalHours,
    averageDailyHours: averageDailyHOurs,
    mostWorkedDay: mostWorkedDay,
    workedDays: workedDays,
    isFullTimeWeek: isFullTimeWeek,
  };
};
console.log(timeTrackingAppForFreelancers([7.5, 8, 6.5, 0, 8.5, 4, 0]));
