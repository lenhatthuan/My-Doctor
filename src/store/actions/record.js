import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;

export const getRecordByPatient = async (patientId) => {
  try {
    const response = await fetch(BASE_URL + `/record/${patientId}`);
    const json = await response.json();
    return json.record;
  } catch (err) {
    console.error(err);
  }
};

export const getRecordById = async (id) => {
  try {
    const response = await fetch(BASE_URL + `/record/${id}`);
    const json = await response.json();
    return json.record;
  } catch (err) {
    console.error(err);
  }
};
