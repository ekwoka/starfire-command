export default function(Alpine){
    Alpine.data('loginCard',()=>({
        name: '',
        password: '',
        submit(){
            Starfire.api('validate',{name:this.name,token:this.password})
        }
    }))
}