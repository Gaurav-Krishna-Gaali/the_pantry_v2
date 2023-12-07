export default {
    template: `<div>
    <div v-if="error"> {{error}}</div>
    <div v-for="customer in allCustomers">
    {{customer.email}} 
    <button class="btn btn-primary" v-if='!customer.active' @click="approve(customer.id)"> Approve </button></div>
    </div>`,
    data() {
      return {
        allCustomers: [],
        token: localStorage.getItem('auth-token'),
        error: null,
      }
    },
    methods: {
      async approve(storemanager_id) {
        const res = await fetch(`/activate/storemanager/${storemanager_id}`, {
          headers: {
            'Authentication-Token': this.token,
          },
        })
        const data = await res.json()
        if (res.ok) {
          alert(data.message)
        }
      },
    },
    async mounted() {
      const res = await fetch('/customers', {
        headers: {
          'Authentication-Token': this.token,
        },
      })
      const data = await res.json().catch((e) => {})
      if (res.ok) {
        console.log(data)
        this.allCustomers = data
      } else {
        this.error = res.status
      }
    },
  }