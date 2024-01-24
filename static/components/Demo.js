export default {
    template: `<div>
    <h1 className="card">Demo</h1>
    <div v-for="(item, index) in categories" :key="index">
      <div v-for="(product, key) in item.product" :key="key">
        {{ key }}: {{ product }}
      </div>
      <hr />
    </div>

    </div>`,

    data() {
        return {
            token: localStorage.getItem('auth-token'),
            categories: [],
        }
    },

    async mounted() {
        const res = await fetch('/api/cart', {
            headers: {
                'Authentication-Token': this.token
            }
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            this.categories = data
        }
        else {
            alert(data.message)
        }
    }
}

