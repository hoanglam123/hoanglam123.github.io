import axios from "axios";

function search(query, offset) {
    let url = "http://api.giphy.com/v1/gifs/search?api_key=mzjgbqngJSoQEocxV5lHlTbv1XgUUpb4&q="+query+"&limit=8&offset="+offset
  axios.get(`${url}`)
        .then(res => {
            return res
        })
        .catch(error => console.log(error));
}
// function getToken(clientID, msisdn) {
//     let endpoint = "/onmedia/token" + '?clientID=' + clientID + '&userID=&msisdn=' + Helper.md5Str(msisdn);
//     return ApiCaller.callApiMocha(endpoint, 'GET', null);
// }
export default {
    search,
    // getToken
};
