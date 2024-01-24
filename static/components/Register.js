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
                        <div class="text-danger"> {{error}} </div>
                    </div>
                    <form class="user" @submit.prevent="loginRoute">
                        <div class="form-group row">
                            <div class="col-sm-12 mb-3 mb-sm-0">
                            <input type="text" class="form-control form-control-user" id="exampleFirstName" placeholder="Enter your username" v-model="cred.username">

                            </div>

                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" v-model="cred.email">
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">

                            <label for="exampleInputPassword">Password</label>
                            <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" v-model="cred.password">

                            </div>
                            <div class="col-sm-6">
                            
                            <label for="exampleRepeatPassword">Confirm Password</label>
                            <input type="password" class="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" v-model="cred.confirmPassword">

                            </div>
                        </div>
                            <div className="text-center justify-content-center">
                                            <label class="form-check-label">
                                    <input type="radio" v-model="cred.role" value="customer"> Customer
                                </label>
                                <label class="form-check-label ml-3">
                                    <input type="radio" v-model="cred.role" value="storemanager"> Store Manager
                                </label>
                            </div>
                        <button @click="register" class="btn btn-primary btn-user btn-block">Register</button>
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
                username: '',
                email: null,
                password: null,
                confirmPassword: '',
                role: '',
            },
            error: null,
        }
    },
    computed: {
        passwordsMatch() {
            return this.cred.password === this.cred.confirmPassword;
        },
    },
    methods: {
        async register() {
            console.log('this.cred', this.cred)
            if (!this.passwordsMatch) {
                this.error = 'Passwords do not match.';
                return;
            }

            const res = await fetch('/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.cred.username,
                    email: this.cred.email,
                    password: this.cred.password,
                    role: this.cred.role,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                // Handle successful registration
                console.log('Registration successful');
                // localStorage.setItem('auth-token', data.token)
                // localStorage.setItem('role', data.role)
                // this.$router.push({ path: '/login' })
            } else {
                this.error = data.message;
            }
        },
        loginRoute() {
            this.$router.push({ path: '/login' })
            window.location.reload()
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