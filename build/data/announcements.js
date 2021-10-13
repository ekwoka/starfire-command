export default function(Alpine){
    Alpine.data('announcementsSnippet',()=>({
        as: [],
        totalAnnounce: -1,
        async init(){
            this.totalAnnounce = 0
        }
    }))
}