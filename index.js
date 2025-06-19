// Your code here

function createEmployeeRecord([firstName,familyName,title,payPerHour]){
  return {
   firstName,
   familyName,
   title,
   payPerHour,
   timeInEvents:[],
   timeOutEvents:[]
}
}
console.log(createEmployeeRecord(['Gray','Worm','Security',1]));

function createEmployeeRecords(employeeData){
    return employeeData.map(createEmployeeRecord);
}
// function createTimeInEvent(employeeRecord, dateTimeString){
//     let [date,hour] = dateTimeString.split("");
//     let timeInEvent = {
//         type:"TimeIn",
//         hour:parseInt(hour),
//         date:date
//     }
//     employeeRecord.timeInEvent.push(timeInEvent);
//     return createEmployeeRecord;
// }
function createTimeInEvent(employeeRecord, dateTimeString) {
  let [date, hour] = dateTimeString.split(" ");

  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  };

  employeeRecord.timeInEvents.push(timeInEvent);

  return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateTimeString){
  let [date, hour] = dateTimeString.split(" ");

  let timeOutEvents = {
    type:"TimeOut",
    hour:parseInt(hour),
    date:date
  }
  employeeRecord.timeOutEvents.push(timeOutEvents);
  return employeeRecord;
}
// function hoursWorkedOnDate(employeeRecord,dateTimeString){
//   // dateTimeString = timeInEvent - timeOutEvents;
//   // employeeRecord.reduce(dateTimeString);
  
//   // return employeeRecord;
//   let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
//   let timeOut = employeeRecord.timeOutEvents.find(event => event.date ===date );

//   let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
//   return hoursWorked;
// }
function hoursWorkedOnDate(employeeRecord, date) {
  let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date){
  let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date )
  let timeOutEvent= employeeRecord.timeOutEvents.find(event => event.date === date)
  let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked * employeeRecord.payPerHour;
  
}
function allWagesFor(employeeRecord){
//    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date )
//   let timeOutEvent= employeeRecord.timeOutEvents.find(event => event.date === date)
//   let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
//   let wages = (hoursWorked * payPerHour) + (hoursWorked *payPerHour);
//   return wages;
  let totalWages = employeeRecord.timeInEvents.reduce((total, timeInEvent)=>{
  let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === timeInEvent.date);
  let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) /100;
  return total + (hoursWorked * employeeRecord.payPerHour);
}, 0);
return totalWages;
}
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
