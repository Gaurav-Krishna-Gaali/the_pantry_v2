import Products from "./Products.js"
import Categories from "./Categories.js"

export default {
    template: `
        <div class="container">
        <h1>hi</h1>
            <Products v-for = "(product, index) in products" :key="index" :product="product" />
            <Categories v-for = "(category, cindex) in categories" :key="'122'+ cindex" :category="category" />
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