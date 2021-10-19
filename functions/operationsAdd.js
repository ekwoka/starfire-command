import formattedReturn from './helpers/formattedReturn';
import * as OAuth from './helpers/OAuth'
import * as Starfire from './helpers/starfire';

export const handler = async (event) => {
    try {
        let data = JSON.parse(event.body)
        if(!data.auth) throw 'Authorization Key Missing'
        let auth = await OAuth.checkAuth(data.auth)
        if(!auth) throw 'Failed Authentification' 
        delete data.auth
        let response = await Starfire.operations.add(data)
        return formattedReturn(200, response);
      } catch (e) {
        console.error(e);
        return formattedReturn(418, {error: e});
      }
}