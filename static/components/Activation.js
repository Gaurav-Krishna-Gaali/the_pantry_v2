import Products from "./Products.js"
import Categories from "./Categories.js"

export default {
    template: `
    <div class="container">
    <h3 class="m-4">Inventory </h3>
<div class="row" >
    <div class="col-12">
        <div class="card bg-light ms-4 me-4 mb-4">
            <div class="card-header">
                <i class="fa-solid fa-list fa-lg"></i> Products  Approvals
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
                            <tr v-for="(product, index) in products" :key="index" v-if="!product.is_approved">
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








<div class="row" >
    <div class="col-12">
        <div class="card bg-light ms-4 me-4 mb-4">
            <div class="card-header">
                <i class="fa-solid fa-list fa-lg"></i> Category Approvals
            </div>
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
                        <tr v-for="(category, index) in categories" :key="index" v-if="!category.is_approved">
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
        <h5 v-if="category == 0" class="alert alert-primary ms-4 me-4">No Student Records</h5>
    </div>
            
        </div>
    `,
    data() {
        return {
            authtoken: localStorage.getItem('auth-token'),
            userRole: localStorage.getItem('role'),
            products: [],
            categories: [],
        }
    },
    components: {
        Products,
        Categories,
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