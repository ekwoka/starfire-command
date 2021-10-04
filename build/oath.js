import * as Starfire from './starfire'

const OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=854194325188640819&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code&scope=identify%20guilds`

export async function checkIdentity(){
    console.error('No Identity Found')
    return verifyCode()
}

export async function verifyCode(){
    let params = new URLSearchParams(window.location.search)
    const OAUTH_CODE = params.get('code')
    console.log(OAUTH_CODE)
    if(OAUTH_CODE) return createToken(OAUTH_CODE)
    return console.error('No OAuth Code Found')
}

export async function createToken(OAUTH_CODE){
    let response = await Starfire.api('login',OAUTH_CODE)
}