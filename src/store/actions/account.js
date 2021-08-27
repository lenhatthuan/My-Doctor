const BASE_URL = process.env.BASE_URL;

const signin = (username, pass) =>{
    return(
        fetch(BASE_URL  + '/accounts', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
             'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: pass
            })
        })
        .then((response) => response.json())
        .then((json) => {
          return json;
        })
        .catch((error) => {
          console.error("sigin fail" + error);
        })
    )
}

module.exports = {signin}