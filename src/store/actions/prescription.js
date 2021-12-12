import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;
const BASE_URL_NEW = "https://fast-cliffs-01542.herokuapp.com";

export const getByRecord = async (recordId) => {
  try {
    const response = await fetch(BASE_URL_NEW + `/prescription/${recordId}`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};
