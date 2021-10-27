const API = `${window.location.origin}/api/`

export async function api(endpoint,data={}){
    console.time(endpoint)
    data.auth = localStorage.getItem("STARFIRE_AUTH")
    let request = await fetch(API+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
    data = await request.json()
    console.timeEnd(endpoint)
    return data
}

let timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
    hour12: false
}

let dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
    hour12: false
}

export function time(time,option=''){
    if(option == 'time') return new Date(time).toLocaleString(undefined,timeOptions)
    if(option == 'date') return new Date(time).toLocaleString(undefined,dateOptions)
    return `${new Date(time).toLocaleString(undefined,timeOptions)} ${new Date(time).toLocaleString(undefined,dateOptions)}`
}