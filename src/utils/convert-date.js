export const compareDate = (date1, date2) => {
    let dateConvert1 = new Date(date1);
    let dateConvert2 = new Date(date2);
    if (dateConvert1.getFullYear != dateConvert2.getFullYear)
        return false;
    if (dateConvert1.getMonth != dateConvert2.getMonth) 
        return false;
    if (dateConvert1.getDate != dateConvert2.getDate)
        return false;
    return true;
}

export const convertStringToDate = (date) => {
    let from = date.split("/");
    return new Date(from[2], from[1] - 1, from[0])
}


export const compareDateBookingByDepartment = (date1, date2) => {
    
}

export const sortByTimestamp = (list) => {
    return list.sort(function (x, y) {
        return x.createdAt - y.createdAt;
    })
}

