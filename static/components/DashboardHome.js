import Activation from "./Activation.js"
import Table from "./Table.js"
import Customers from "./Customers.js"

export default {
  template: `<div>
    <h2 class="text-center m-3">Welcome Home,  {{userRole}}</h2>
    <ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation"  v-if="userRole == 'admin'">
    <a class="nav-link active" data-bs-toggle="tab" href="#customer" aria-selected="true" role="tab">Customers</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" data-bs-toggle="tab" href="#category" aria-selected="true" role="tab">Categories</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" data-bs-toggle="tab" href="#product" aria-selected="true" role="tab">Products</a>
  </li>
  <li class="nav-item" role="presentation" v-if="userRole == 'admin'">
    <a class="nav-link" data-bs-toggle="tab" href="#profile" aria-selected="false" role="tab" tabindex="-1">Activation Requests</a>
  </li>
 

</ul>
<div id="myTabContent" class="tab-content">
  <div class="tab-pane fade active show" id="customer" role="tabpanel">
  <Customers flag="customer_flag" />
  </div>
  
  <div class="tab-pane fade" id="category" role="tabpanel">
    <Table flag="category_flag"/>
    </div>
  <div class="tab-pane fade" id="product" role="tabpanel">
    <Table flag="product_flag"/>
    </div>
  <div class="tab-pane fade" id="profile" role="tabpanel">
     <Activation />
    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
  </div>
  <div class="tab-pane fade" id="dropdown1">
    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
  </div>
  <div class="tab-pane fade" id="dropdown2">
    <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
  </div>
</div>
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
    Activation,
    Table,
    Customers,
    // Products,
    // Categories,
  },
}