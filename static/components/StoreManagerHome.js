import AdminHome from "./DashboardHome.js"

export default {
    template: `<div>
    <h1>Storemanager Home</h1>
    <AdminHome/>
    </div>`,

    data() {
        return {
            authtoken: localStorage.getItem('auth-token'),
            userRole: localStorage.getItem('role'),
            products: [],
            categories: [],
        }
    },

    components: {
        AdminHome,
    }
}