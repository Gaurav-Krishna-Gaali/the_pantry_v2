export default {
    template: `
    


    
<div class="container">
<div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
                <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form class="user" method="post">
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3 mb-sm-0">
                            <input type="text" class="form-control form-control-user" id="exampleFirstName" placeholder="Enter your username">

                            </div>

                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address">
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">

                            <label for="exampleInputPassword">Password</label>
                            <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password">

                            </div>
                            <div class="col-sm-6">
                            
                            <label for="exampleRepeatPassword">Confirm Password</label>
                            <input type="password" class="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password">

                            </div>
                        </div>
                            <div className="text-center justify-content-center">
                                            <label class="form-check-label">
                                    <input type="radio" v-model="cred.userType" value="customer"> Customer
                                </label>
                                <label class="form-check-label ml-3">
                                    <input type="radio" v-model="cred.userType" value="storeManager"> Store Manager
                                </label>
                            </div>
                        <button type="submit" class="btn btn-primary btn-user btn-block">Register</button>
                        <hr>
                        <!-- <a href="index.html" class="btn btn-google btn-user btn-block">
                            <i class="fab fa-google fa-fw"></i> Register with Google
                        </a>
                        <a href="index.html" class="btn btn-facebook btn-user btn-block">
                            <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                        </a> -->
                    </form>
                    <hr>
                    <div class="text-center">
                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div class="text-center">
                        <a class="small" href="login.html">Already have an account? Login!</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>

    `,
    data() {
        return {
            cred: {
                email: null,
                password: null,
            },
            error: null
        }
    },
    methods: {
        async login() {
            console.log(this.cred)
            const res = await fetch('/user-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.cred)
            })
            const data = await res.json()
            if (res.ok) {
                localStorage.setItem('auth-token', data.token)
                localStorage.setItem('role', data.role)
                this.$router.push({ path: '/' })
            }
            else {
                this.error = data.message
            }
        }
    },
    created() {
        // Create a new link element
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';

        // Append the link element to the head of the document
        const sbAdminLinkElement = document.createElement('link');
        sbAdminLinkElement.rel = 'stylesheet';
        sbAdminLinkElement.href = '/static/css/sb-admin-2.min.css';
        document.head.appendChild(linkElement);
        document.head.appendChild(sbAdminLinkElement);
    },
}