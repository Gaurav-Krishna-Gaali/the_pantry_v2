export default {
    template: `<div>
    <h1>Products Form</h1>
    <input type="text" placeholder="name" v-model="resource.name" />
    <input type="text" placeholder="quantity"  v-model="resource.quantity"/>
    <input type="int" placeholder="Category ID"  v-model="resource.category_id"/>
    <input type="text" placeholder="price"  v-model="resource.price"/>
    <button @click="createResource">Create</button>
    </div>`,

    data() {
        return {
            resource: {
                name: null,
                quantity: null,
                category_id: null,
                price: null
            },
            token: localStorage.getItem('auth-token')
        }
    },
    methods: {
        async createResource() {
            console.log('this.resource', JSON.stringify(this.resource))
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Authentication-Token': this.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.resource)
            })

            const data = await res.json()
            if (res.ok) {
                alert(data.message)
            } else {
                alert(data.message)
            }

        }
    }
}