import formattedReturn from './helpers/formattedReturn';
import * as OAuth from './helpers/OAuth'
import * as Starfire from './helpers/starfire';

export const handler = async(event) => {
    let data = JSON.parse(event.body)
    console.log(data.auth)
    if(await OAuth.checkAuth(data.auth)) console.log('Authorization Found')
    if(!(await OAuth.checkAuth(data.auth))) return formattedReturn(418,{error: 'You cannot access this content'})
    return formattedReturn(200,{success:'Congrats'})
};