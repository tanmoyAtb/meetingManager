import moment from 'moment';

class Helper {
  format_time(date_obj) {
    var hour = date_obj.getHours();
    var minute = date_obj.getMinutes();
    var amPM = (hour > 11) ? "PM" : "AM";
    if(hour > 12) {
      hour -= 12;
    } 
    else if(hour === 0) {
      hour = "12";
    }
    if(hour < 10){
      hour = "0" + hour;
    }
    if(minute < 10) {
      minute = "0" + minute;
    }
    return hour + ":" + minute + " " + amPM;
  }

  format_time_string(date_obj) {
    var hour = date_obj.getHours();
    var minute = date_obj.getMinutes();
    if(hour < 10) {
      hour = "0" + hour;
    }
    if(minute < 10){
      minute = "0" + minute;
    }
    
    return hour + ":" + minute;
  }

  format_date(date_obj) {
    return moment(date_obj).format('DD/MM/YYYY');
  }

}


let helper = new Helper();

export default helper;