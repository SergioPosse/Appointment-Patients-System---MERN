const moment = require('moment');

let date = "13-09-2020";
let time = "5:00";

let fulldate = moment(date+" "+time, "DD-MM-YYYYTH:mm").format("YYYY-MM-DDTH:mm")

console.log(fulldate);