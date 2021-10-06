import * as Starfire from "./starfire";

const OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=854194325188640819&redirect_uri=${encodeURIComponent(
  window.location.origin
)}&response_type=code&scope=identify%20guilds`;

export async function checkIdentity() {
  if (localStorage.getItem("STARFIRE_AUTH")) return checkAuth();
  let ID = await verifyCode();
  if (ID.error) return (window.Starfire.loggedIn = false);
  window.Starfire.loggedIn = true;
  window.Starfire.loggingIn = false;
  localStorage.setItem("STARFIRE_AUTH", ID);
}

export async function checkAuth() {
  if (await Starfire.api("verify", localStorage.getItem("STARFIRE_AUTH")))
    return (window.Starfire.loggedIn = true);
  window.Starfire.loggedIn = false;
  window.Starfire.loggingIn = false;
  localStorage.removeItem("STARFIRE_AUTH");
}

export async function verifyCode() {
  let params = new URLSearchParams(window.location.search);
  const OAUTH_CODE = params.get("code");
  console.log(OAUTH_CODE);
  if (OAUTH_CODE) return await createToken(OAUTH_CODE);
  console.log("No OAuth Code Found");
  return {error:true}
}

export async function createToken(OAUTH_CODE) {
  return await Starfire.api("login", OAUTH_CODE);
}
