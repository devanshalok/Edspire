import axios from "axios";
import config from "./config";

export default async function getProfile(token) {
    let response = await axios.get(config.BASE_URL + '/profile', {
        headers: {
            'Authorization': token
        }
    });
    if (response.status == 200 && response.data.statusCode == 200) {
        console.log('response',response)
        return {...response.data.data.userDetails,token};
            // setSpaces(response.data.data.spaces);
    } else {
        console.log('some exception occurred', response)
    }        
}

