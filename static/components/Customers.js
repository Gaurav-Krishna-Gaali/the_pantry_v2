export default {
  template: `<div class="container" v-if="flag = 'customer_flag'">
    <h3 class="m-4">Customers </h3>
    <div v-if="error"> {{error}}</div>
    <div class="row" >
    <div class="col-12">
        <div class="card bg-light ms-4 me-4 mb-4">
            <div class="card-header">
                <i class="fa-solid fa-list fa-lg"></i> Customers in Store 
            <div class="card-body">
                <p class="card-text">
                <div class="table-responsive">
                
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Wallet</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="(customer, index)  in allCustomers" :key="index">
                                <td>{{ customer.id }}</td>
                                <td>{{ customer.username || 'No Name' }}</td>
                                <td>{{ customer.email }}</td>
                                <td>{{ customer.roles[0] }}</td>
                                <td>{{ customer.wallet }}</td>

                                <td>

                                <button @click="openViewModal(customer)" class="btn btn-success" v-if='!customer.active' @click="approve(customer.id)">
                                <i class="bi bi-check2-circle"></i>
                                </button>

                                <button @click="openViewModal(customer)" class="btn btn-outline-success me-1" v-if="customer.active">
                                <i class="bi bi-check2-circle"></i>
                                </button>

                                <button @click="openViewModal(customer)" class="btn btn-danger me-1">
                                <i class="bi bi-trash3"></i>
                                </button>

                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                </p>
            </div>
        </div>
        <h5 v-if="allCustomers.length == 0" class="alert alert-primary ms-4 me-4">No Customer Records</h5>
    </div>
</div>
    `,

  props: ['flag'],
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
    const data = await res.json().catch((e) => { })
    if (res.ok) {
      console.log("customer", data)
      this.allCustomers = data
    } else {
      this.error = res.status
    }
  },
}