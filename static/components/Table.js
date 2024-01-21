export default {
    template: `
<div class="container">
    <h3 class="m-4">Inventory </h3>
<div class="row" v-if="flag == 'product_flag'">
    <div class="col-12">
        <div class="card bg-light ms-4 me-4 mb-4">
            <div class="card-header">
                <i class="fa-solid fa-list fa-lg"></i> Products in Store
            </div>
            <div class="card-body">
                <p class="card-text">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image Url</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="(product, index) in products" :key="index">
                                <td>{{ product.id }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>$ {{ product.price.toFixed(2) }}</td>
                                <td>{{ product.image || 'No Image' }}</td>

                                <td>

                                <button @click="openViewModal(product)" class="btn btn-warning me-1">
                                <i class="bi bi-pencil-square"></i>
                                </button>

                                <button @click="openViewModal(product)" class="btn btn-danger me-1">
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
        <h5 v-if="products.length == 0" class="alert alert-primary ms-4 me-4">No Student Records</h5>
    </div>
</div>





<div class="row" v-else-if="flag == 'category_flag'">
    <div class="col-12">
        <div class="card bg-light ms-4 me-4 mb-4">
            <div class="card-header">
                <i class="fa-solid fa-list fa-lg"></i> Categories in Store 
            <div class="card-body">
                <p class="card-text">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image Url</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="(category, index) in categories" :key="index">
                                <td>{{ category.id }}</td>
                                <td>{{ category.name }}</td>
                                <td>{{ category.description }}</td>
                                <td>{{ category.image || 'No Image' }}</td>

                                <td>

                                <button @click="openViewModal(category)" class="btn btn-warning me-1">
                                <i class="bi bi-pencil-square"></i>
                                </button>

                                <button @click="openViewModal(category)" class="btn btn-danger me-1">
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
        <h5 v-if="products.length == 0" class="alert alert-primary ms-4 me-4">No Student Records</h5>
    </div>
</div>








    <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModal1Label">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
          <h4 class="modal-title" id="myModal1Label">Modal title</h4>
          <button type="button" @click="closeModal(product)" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body" >

          <form   @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="editName">Name:</label>
            <input v-model="editedProduct.name" type="text" class="form-control" id="editName">
          </div>
          <div class="form-group">
            <label for="editQuantity">Quantity:</label>
            <input v-model="editedProduct.quantity" type="number" class="form-control" id="editQuantity">
          </div>
          <div class="form-group">
            <label for="editPrice">Price:</label>
            <input v-model="editedProduct.price" type="number" step="0.01" class="form-control" id="editPrice">
          </div>
          <div class="form-group">
            <label for="editPrice">Image:</label>
            <input v-model="editedProduct.image" type="text" class="form-control" id="editImage">
          </div>
          
        </form>
          </div>
          <div class="modal-footer">
            <button type="button" @click="closeModal(product)" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>    


    </>`,

    props: ['flag'],

    data() {
        return {
            authtoken: localStorage.getItem('auth-token'),
            userRole: localStorage.getItem('role'),
            products: [],
            categories: [],
            showModal: false,
            model_product: null,
            model_product: null,
            modal: null,
            editedProduct: {
                id: null,
                name: '',
                quantity: 0,
                price: 0.0,
                image: '',
            },
        }
    },

    methods: {
        openViewModal(product) {
            this.model_product = product;
            this.editedProduct = { ...product };
            console.log(this.model_product)
            console.log("edited: ", this.editProduct)
            $('#myModal1').modal('show');
        },
        closeModal() {
            $('#myModal1').modal('hide');
        },

        editProduct(product) {
            this.modal = 'edit';
            this.product = product;
            $('#product').modal('show');
        },
    },


    async mounted() {
        const res = await fetch('/api/products', {
            headers: {
                'Authentication-Token': this.authtoken
            }
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            this.products = data
        }
        else {
            alert(data.message)
        }

        const categoies_res = await fetch('/api/categories', {
            headers: {
                'Authentication-Token': this.authtoken
            }
        })
        const categories_data = await categoies_res.json()
        console.log(categories_data)
        if (categoies_res.ok) {
            this.categories = categories_data
        }
        else {
            alert(categories_data.message)
        }


    }
}
