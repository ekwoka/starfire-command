import formattedReturn from './helpers/formattedReturn';
import * as OAuth from './helpers/OAuth'
import * as Starfire from './helpers/starfire';

export const handler = async (event) => {
    try {
        let data = JSON.parse(event.body)
        if(!data.auth) throw 'Authorization Key Missing'
        if(!data.type) throw 'Data Type missing'
        let auth = await OAuth.checkAuth(data.auth)
        if(!auth) throw 'Failed Authentification' 
        let ops = await Starfire.operations.get(data.type)
        return formattedReturn(200, ops);
      } catch (e) {
        console.error(e);
        return formattedReturn(418, {error: e});
      }
}