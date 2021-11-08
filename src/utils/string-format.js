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