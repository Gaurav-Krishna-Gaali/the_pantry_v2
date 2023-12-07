import AdminHome from "./AdminHome.js"
import CustomerHome from "./CustomerHome.js"
import StoreManagerHome from "./StoreManagerHome.js"

export default {
    template: `
        <div>
            <AdminHome v-if="userRole === 'admin'"/>
            <CustomerHome v-else-if="userRole === 'customer'"/>
            <StoreManagerHome v-else-if="userRole === 'storemanager'"/>
        </div>
    `,
    data(){
        return{
            userRole: localStorage.getItem('role'), 
        }
    },
    components:{
        AdminHome,
        CustomerHome,
        StoreManagerHome
    }
}