import { environment } from "../../../environment/enviroment";
const BASE_URL = environment.baseURL + "/message";


//this.status = doctorRegistration.status; // created, pendding, confirmed,  expired, cancel

const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };


  export const updateRegistration = async (id, name, status) => {
    return await fetch(BASE_URL + "/update/" + id, {
        method: "POST",
        headers: header,
        body:JSON.stringify({
            name: name,
            status: status
          })
      })
        .then((res) => res.json())
        .then((res) => {
          return res.doctorRegistration;
        }).catch((error) => {
            console.log(error);
            return null;
          });
    };

export const createMessage = async (message) => {
    return await fetch(BASE_URL, {
        method: "POST",
        headers: header,
        body:JSON.stringify({
            senderId: message.senderId,
            recieverId: message.recieverId,
            content: message.content,
            isMedicalRecord: false
          })
      })
        .then((res) => res.json())
        .then((res) => {
          return res.messages;
        }).catch((error) => {
            console.log( error);
            return null;
          });
    };

export const getAllByPatientId = async (patientId) => {
return await fetch(BASE_URL + "/patient/" + patientId, {
    method: "GET",
    headers: header,
  })
    .then((res) => res.json())
    .then((res) => {
      return res.doctorRegistration;
    }).catch((error) => {
        console.log( error);
        return null;
      });
};


export const getAllByPatientIdAndDoctorId = async (patientId, doctorId) => {
  return await fetch(BASE_URL + "/patient/" + patientId + "/doctor/" + doctorId ,{
      method: "GET",
      headers: header,
    })
      .then((res) => res.json())
      .then((res) => {
        return res.doctorRegistration;
      }).catch((error) => {
          console.log( error);
          return null;
        });
  };
  

