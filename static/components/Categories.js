export default {
    template: `<div class="card d-flex flex-row m-3 p-2 justify-space-around" v-if="role == 'storemanager'">Categories
    <h4>Name: {{category.name}}</h4> 
    <h4> Description : {{category.description}}</h4>
    <h4>  Quantity: {{category.quantity}}</h4>
    <button class="btn btn-primary" v-if='!category.is_approved' @click="approve(category.id)"> Approve </button>
    </div>`,

    props: ['category'],

    data() {
        return {
          role: localStorage.getItem('role'),
          token: localStorage.getItem('auth-token'),
          error: null,
        }
      },

    methods: {
        async approve(category_id) {
          const res = await fetch(`/activate/category/${category_id}`, {
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
}