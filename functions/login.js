import formattedReturn from './helpers/formattedReturn';
import * as Starfire from './helpers/starfire';
import * as OAuth from './helpers/OAuth'
require('dotenv').config()

export const handler = async(event) => {
    try {
        let code = JSON.parse(event.body)
        if(typeof code != 'string') throw 'Expected String'
        let OAuthData = await OAuth.fetchToken(code,event.headers.origin)
        if (OAuthData.error) throw OAuthData.error
        let validatedUser = await OAuth.validateToken(OAuthData)
        if(validatedUser.error) throw validatedUser.error
        let authID = await Starfire.users.add({...validatedUser,auth: OAuthData})
        return formattedReturn(200,authID) 
    } catch(e) {
        console.error(e)
        return formattedReturn(418,{error: e})
    }
};