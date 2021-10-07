import fetch from "node-fetch";
import * as Starfire from "./starfire"

export async function validateToken(Auth) {
  try {
    let fetchData = {
      headers: {
        authorization: `${Auth.token_type} ${Auth.access_token}`
      }
    };
    let user = fetch("https://discord.com/api/users/@me", fetchData);
    let guilds = fetch("https://discord.com/api/users/@me/guilds", fetchData);
    [user, guilds] = await Promise.all([user, guilds]);
    [user, guilds] = await Promise.all([user.json(), guilds.json()]);
    if (!validateMember(guilds))
      throw "User is not Authorized to Access this Service";
    return user;
  } catch (e) {
    return { error: e };
  }
}

export async function refreshToken(refresh_token) {
  try {
    let request = {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.OAUTH_ID,
        client_secret: process.env.OAUTH_SECRET,
        grant_type: "refresh_token",
        refresh_token
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    let response = await fetch("https://discord.com/api/oauth2/token", request);
    return await response.json();
  } catch (e) {
    return { error: e };
  }
}

export async function validateMember(servers) {
  return servers.some((s) => s.id == "878466988136087602");
}

export async function fetchToken(code) {
  try {
    console.log(code)
    let request = {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.OAUTH_ID,
        client_secret: process.env.OAUTH_SECRET,
        code,
        grant_type: "authorization_code",
        scope: "identify,guilds"
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    console.log(request)
    let response = await fetch("https://discord.com/api/oauth2/token", request);
    return await response.json();
  } catch (e) {
    return { error: e };
  }
}

export async function checkAuth(ID){
  let user = await Starfire.users.get(ID)
  if(user.error) return false
  return true
}