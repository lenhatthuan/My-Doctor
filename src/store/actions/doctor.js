import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;
const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getAll = async () => {
  try {
    const response = await fetch(BASE_URL + "/doctor");
    const json = await response.json();
    return json.doctor;
  } catch (err) {
    console.log(err);
    return null;
  }
};

//utf-8
export const findDoctorByName = async (name) => {
  try {
    if (name) {
      const response = await fetch(BASE_URL + "/doctor/find/" + name);
      const json = await response.json();
      return json.doctor;
    } else {
      const response = await fetch(BASE_URL + "/doctor");
      const json = await response.json();
      return json.doctor;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDoctor = async(id) => {
  try {
    const response = await fetch(BASE_URL + "/doctor/" + id);
    const json = await response.json();
    return json.doctor;
  } catch (err) {
    console.log(err);
    return null;
  }
}
