import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Customers from "./components/Customers.js"
import ProductsForm from "./components/ProductsForm.js"
import CategoriesForm from "./components/CategoriesForm.js"
import AdminHome from "./components/DashboardHome.js"
import Register from "./components/Register.js"

const routes = [
    {
        path: '/', component: Home, name: 'Home'
    },
    {
        path: '/login', component: Login, name: 'Login'
    },
    {
        path: '/register', component: Register, name: 'Register'
    },
    {
        path: '/customers', component: Customers
    },
    {
        path: '/add-products', component: ProductsForm
    },
    {
        path: '/add-categories', component: CategoriesForm
    },
    {
        path: '/admin', component: AdminHome
    },
    {
        path: '/storemanager', component: AdminHome
    },


    {
        path: '/demo', component: () => import('./components/Demo.js')
    },

]

export default new VueRouter({
    routes
})