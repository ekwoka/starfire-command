import formattedReturn from './helpers/formattedReturn';
import * as OAuth from './helpers/OAuth'
import * as Starfire from './helpers/starfire';

export const handler = async (event) => {
    try {
        // do stuff
        return formattedReturn(200, true);
      } catch (e) {
        console.error(e);
        return formattedReturn(418, {error: e});
      }
}