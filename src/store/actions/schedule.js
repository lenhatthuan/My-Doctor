import { environment } from "../../../environment/enviroment";
const BASE_URL = environment.baseURL + "/schedule";

const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

export const getAllScheduleByDoctorId = async (doctorId) => {
return await fetch(BASE_URL + "/" + doctorId + "/doctor", {
    method: "GET",
    headers: header,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("chedule: " + res.schedule);
      return res.schedule;
    }).catch((error) => {
        console.log( error);
        return null;
      });
};
