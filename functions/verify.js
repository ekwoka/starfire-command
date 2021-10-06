import formattedReturn from "./helpers/formattedReturn";
import * as Starfire from "./helpers/starfire";
import * as OAuth from "./helpers/OAuth";
require("dotenv").config();

export const handler = async (event) => {
  try {
    let ID = JSON.parse(event.body);
    let user = await Starfire.users.get(ID);
    if(user.error) throw user.error
    let auth = user.auth
    if (auth.refresh_token) {
      newAuth = await OAuth.refreshToken(auth.refresh_token);
      if (!newAuth.error) auth = newAuth;
    }
    validatedUser = await OAuth.validateToken(auth)
    if(user.error) throw user.error
    await Starfire.users.add({...validatedUser,auth})
    return formattedReturn(200, true);
  } catch (e) {
    console.error(e);
    return formattedReturn(418, false);
  }
};
