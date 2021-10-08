export default function(Alpine){
    Alpine.data('loginCard',()=>({
        async submit(){
            this.loggingIn=true;
            window.location = `https://discord.com/api/oauth2/authorize?client_id=854194325188640819&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code&scope=identify%20guilds`
        }
    }))
}