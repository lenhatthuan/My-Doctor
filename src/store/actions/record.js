import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;
const BASE_URL_NEW = "https://fast-cliffs-01542.herokuapp.com";
export const getRecordByPatient = async (patientId) => {
  try {
    const response = await fetch(
      BASE_URL_NEW + `/medical-record/${patientId}/patient`
    );
    const json = await response.json();
    return json.record;
  } catch (err) {
    console.log(err);
  }
};

export const getRecordById = async (id) => {
  try {
    const response = await fetch(BASE_URL_NEW + `/medical-record/${id}`);
    const json = await response.json();
    return json.record;
  } catch (err) {
    console.log(err);
  }
};
