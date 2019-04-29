<template>
  <b-container id="font">
    <b-row>
      <b-col>
        <b-col>
          <b-button variant="outline-primary" class="mx-2 my-4" to="/admin/addproduct">
            add product
          </b-button>

          <b-button variant="outline-primary" to="/admin/orders"> list orders </b-button>
        </b-col>
      </b-col>
    </b-row>
    <router-view></router-view>

    <!-- list product -->

    <div class="" v-if="loader">
      <img src="../../assets/loader.gif" alt="" />
    </div>

    <div id="backgound" class="my-4" v-else>
      <b-row cols="6" v-for="(product, index) in products" :key="index" class="tinggi">
        <b-col v-if="index % 2 == 0" :key="product._id">
          <a-scene embedded vr-mode-ui="enabled: false">
            <a-assets>
              <img :id="'texture' + index" :src="product.image" alt="" />
            </a-assets>
            <a-cylinder
              :src="'#texture' + index"
              position="-0.4 2 -4"
              height="2"
              width="2"
              animation="property: rotation; direction: normal;to: 0 360 0; loop: true; dur: 10000; easing:linear;  repeat: indefinite; fill:forwards"
            ></a-cylinder>
          </a-scene>
        </b-col>
        <b-col cols="6" class="caption" v-if="index % 2 == 0">
          <h2>{{ product.productName }}</h2>
          <p>{{ product.desc }}</p>

          <span> stock: {{ product.stock }}</span> <br />
          <span> $ {{ product.price }}</span> <br />
          <b-button
            v-b-modal="'modal' + product._id"
            variant="outline-primary"
            @submit.prevent="editProduct(product._id)"
            class="m-4"
          >
            Edit
          </b-button>
          <b-button variant="danger" @click="deleteProduct($event, product)"> Delete</b-button>
        </b-col>

        <b-col cols="6" class="caption" v-if="index % 2 == 1">
          <h2>{{ product.productName }}</h2>
          <p>{{ product.desc }}</p>
          <span> stock: {{ product.stock }}</span> <br />
          <span> $ {{ product.price }}</span> <br />
          <b-button v-b-modal="'modal' + product._id" variant="outline-primary" class="m-4">
            Edit
          </b-button>
          <b-button variant="danger" @click="deleteProduct($event, product)"> Delete</b-button>
        </b-col>

        <b-col v-if="index % 2 == 1" :key="product._id">
          <a-scene embedded vr-mode-ui="enabled: false" :key="product._id">
            <a-assets>
              <img :id="'texture' + index" :src="product.image" alt="" />
            </a-assets>
            <a-cylinder
              :src="'#texture' + index"
              position="-0.4 2 -4"
              height="2"
              width="2"
              animation="property: rotation; direction: normal;to: 0 360 0; loop: true; dur: 10000; easing:linear;  repeat: indefinite; fill:forwards"
            ></a-cylinder>
          </a-scene>
        </b-col>

        <b-modal
          :id="'modal' + product._id"
          ref="modal"
          :title="product.productName"
          size="lg"
          @ok="handleOk(product._id)"
          :footer-bg-variant="footerBG"
        >
          <b-form @submit.prevent="editProduct">
            <b-form-group label-cols-sm="4" label-cols-lg="3" label="stock">
              <b-form-input
                type="number"
                :value="product.stock"
                @input="inputStock"
                ref="stock"
              ></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="4" label-cols-lg="3" label="price">
              <b-form-input
                type="number"
                :value="product.price"
                @input="inputPrice"
                ref="price"
              ></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="4" label-cols-lg="3" label="description">
              <b-form-textarea
                type="text"
                :value="product.desc"
                @change="inputDescription"
                ref="desc"
              ></b-form-textarea>
            </b-form-group>
          </b-form>
          <b-col sm="4" class="ml-auto">
            <b-img v-bind="mainIMG" :src="product.image" alt="texture image"></b-img>
          </b-col>
        </b-modal>
      </b-row>
    </div>
  </b-container>
