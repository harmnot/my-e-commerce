<template lang="html">
  <div class="">
    <b-nav class="d-flex justify-content-around" id="colorNav">
      <b-nav-item class="p-2" to="/" id="font" @click="openCart"> AlgoComrce </b-nav-item>

      <div class="d-flex flex-row">
        <b-nav-item class="p-2" to="/shop" @click="openCart"> shop </b-nav-item>
        <b-nav-item class="p-2"> about </b-nav-item>
      </div>

      <b-nav-item class="p-2" @click="showmodal" v-if="isCheckout">
        <i class="fa fa-cart-arrow-down"></i>
      </b-nav-item>
      <!-- modal -->

      <b-modal
        ref="my-modal"
        :title="cart.length === 0 ? `your cart is empty` : `${cart.length} items`"
        size="lg"
      >
        <div class="" v-if="cart.length >= 1">
          <div class="" v-if="loader">
            <b-container v-for="(carts, i) in cart" :key="carts._id">
              <b-row class="my-1" :key="carts._id">
                <b-col sm="6">
                  <label for="input-small"> {{ carts.item }}</label>
                </b-col>
                <b-col sm="2">
                  <b-form-input type="number" min="1" :value="carts.amount" disabled></b-form-input>
                </b-col>
                <b-col sm="2">
                  <b-button
                    variant="danger"
                    @click="deleteCart({ id: carts._id, index: i, price: carts.price })"
                  >
                    delete
                  </b-button>
                </b-col>
              </b-row>
            </b-container>

            <b-col sm="6"> shipping: ${{ cart.length * 8 }}<br /> </b-col>
            <b-col sm="6 my-2">
              <b>total: ${{ total + cart.length * 8 }}</b>
            </b-col>
            <b-button variant="warning" v-if="checkOUT">
              goingcheckout.....
            </b-button>
            <b-button variant="warning" @click="gocheckout" v-else>
              checkout
            </b-button>
          </div>
          <div v-else>
            <h2>loading.....</h2>
          </div>
        </div>
        <h3 v-else>go shop now :)</h3>
        <div slot="modal-footer" class="w-100">
          <label> NOTE: each bin weights <b>15lbs</b>, all ship cost <b>$8</b></label>
        </div>
      </b-modal>

      <div class="d-flex flex-row" v-if="isLogin || login">
        <b-nav-item class="p-2" to="/login"> Login</b-nav-item>
        <b-nav-item class="p-2" to="/register"> Register </b-nav-item>
      </div>
      <div class="d-flex flex-row" v-else>
        <b-nav-item class="p-2" @click="logout"> Logout</b-nav-item>
        <b-nav-item class="p-2" v-if="status.length >= 1" @click="showstatus">
          history order</b-nav-item
        >
      </div>

      <b-modal ref="my-status" title="status order" size="lg">
        <b-container v-for="(sent, index) in status" :key="index">
          <b-row class="my-2 p-1" :key="index">
            <b-col sm="6">
              <label for="input-small"> <b>Orders status:</b> {{ sent._id }}</label>
            </b-col>
            <b-col sm="2"> got item ?</b-col>
            <b-col sm="2">
              <b-button variant="outline-success" v-if="sent.confirm == true"> received</b-button>
              <div class="" v-else>
                <b-button
                  variant="outline-warning"
                  @click="gotItem(sent._id)"
                  v-if="sent.confirm === false && sent.status === true"
                >
                  confirm
                </b-button>
                <b-button
                  variant="outline-info"
                  v-else-if="sent.status === false && sent.confirm === false"
                >
                  processing
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
    </b-nav>
  </div>
</template>

<script>
import Eventbus from '../../event-bus.js';
export default {
  name: 'Header',
  props: {
    cart: Array,
    total: Number,
    login: Boolean,
    updated: Function,
  },
  data() {
    return {
      loader: true,
      isLogin: true,
      isCheckout: true,
      checkOUT: false,
      status: [],
      shipping: 0,
    };
  },
  methods: {
    showmodal() {
      this.$refs['my-modal'].show();
    },
    logout() {
      this.isLogin = true;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      Eventbus.$emit('logout', { cart: [], total: 0 });
      this.$router.replace({ path: '/' });
    },
    deleteCart(val) {
      this.loader = false;
      this.$axios
        .delete('/api/cart/delete/' + val.id, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          Eventbus.$emit('deletecart', { index: val.index, price: val.price });
          this.loader = true;
        })
        .catch(err => {
          this.loader = true;
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    gocheckout() {
      let arr = [];
      for (let i of this.cart) {
        arr.push(i._id);
      }
      this.checkOUT = true;
      this.$axios
        .post(
          '/api/checkout/add',
          {
            total: this.total,
            orders: arr,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({ data }) => {
          this.checkOUT = false;
          this.$refs['my-modal'].hide();
          this.isCheckout = false;

          this.$router.push('/checkout');
        })
        .catch(err => {
          this.checkOUT = false;

          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });

      // Eventbus.$emit('checkout', {
      //   total: this.total,
      //   item: this.cart,
      // });
    },
    checkStatus() {
      this.$axios
        .get('/api/checkout/listuser/' + 'true', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.status = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    showstatus() {
      this.$refs['my-status'].show();
    },
    gotItem(id) {
      this.$axios
        .put(
          '/api/checkout/update/' + id,
          {
            confirm: true,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({ data }) => {
          this.$swal.fire({
            type: 'success',
            text: 'got item :)',
          });
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    openCart() {
      this.isCheckout = true;
    },
  },
  mounted() {
    Eventbus.$on('loggined', wishuseVuex => {
      this.isLogin = wishuseVuex;
    });
    Eventbus.$emit('carts', this.cart);
    Eventbus.$on('showcart', payload => {
      this.isCheckout = payload;
    });

    if (localStorage.getItem('token')) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    Eventbus.$on('thisLIST', payload => {
      this.cart = payload;
    });
    this.checkStatus();
  },
  beforeUpdate() {
    this.checkStatus();
  },
  updated() {},
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Bangers');

#colorNav li a
  color #2D64CC
#font
  font-family 'Bangers', cursive;
  font-size 20px
</style>
