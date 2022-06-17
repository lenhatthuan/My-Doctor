import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;

export const getRoomByDepartment = async (deparment) => {
  try {
    const response = await fetch(BASE_URL + `/roomActive/${deparment}`);
    const json = await response.json();
    return json.room;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAll = async () => {
  try {
    const response = await fetch(BASE_URL + "/room");
    const json = await response.json();
    return json.room;
  } catch (err) {
    console.log(err);
    return null;
  }
};


export const getRoomByID = async (id) => {
  try {
    const response = await fetch(BASE_URL + `/room/${id}/id`);
    const json = await response.json();
    console.log("room controller" + json.room[0]);
    return json.room[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};
