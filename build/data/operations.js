import * as Starfire from '../starfire'

export default function (Alpine){
    Alpine.data('operationsSnippet',()=>({
        operations: [],
        totalOps: -1,
        async init(){
            let auth = localStorage.getItem('STARFIRE_AUTH')
            if(!auth) return
            let data = {
                auth,
                type: 'snippet'
            }
            let ops = await Starfire.api('operations',data)
            if(ops.error) return console.error(ops.error)
            this.totalOps = ops.length
            this.operations = ops.slice(0,3)
        }
    }))
}