export default {
    template: `<div>
    <h1>Categories Form</h1>
    <input type="text" placeholder="name" v-model="resource.name" />
    <input type="text" placeholder="description"  v-model="resource.description"/>
    <input type="text" placeholder="image"  v-model="resource.image"/>
    <button @click="createResource">Create</button>
    </div>`,

    data(){
        return {
            resource: {
                name: null,
                description: null,
                image: null
            }, 
            token: localStorage.getItem('auth-token')
        }
    },
    methods:{
        async createResource(){
             const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Authentication-Token': this.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.resource)
            })
            
            const data = await res.json()
            if(res.ok){
                alert(data.message)
            }else
            {
                alert(data.message)
            }
        }
    }
}