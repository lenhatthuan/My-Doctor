import { environment } from "../../../environment/enviroment";
const BASE_URL = environment.baseURL + "/service";

const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

export const getAllByDoctorId = async (doctorId) => {
    console.log("doctor id: " + doctorId);
return await fetch(BASE_URL + "/" + doctorId + "/doctor", {
    method: "GET",
    headers: header,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("service: " + res.service);
      return res.service;
    }).catch((error) => {
        console.log( error);
        return null;
      });
};


export const getServiceById = async(id) => {
  try {
    const response = await fetch(BASE_URL + "/" + id);
    const json = await response.json();
    return json.service;
  } catch (err) {
    console.log(err);
    return null;
  }
}


export const getAllService = async(id) => {
  try {
    const response = await fetch(BASE_URL );
    const json = await response.json();
    return json.service;
  } catch (err) {
    console.log(err);
    return null;
  }
}
