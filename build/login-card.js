export default function(Alpine){
    Alpine.data('loginCard',()=>({
        name: '',
        password: '',
        loggingIn:false,
        async submit(){
            this.loggingIn=true
            let response = await Starfire.api('login',{name:this.name,password:this.password})
            if(response.error) return console.error(response.error)
            console.log(response)
        }
    }))
}