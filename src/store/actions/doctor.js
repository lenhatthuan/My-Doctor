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
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const findDoctorByName = async (name) => {
  try {
    if (name) {
      const response = await fetch(BASE_URL + "/doctor/find/" + name);
      const json = await response.json();
      return json;
    } else {
      const response = await fetch(BASE_URL + "/doctor");
      const json = await response.json();
      return json;
    }
  } catch (err) {
    console.error(err);
  }
};
