import { AsyncStorage } from "react-native";
import { environment } from "../../../environment/enviroment";
import { getAllByPatientId } from "./doctor-registration";

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

export const getListDoctorService = async(id, status) => {
  try {
    const registration = await getAllByPatientId(id);
    let doctors = [];
    await registration.forEach(res => {
     if(res.status == status){
      getDoctor(res.doctorId).then(res => {
        doctors.push(res);
        console.log("doctor action 59: " + res.id);
      })
     }
    })
    return doctors;
  } catch (err) {
    console.log(err);
    return null;
  }
}
