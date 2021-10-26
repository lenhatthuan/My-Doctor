import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;
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
    console.error(err);
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
    .catch((err) => console.error(err));
};

export const getMaxPosition = async (department, date) => {
  return await fetch(BASE_URL + `/position/max`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ department: department, date: date }),
  })
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((err) => console.error(err));
};

export const createPosition = async (patientId, room, date, number) => {
  return await fetch(BASE_URL + "/position", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      patientId: patientId,
      room: room,
      date: date,
      number: number,
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result.message))
    .catch((err) => console.error(err));
};

export const cancel = async (id) => {
  return await fetch(BASE_URL + `/position/${id}/cancel`, {
    method: "PUT",
    headers: header,
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const expired = async () => {
  return await fetch(BASE_URL + `/position/expired`, {
    method: "PUT",
    headers: header,
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
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
    .catch((err) => console.error(err));
};
