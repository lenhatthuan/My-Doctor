import { AsyncStorage } from "react-native";
import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;
const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
export const  getPatientById = async(patientId)=>{
    return (
        await fetch(BASE_URL + `/patient/${patientId}`, {method:'GET', Headers:header})
    .then((response) => response.json())
    .then((json) =>{
        console.log("go to get patient")
        console.log("patien: " + json)
        if(json.patient)
            savePatientToStorage(json.patient);
        return json;
    }).catch((err) =>{
        console.error("Get patient by id fail: " + err);
    })
    )
}

const savePatientToStorage = (patient) =>{
    AsyncStorage.setItem('patientData',
    JSON.stringify({
        patientId: patient.id,
        fullName: patient.fullName,
        avatar: patient.avatar,
        birthDate : patient.birthDate,
        gender : patient.gender,
        address: patient.address,
        createdAt : patient.createdAt,
        updatedAt : patient.updatedAt 
    }))
}