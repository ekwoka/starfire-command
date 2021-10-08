import * as Starfire from "./starfire";

const OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=854194325188640819&redirect_uri=${encodeURIComponent(
  window.location.origin
)}&response_type=code&scope=identify%20guilds`;

export async function checkIdentity() {
  if (localStorage.getItem("STARFIRE_AUTH")) return checkAuth();
  let ID = await verifyCode();
  if (ID.error) return (Alpine.store('login').loggingIn = false);
  Alpine.store('login').isLoggedIn = true;
  Alpine.store('login').loggingIn = false;
  localStorage.setItem("STARFIRE_AUTH", ID);
}

export async function checkAuth() {
  if (await Starfire.api("verify", localStorage.getItem("STARFIRE_AUTH")))
    return (Alpine.store('login').isLoggedIn = true);
  Alpine.store('login').isLoggedIn = false;
  Alpine.store('login').loggingIn = false;
  localStorage.removeItem("STARFIRE_AUTH");
}

export async function verifyCode() {
  let params = new URLSearchParams(window.location.search);
  const OAUTH_CODE = params.get("code");
  if (OAUTH_CODE) return await createToken(OAUTH_CODE);
  return {error:true}
}

export async function createToken(OAUTH_CODE) {
  return await Starfire.api("login", OAUTH_CODE);
}
