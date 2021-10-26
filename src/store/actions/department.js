import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;

export const getDepartment = async (name) => {
  try {
    const response = await fetch(BASE_URL + `/department/${name}`);
    const json = await response.json();
    return json.department;
  } catch (err) {
    console.error(err);
  }
};
