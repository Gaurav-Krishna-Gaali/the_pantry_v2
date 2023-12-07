import AdminHome from "./AdminHome.js"
import CustomerHome from "./CustomerHome.js"
import StoreManagerHome from "./StoreManagerHome.js"
import Products from "./Products.js"

export default {
    template: `
        <div>
            <AdminHome v-if="userRole === 'admin'"/>
            <CustomerHome v-else-if="userRole === 'customer'"/>
            <StoreManagerHome v-else-if="userRole === 'storemanager'"/>
            <Products v-for = "(product, index) in products" :key="index" :product="product" />
        </div>
    `,
    data(){
        return{
            authtoken: localStorage.getItem('auth-token'),
            userRole: localStorage.getItem('role'), 
            products: []
        }
    },
    components:{
        AdminHome,
        CustomerHome,
        StoreManagerHome,
        Products
    },
    async mounted(){
        const res = await fetch('/api/products',{
            headers: {
                'Authentication-Token': this.token
            }
        })
        const data = await res.json()
        console.log(data)
        if(res.ok){
            this.products = data
        }
        else{
            alert(data.message)
        }
    }
}