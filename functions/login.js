import formattedReturn from './helpers/formattedReturn';
import * as Starfire from './helpers/starfire';
import fetch from 'node-fetch';
require('dotenv').config()

export const handler = async(event) => {
    try {
        let code = JSON.parse(event.body)
        console.log(code)
        if(typeof code != 'string') throw 'Expected String'
        console.log(process.env.OAUTH_ID)
        let request = {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.OAUTH_ID,
                client_secret: process.env.OAUTH_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `http://localhost:8888`,
                scope: 'identify,guilds',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        let response = await fetch('https://discord.com/api/oauth2/token',request)
        let OAuthData = await response.json()
        console.log(OAuthData)
        return formattedReturn(200,OAuthData)

    } catch(e) {
        console.error(e)
        return formattedReturn(418,{error: e})
    }
};