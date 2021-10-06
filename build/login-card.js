export default function(Alpine){
    Alpine.data('loginCard',()=>({
        name: '',
        password: '',
        loggingIn:false,
        async submit(){
            this.loggingIn=true;
            window.location = 'https://discord.com/api/oauth2/authorize?client_id=854194325188640819&redirect_uri=http%3A%2F%2Flocalhost%3A8888&response_type=code&scope=identify%20guilds'
        }
    }))
}