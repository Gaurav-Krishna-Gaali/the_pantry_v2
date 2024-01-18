export default {
    template: `
    <div className="container m-2">
    <h2 class="fw-bolder mb-4 m-2">Categories</h2>
        <div class="row m-2">
            <ul class="ccards">
                <li class="ccard" v-for="category in categories">
                    <img class="rounded-circle shadow-4-strong" alt="avatar2" src="https://subzfresh.com/wp-content/uploads/2022/04/apple_158989157.jpg" />
                    <div>
                        <h3 class="ccard-title">{{ category.name}}</h3>

                    </div>
                    <div class="ccard-link-wrapper">
                        <a class="ccard-link" href="{{ url_for('category_route', category_id= category.id) }}">Shop now</a>
                    </div>
                </li>
            </ul>
        </div>
    
    <section class="py-5 " >
    <div class="container px-4 px-lg-5 mt-2" >
    <h2 class="fw-bolder mb-4">All products</h2>
        <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-xl-4 justify-content-center" >
            <div class="col mb-5"  v-for="product in products" >
                <div class="card h-100" >
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">{{ product.name }}</h5>
                            ₹{{ product.price }}
                        </div>
                    </div>
                    <!-- Product actions-->

                    <div class="alert alert-dismissible alert-danger" v-if="product.quantity == 0">
                        <strong>Oh snap!</strong> <a href="#" class="alert-link">We're are out of stock</a> 
                    </div>
                    
                    <form action="/add" method="post">
                                <input type="hidden" name="code" value={{product.id}} />
                                
                                <div class="d-flex justify-content-evenly align-items-center">
                                    <span>In Stock:</span>
                                    <span>{{ product.quantity }}</span>
                                </div>
                                <div class="d-flex justify-content-evenly align-items-center mb-2">
                                    <span>Quantity</span><span>
                                        <input type="text" name="quantity" value='1' class="form-control text-center me-3"
                                            size="2" /></span>
                                </div>
                                <!-- {{form.submit(class="btn btn-outline-secondary")}} -->
                                <div class="d-flex justify-content-evenly total align-items-center font-weight-bold mt-4">
                                    <span>Price:</span><span> ₹{{ product.price }}</span>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center">
                                        <button type="type" class="btn btn-outline-dark mt-auto">Add to cart</button>
                                    </div>
                                </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<link rel="stylesheet" href='static/css/slider.css' type='text/css'>
</div>

</div>

`,

    data() {
        return {
            role: localStorage.getItem('role'),
            token: localStorage.getItem('auth-token'),
            error: null,
            categories: [],
            products: [],
        }
    },

    methods: {
        async approve(category_id) {
            const res = await fetch(`/activate/category/${category_id}`, {
                headers: {
                    'Authentication-Token': this.token,
                },
            })
            const data = await res.json()
            if (res.ok) {
                alert(data.message)
            }
        },
    },
    async mounted() {
        const res = await fetch('/api/products', {
            headers: {
                'Authentication-Token': this.token
            }
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            this.products = data
        }
        else {
            alert(data.message)
        }

        const categoies_res = await fetch('/api/categories', {
            headers: {
                'Authentication-Token': this.token
            }
        })
        const categories_data = await categoies_res.json()
        console.log(categories_data)
        if (categoies_res.ok) {
            this.categories = categories_data
        }
        else {
            alert(categories_data.message)
        }
    }
}