import Moment from 'moment';

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
export {width, height};

export const convertTitle = (first, second) => {
  return first + '/' + second;
};

export const formatDate = date => {
  Moment.locale('en');
  return Moment(date).format('DD/MM/YYYY');
};
export const formatDateYear = date => {
  Moment.locale('en');
  return Moment(date).format('DD/MM/YY');
};
export const formatDateCalandar = date => {
  Moment.locale('en');
  return Moment(date).format('YYYY-MM-DD');
};

export const formatDateTime = date => {
  Moment.locale('en');
  return Moment(date).format('DD/MM/YYYY, h:mm:ss a');
};

export const formatSession = date => {
  Moment.locale('en');
  let session = 'Sáng';
  if (Moment(date).format('a') === 'pm') session = 'Chiều';
  return session + ' ' + Moment(date).format('DD/MM/YYYY');
};

export const getDay = date => {
  let day = parseInt(
    Moment(date).format('DD/MM/YYYY').charAt(0) +
      Moment(date).format('DD/MM/YYYY').charAt(1),
  );
  return day;
};

export const formatTime = date => {
  Moment.locale('en');
  return Moment(date).format('h:mm:ss a');
};

export const balanceFormat = price => {
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
};

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const changeStatusDoctorRegistration = status => {
  if (status == 'CONFIRMED') return 'Đang sử dụng';
  if (status == 'CREATED') return 'Chờ thanh toán';
  if (status == 'PENDDING') return 'Chờ xác nhận';
  if (status == 'EXPIRED') return 'Đã hết hạn';
  if (status == 'CANCEL') return 'Đã hủy';

  return 'NONE';
};

export const changeColorDoctorRegistration = status => {
  if (status == 'CONFIRMED') return '#00A19D';
  if (status == 'CREATED') return '#34BE82';
  if (status == 'PENDDING') return '#FF5F7E';
  if (status == 'EXPIRED') return '#FFCA03';
  if (status == 'CANCEL') return '#F90716';

  return '#fff';
};

export const getTime = (dateRegistration, duration) => {
  let currentDate = new Date();
  let date = new Date(dateRegistration);
  date.setDate(date.getDate() + duration);
  let time = date.getTime() / 1000 - currentDate.getTime() / 1000;
  return time;
};

export const convertTimeSelected = time => {
  if (time == 'Sáng') return '7:00 AM';
  return '14:00'; //Chiều
};

export const convertMoneyFromVNToUS = money => {
  console.log('money: ' + money * 0.000043);
  return money * 0.000043;
};

export const discription = status => {
  if (status == 'CONFIRMED') return 'Bạn đã và đang sử dụng dịch vụ này!';
  if (status == 'CREATED')
    return 'Bạn vừa tạo dịch vụ và chưa tiến hành thanh toán!';
  if (status == 'PENDDING')
    return 'Bạn đã chuyển khoảng, đợi admin duyệt đơn thanh toán của bạn, đừng lo lắng!';
  if (status == 'EXPIRED') return 'Thời hạn đăng ký của bạn đã hết!';
  if (status == 'CANCEL') return 'Bạn đã hủy đăng ký!';

  return '#fff';
};

export const statusHA = (diastole, systole) => {
  if (diastole < 80 && systole < 120) return 'HA tối ưu';
  if (systole < 130 && diastole < 85) return 'HA bình thường';
  if (systole >= 130 && systole <= 135 && diastole >= 85 && diastole <= 89)
    return 'HA BT nhẹ';
  if (systole >= 140 && systole <= 159 && diastole >= 90 && diastole <= 99)
    return 'THA độ 1';
  if (systole >= 160 && systole <= 179 && diastole >= 100 && diastole <= 109)
    return 'THA độ 2';
  if (systole >= 180 && diastole >= 110) return 'THA độ 3';
  if (systole >= 140 && diastole < 90) return 'THA tâm thu đơn độc';
  return 'Bất thường';
};

export const convertTimestampToDate = timestamp => {
  if (timestamp) {
    let date = timestamp.toDate().toDateString();
    let time = timestamp.toDate().toLocaleTimeString('en-US');
    return {
      date: date,
      time: time,
    };
  }
  // let date = new Date(timestamp);
  return {
    date: 'date',
    time: 'time',
  };
};

export const shortMessage = (message, length) => {
  return message?.length > length ? `${message.slice(0, length)}...` : message;
};
