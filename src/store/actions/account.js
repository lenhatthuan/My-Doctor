import { environment } from "../../../environment/enviroment";

const BASE_URL = environment.baseURL;
const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
export const signin = async (username, pass) =>{
    return(
        await fetch(BASE_URL  + '/accounts/signin', {
            method: 'POST',
            headers: header
           ,
            body: JSON.stringify({
                username: username,
                password: pass 
            })
        })
        .then((response) => response.json())
        .then((json) => {
            console.log("account: " + json.token + " username: " + username)
          return json;
        })
        .catch((error) => { 
          console.error("sigin fail *********************: " + error);
        })
    )
}
