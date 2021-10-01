const API = 'https://thekwoka.api.stdlib.com/starfire@dev/'

export async function api(endpoint,data={}){
    request = await fetch(API+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
    data = await request.json()
    return data
}