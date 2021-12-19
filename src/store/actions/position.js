import { environment } from "../../../environment/enviroment";
import { formatDate } from "../../utils/string-format";

const BASE_URL = environment.baseURL;
const BASE_URL_NEW = "https://fast-cliffs-01542.herokuapp.com";
const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getPositionsByPatient = async (patientId) => {
  try {
    const response = await fetch(BASE_URL + `/position/${patientId}/all`);
    const json = await response.json();
    return json.position;
  } catch (err) {
    console.log("position by patient" + err);
  }
};

export const getPositionsByState = async (patientId, state) => {
  return await fetch(BASE_URL + `/position/state`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ patientId: patientId, state: state }),
  })
    .then((response) => response.json())
    .then((result) => result.position)
    .catch((err) => console.log("position state: " + err));
};

export const getMaxPosition = async (department, date) => {
  return await fetch(BASE_URL + `/position/max`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ department: department, date: date }),
  })
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((err) => console.log("position max" + err));
};

export const createPosition = async (patientId, room, date, number) => {
  return await fetch(BASE_URL + "/position", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      patientId: patientId,
      room: room,
      date: new Date(date),
      number: number,
    }),
  })
    .then((response) => response.json())
    .then((result) => {console.log(result.message); return result.position})
    .catch((err) => {console.log("position create" + err); return null;});
};

export const cancel = async (id) => {
  return await fetch(BASE_URL + `/position/${id}/cancel`, {
    method: "PUT",
    headers: header,
  })
    .then((response) => response.json())
    .catch((err) => console.log("position cancel" + err));
};

export const expired = async () => {
  return await fetch(BASE_URL + `/position/expired`, {
    method: "PUT",
    headers: header,
  })
    .then((response) => response.json())
    .catch((err) => console.log("position expired" + err));
};

export const currentPosition = async (room, date) => {
  return await fetch(BASE_URL + "/position/current", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      room: room,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((result) => result.current)
    .catch((err) => console.log("position current" + err));
};

export const getAll = async () => {
  try {
    const response = await fetch(BASE_URL + "/position");
    const json = await response.json();
    return json.position;
  } catch (err) {
    console.log("position getall" + err);
    return null;
  }
};

export const getMaxPositionByDateAndRoom = async(date, room) => {
  getAll().then(res => {
    let lPosition = res;
    let number = 0;
  for(let i = 0; i < lPosition.length; i++) {
    if(lPosition[i].date) {
        if(formatDate(lPosition[i].date) == date && lPosition[i].room == room)
              number = number + 1;
    }
  }
  return number;
  })
  
}

