export default {
  template: `<div class="card d-flex flex-row  m-3 p-2 justify-space-between justify-content-between" v-if="role == 'storemanager'||'admin'">Products
    <h4>Name: {{product.name}}</h4> 
    <h4>  price: {{product.price}}</h4>
    <h4>  Quantity: {{product.quantity}}</h4>
    <div className="">
    <button class="btn btn-primary" v-if='!product.is_approved' @click="approve(product.id)" > Approve </button>
    <button class="btn btn-outline-success" v-if='product.is_approved'  > Approved </button>
    </div>
    </div>`,

  props: ['product'],
  data() {
    return {
      role: localStorage.getItem('role'),
      token: localStorage.getItem('auth-token'),
      error: null,
    }
  },

  methods: {
    async approve(product_id) {
      const res = await fetch(`/activate/product/${product_id}`, {
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