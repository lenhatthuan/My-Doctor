import { AsyncStorage } from "react-native";
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
            const expirationDate =new Date( new Date().getTime() + 1000000);
            saveDataToStorage(json.token, json.account.id, expirationDate);
          return json;
        })
        .catch((error) => { 
          console.error("sigin fail *********************: " + error);
        })
    )
}

const saveDataToStorage = (token, accountId, expirationDate) =>{
    try{
        AsyncStorage.setItem(
            'accountData',
            JSON.stringify({
                token: token,
                accountId: accountId,
                expirationDate: expirationDate
            })
        )
    }catch (error){
        console.error("save error" + error)
    }
}

export const isLogin = () =>{
    const accountData = AsyncStorage.getItem('accountData');
    if(!accountData){
        return null;
    }else{
        return accountData;
    }
}

export const logout = () =>{
         AsyncStorage.removeItem('accountData')
         AsyncStorage.removeItem('patientData')
        return true;
}


