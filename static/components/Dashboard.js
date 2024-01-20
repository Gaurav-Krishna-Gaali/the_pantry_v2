export default {
    template: `
    <div className="container">
    <div class="text-danger">{{error}}</div>
        <div class="d-grid gap-4 col-6 mx-auto m-3 rounded-3">
            <button @click="navigatetoDashboard"  tag="button" class="btn btn-lg btn-primary">
                <span className="">Go to {{userRole}} Dashboard</span>
            </button>
        </div>
    </div>`,

    data() {
        return {
            token: localStorage.getItem('auth-token'),
            userRole: localStorage.getItem('role'),
            error: null,
            router,
        }
    },


    methods: {
        navigatetoDashboard() {
            console.log('first')
            console.log(localStorage.getItem('role'))
            if (localStorage.getItem('role') == 'admin') {
                console.log('one')
                this.$router.push({ path: '/admin' })
            }
            else if (localStorage.getItem('role') == 'storemanager') {
                console.log('seci')
                this.$router.push({ path: '/storemanager' })
            }
        },

    }
}