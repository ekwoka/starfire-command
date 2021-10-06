const API = `${window.location.origin}/api/`

export async function api(endpoint,data={}){
    data.auth = localStorage.getItem("STARFIRE_AUTH")
    let request = await fetch(API+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
    data = await request.json()
    return data
}