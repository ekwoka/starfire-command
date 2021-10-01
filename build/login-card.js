export default function(Alpine){
    Alpine.data('loginCard',()=>({
        name: '',
        password: '',
        loggingIn:false,
        submit(){
            this.loggingIn=true
            Starfire.api('validate',{name:this.name,token:this.password})
        }
    }))
}