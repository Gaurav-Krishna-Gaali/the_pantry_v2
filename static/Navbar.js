export default {
    template: `<div> 
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MAD-2</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="role == 'admin'">
          <router-link class="nav-link" to="/customers">Customers</router-link>
        </li>
        
        <li class="nav-item" v-if="role == 'storemanager'">
          <router-link class="nav-link " to="/add-products"  >Add products</router-link>
        </li>
        <li class="nav-item" v-if="role == 'storemanager'">
          <router-link class="nav-link " to="/add-categories"  >Add categories</router-link>
        </li>
        <li class="nav-item" v-if="is_login">
          <button class="nav-link" @click="logout" href="#">Logout</button>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </div>`,
    data(){
      return {
          role: localStorage.getItem('role'),
          is_login: localStorage.getItem('auth-token')
      }
    }, 
    // computed(){
    //   is_login(){
    //     return localStorage.getItem('auth-token')
    //   }
    // } ,
    methods:{
      logout(){
        localStorage.removeItem('auth-token')
        localStorage.removeItem('role')
        this.$router.push({path: '/login'})
      }
    }
}