</template>
<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      products: null,
      cart: null,
      loader: false,
      tryingadd: false,
      formProduct: {
        productName: '',
        stock: 0,
        desc: '',
        price: 0,
        image: '',
      },
      modal: {
        stock: undefined,
        desc: undefined,
        price: undefined,
      },
      token: localStorage.getItem('token'),
      types: [
        ['text', 'Product Name', 'enter product name', 'productName'],
        ['number', 'Stock', 'enter stock', 'stock'],
        ['text', 'description', 'product description', null],
        ['number', 'Price', 'enter price', 'price'],
      ],
      footerBG: 'secondary',
      mainIMG: {
        width: 75,
        height: 75,
        class: 'm1',
      },
    };
  },
  methods: {
    inputStock(val) {
      this.modal.stock = val;
    },
    inputPrice(val) {
      this.modal.price = val;
    },
    inputDescription(desc) {
      this.modal.desc = desc;
    },
    handleOk(val) {
      let check = true;
      this.$refs.stock.forEach((value, index) => {
        if (
          this.$refs.stock[index].localValue === 0 ||
          this.$refs.desc[index].localValue === '' ||
          this.$refs.price[index].localValue === 0
        ) {
          this.$swal.fire({
            type: 'warning',
            text: 'dont be empty',
          });
          this.$refs.stock[index].localValue = this.$refs.stock[index].value;
          this.$refs.price[index].localValue = this.$refs.price[index].value;
          this.$refs.desc[index].localValue = this.$refs.desc[index].value;
          check = false;
        }
      });
      if (check) {
        if (!this.modal.stock && !this.modal.price && !this.modal.desc) {
          this.$swal.fire({
            type: 'warning',
            text: 'nothing change',
          });
        } else {
          this.editProduct(val);
        }
      }
    },
    async edit(val, list) {},
    croossorigin(src) {
      let img = new Image();
      img.src = src;
      img.crossOrigin = 'anonymous';
    },
    getProducts() {
      this.$axios
        .get('/api/admin/listproducts')
        .then(({ data }) => {
          this.products = data;
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    getCart() {
      this.$axios
        .get('/api/cart/list')
        .then(({ data }) => {
          this.cart = data;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    deleteProduct(event, val) {
      this.loader = true;
      this.$axios
        .delete('/api/admin/delete/' + val._id, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.$nextTick(() => {
            this.getProducts();
          });
          this.$swal.fire({
            type: 'success',
            text: `success to deleted`,
          });
          this.loader = false;
        })
        .catch(err => {
          this.loader = false;
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    editProduct(id) {
      const obj = this.modal;
      Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) {
          delete obj[key];
        }
      });

      this.$axios
        .put('/api/admin/update/' + id, obj, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.getProducts();
          this.$swal.fire({
            type: 'success',
            text: 'updated',
          });
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
          this.modal.desc = undefined;
          this.modal.stock = undefined;
          this.modal.price = undefined;
        });
    },
    addProduct() {
      let form = new FormData();
      form.append('nama', 'hoooo');
      form.append('productName', this.formProduct.productName);
      form.append('stock', this.formProduct.stock);
      form.append('price', this.formProduct.price);
      form.append('desc', this.formProduct.desc);
      form.append('image', this.formProduct.image);
      this.tryingadd = true;
      this.$axios
        .post('/api/admin/addproduct', form)
        .then(({ data }) => {
          this.tryingadd = false;
          this.getProducts();
          this.$swal.fire({
            type: 'success',
            text: `success to add product`,
          });
          this.formProduct.productName = '';
          this.formProduct.stock = '';
          this.formProduct.price = '';
          this.formProduct.desc = '';
          this.formProduct.image = '';
        })
        .catch(err => {
          this.tryingadd = false;
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
  },
  created() {
    this.getProducts();
    // this.getCart();
  },
  updated() {
    this.$nextTick(() => {
      this.getProducts();
    });
  },
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One');
@import url('https://fonts.googleapis.com/css?family=Karla');

#font
  font-family 'Karla', sans-serif

#formaddproduct
  padding 60px
  margin 20px 100px
  background #E7E7E7

h2
  font-family 'Concert One', cursive

.tinggi
  height 400px

.caption
  margin-top 80px

#backgound
  background: #ADA996;
  background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);
  background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);
</style>
