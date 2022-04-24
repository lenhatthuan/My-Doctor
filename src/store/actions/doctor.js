import AsyncStorage from '@react-native-async-storage/async-storage';
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
    // doctors= await registration.map((res) => {
    //   if(res.status == status){
    //     getDoctor(res.doctorId).then(res => {
    //       if(!!res)
    //         return res;
    //     })}
    // })
    await registration.forEach(res => {
      console.log("first")
     if(res.status == status){
      console.log("two")
      getDoctor(res.doctorId).then(res => {
        doctors.push(res);
        console.log("333")
      })
     }
    });
    console.log("firtruest")

    return doctors;
  } catch (err) {
    console.log(err);
    return null;
  }
}
