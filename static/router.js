import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Customers from "./components/Customers.js"
import ProductsForm from "./components/ProductsForm.js"

const routes = [
    {
        path: '/', component: Home, name : 'Home'
    },
    {
        path: '/login', component: Login, name:'Login'
    },
    {
        path: '/customers', component: Customers
    },
    {
        path: '/add-products', component: ProductsForm
    }
]

export default new VueRouter({
    routes
})