export default {
    template: `
    <div className="container">
    <nav class="navbar navbar-expand-lg  sticky-top  bg-white data-bs-theme='light'"
        style="border-bottom: 1px solid grey ; padding: 10px; padding-bottom: 20px;">

        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/static/logo.png" alt="logo" class="border-5" height="30 " style="border:grey;">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto justify-content-between w-100">

                    <form class=" d-flex w-100" action="/search" method="POST">
                        <input class="form-control me-sm-2" type="text" name="query"
                            placeholder="Search for products or categories">
                        <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                    </form>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                            aria-haspopup="true" aria-expanded="false">Profile
                        </a>
                        <div class="dropdown-menu">
                            <div v-if="is_login">
                                <a class="dropdown-item nav-link">My Wallet : ₹ 1000</a>
                                <a class="dropdown-item nav-link" data-bs-toggle="offcanvas" href="#offcanvasExample"
                                    role="button" aria-controls="offcanvasExample">
                                    My Orders
                                </a>
                                <button class="dropdown-item" @click="logout">Logout</button>
                                <button class="dropdown-item" @click="logout">Profile ({{role}})</button>
                            </div>
                            <div v-if="!is_login">
                                <a class="dropdown-item" href="/login">Login</a>
                                <a class="dropdown-item" href="/register">Register</a>
                            </div>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/admin">Admin</a>
                        </div>

                    <li><button type="button" @click="fetchcart"
                            class="btn btn-outline-success d-flex justify-content-center align-items-center"
                            data-bs-toggle="modal" data-bs-target="#myModal">
                            <i class="bi-cart-fill me-1"></i>
                            Cart
                            <span class="badge bg-success text-white ms-1 rounded-pill">
                            {{ cart_items.length }}
                            </span></button>
                    </li>
                    </li>
                </ul>

            </div>
        </div>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">My Orders</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body z-0">

            </div>
        </div>



    </nav>

    <div class="modal Zip" id="myModal" tabindex="-1" aria-labelledby="myModalLabel1" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Your Cart items
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Title</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                            <th scope="col">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(cart_item, index) in cart_items" :key="index" scope="row">
                                <td scope="col">{{cart_item.product.produt_image}}</td>
                                <td scope="col">
                                <h5 class="card-title">
                                {{cart_item.product.product_name}}
                                </h5>
                                </td>
                                <td scope="col">{{cart_item.product.product_quantity}}</td>
                                <td scope="col">{{cart_item.product.product_price}}</td>
                                <td>
                                    <button @click="removeItemFromCart(cart_item.product.product_id)" type="submit" class="btn-close bg-red"></button>
                            </td>
                                <td scope="col">{{cart_item.product.product_price * cart_item.product.product_quantity}}</td>
                            </tr>

                            <tr class="">
                            <th scope="row"></th>
                            <td></td>
                            <td>Grand Total</td>
                            <td>
                                <bold> </bold>
                            </td>
                            <td>₹{{products_total}}</td>
                        </tr>
                        </tbody>
                                

                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                    <a class="btn btn-success" href="#">Place Order</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Only working for 965*549 -->
    <!-- My orders tab -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">My Orders</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">

        </div>
    </div>

</div>

    `,
    data() {
        return {
            role: localStorage.getItem('role'),
            is_login: localStorage.getItem('auth-token'),
            cart_items: [],
        }
    },

    computed: {
        products_total() {
            return this.cart_items.reduce((total, cart_item) => {
                return total + cart_item.product.product_price * cart_item.product.product_quantity;
            }, 0);
        },
    },

    methods: {
        logout() {
            localStorage.removeItem('auth-token')
            localStorage.removeItem('role')
            this.$router.push({ path: '/login' })
        },


        async fetchcart() {
            const res = await fetch('/api/cart', {
                headers: {
                    'Authentication-Token': this.is_login
                }
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                this.cart_items = data
            }
            else {
            }
        },

        async removeItemFromCart(item_id) {
            try {
                const res = await fetch(`/remove_from_cart/${item_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.is_login
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    this.fetchcart();
                    window.location.reload();
                } else {
                }
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        },

        async mounted() {
            await this.fetchcart()
        }
    }
}