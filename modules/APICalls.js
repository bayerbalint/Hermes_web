export const API_URL = 'http://localhost:8000/apiV1';

export async function POSTRequest(endpoint, body, auth=""){
    try{
        const res = await fetch(`${API_URL}${endpoint}`, {
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`,
            }),
            method: "POST",
            body: JSON.stringify(body),
        });

        return res.json();
    }
    catch(err){
        console.error(err);
    }
}

export async function GETRequest(endpoint, auth){
    console.log(auth);
    try{
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "GET",
            headers: new Headers({
                'Authorization' : `Bearer ${auth}`,
                'Content-Type' : 'text/plain'
            }),
        });

        return res;
    }
    catch (err){
        console.error(err);
    }
}