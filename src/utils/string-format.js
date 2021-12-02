import Moment from 'moment';

export const convertTitle = (first, second) =>{
    return first + "/" + second;
}

export const formatDate = (date) =>{
    Moment.locale('en');
    return Moment(date).format('DD/MM/YYYY');
}

export const formatDateTime = (date) => {
    Moment.locale('en');
    return Moment(date).format('DD/MM/YYYY, h:mm:ss a');
}

export const getDay = (date) => { 
    let day =  parseInt(Moment(date).format('DD/MM/YYYY').charAt(0) + Moment(date).format('DD/MM/YYYY').charAt(1));
    return day;
}

export const formatTime = (date) => {
    Moment.locale('en');
    return Moment(date).format('h:mm:ss a');
}

export const balanceFormat = (price) => {
    var price_format = '';
    if (price == 0) return '0 Đ';
    if (price < 1000) return price + ' Đ';
  
    var priceString = price + '';
    while (priceString.length - 3 > 0) {
      price_format =
        '.' + priceString.substring(priceString.length - 3) + price_format;
      priceString = priceString.substring(0, priceString.length - 3);
    }
    price_format = priceString + price_format + ' Đ';
    return price_format;
  }

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const changeStatusDoctorRegistration = (status) => {
 if (status == "CONFIRMED") return "Đang sử dụng";
 if (status == "CREATED") return "Chờ thanh toán";
 if (status == "PENDDING") return "Chờ xác nhận";
 if (status == "EXPIRED") return "Đã hết hạn";
 if (status == "CANCEL") return "Đã hủy";

 return "NONE";
}

export const changeColorDoctorRegistration = (status) => {
  if (status == "CONFIRMED") return "#00A19D";
  if (status == "CREATED") return "#34BE82";
  if (status == "PENDDING") return "#FF5F7E";
  if (status == "EXPIRED") return "#FFCA03";
  if (status == "CANCEL") return "#F90716";
 
  return "#fff";
 }
  

 export const getTime = (dateRegistration, duration) => {
   let timeDuration = duration*30*24*60*60;
   let currentDate = new Date();
   let date = new Date(dateRegistration);
    date.setDate(date.getDate() + duration);
    let time = date.getTime()/1000 - currentDate.getTime()/1000;
    return time;
   console.log("duration: " + time + " date new:" + date + " ,datecurrent: " + new Date(currentDate));
 }