import AdminHome from "./AdminHome.js"
import CustomerHome from "./CustomerHome.js"
import StoreManagerHome from "./StoreManagerHome.js"
import Products from "./Products.js"
import Categories from "./Categories.js"
import Shop from "./Shop.js"
import Dashboard from "./Dashboard.js"

export default {
    template: `
        <div class="container">
        <div className=""></div>
            <Dashboard/>
            <AdminHome v-if="userRole === 'admin'"/>
            <CustomerHome v-else-if="userRole === 'customer'"/>
            <StoreManagerHome v-else-if="userRole === 'storemanager'"/>
            <Products v-for = "(product, index) in products" :key="index" :product="product" />
            <Categories v-for = "(category, cindex) in categories" :key="'122'+ cindex" :category="category" />
           <Shop  />
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
        Dashboard,
        AdminHome,
        CustomerHome,
        StoreManagerHome,
        Products,
        Categories,
        Shop
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