export default {
  template: `
  
  
  <div class="card d-flex flex-row  m-3 p-2 justify-space-between justify-content-between" v-if="role == 'storemanager'||'admin'">Products
    <tr>
                                <td>{{ product.id }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>$ {{ product.price.toFixed(2) }}</td>
                                <td>{{ product.image || 'No Image' }}</td>

                                <td>

                                <button v-if='!product.is_approved' @click="approve(product.id)" class="btn btn-warning me-1">
                                <i class="bi bi-pencil-square"></i>
                                </button>

                                <button @click="openViewModal(product)" class="btn btn-danger me-1">
                                <i class="bi bi-trash3"></i>
                                </button>

                                </td>
    </tr>
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