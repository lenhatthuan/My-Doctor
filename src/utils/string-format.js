import Moment from 'moment';

export const convertTitle = (first, second) =>{
    return first + "/" + second;
}

export const formatDate = (date) =>{
    Moment.locale('en');
    return Moment(date).format('DD/MM/YYYY');
}

export const formatTime = (date) => {
    let dateNew = new Date(date);
    return dateNew.getHours() + ":" + dateNew.getMinutes(), + ":" +   dateNew.getSeconds();
}