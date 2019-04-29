<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header :cart="mycart" :login="islogin" :total="sum" @updated="updte" />
    <!-- <Aframe /> -->
    <router-view />
  </div>
</template>

<script>
import Header from './components/header/navbar.vue';
import Eventbus from './event-bus.js';
// import Aframe from './components/VR/aframe.vue';

export default {
  components: {
    Header,
    // Aframe,
  },
  computed: {
    // compute(e) {
    //   console.log(e);
    // },
  },
  data() {
    return {
      islogin: false,
      tempTotal: [],
      mycart: [],
      sum: 0,
    };
  },
  methods: {
    getTotal() {
      for (let i of this.mycart) {
        this.sum += i.price;
      }
    },
    getCart() {
      const token = localStorage.getItem('token');
      console.log('masuk sini pertama');
      if (token) {
        this.$axios
          .get('/api/cart/getcarts', {
            headers: {
              token: token,
            },
          })
          .then(({ data }) => {
            console.log(data, 'inii dia');
            for (let i of data) {
              if (i.paid == false) {
                this.mycart.push({
                  _id: i._id,
                  item: i.item.productName,
                  amount: i.amount,
                  price: i.item.price,
                });

                this.sum += i.item.price;
                Eventbus.$emit('acart', this.mycart);
              }
            }
            console.log(this.mycart, 'iniii mycart');
            // this.mycart = data;
            // const grouped = Array.from(
            //   data.reduce((m, { key, val }) => m.set(key, (m.get(key) || 0) + val), new Map()),
            //   ([key, val]) => ({ key, val }),
            // );
            // console.log(grouped, 'iniii group');
          })
          .catch(err => {
            console.log(err, 'iniii errror');
            this.$swal.fire({
              type: 'error',
              text: 'errorrr',
            });
          });
      }
    },
    updte() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$axios
          .get('/api/cart/getcart', {
            headers: {
              token,
            },
          })
          .then(({ data }) => {
            this.tempTotal = data;
          })
          .catch(err => {
            console.log(err, 'iniii errror');
            this.$swal.fire({
              type: 'error',
              text: 'errorrr',
            });
          });
      }
    },
    findProduct(val, amount, id) {
      const token = localStorage.getItem('token');
      this.$axios
        .get('/api/cart/getoneproduct/' + val, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          this.mycart.push({
            _id: id,
            item: data.productName,
            amount: amount,
            price: data.price,
          });
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: 'errorrr',
          });
        });
    },
    // delete() {
    //   Eventbus.$on('deletecart', payload => {
    //     this.mycart.splice(payload, 1);
    //   });
    // },
  },
  mounted() {
    // this.getCart();
    // Eventbus.$on('showthiscart', payload => {
    //   this.getCart(payload);
    // });

    Eventbus.$on('addcart', payload => {
      console.log(payload, 'add cart here');
      this.sum += payload.price;
      this.findProduct(payload.data.item, payload.data.amount, payload.data._id);
    });
    Eventbus.$on('deletecart', payload => {
      this.sum -= payload.price;
      this.mycart.splice(payload.index, 1);
    });

    Eventbus.$on('buythis', payload => {
      console.log(payload, 'masuk payloady detail');
      this.sum += payload.price;
      this.findProduct(payload.data.item, payload.data.amount, payload.data._id);
    });

    // Eventbus.$on('carts', payload => {
    //   console.log(payload, 'iniii data this cart');
    // });

    Eventbus.$on('alreadypaid', payload => {
      this.mycart = payload.cart;
      this.sum = payload.total;
    });
    // Eventbus.$emir('logout', { cart: [], total: 0 });
    Eventbus.$on('logout', payload => {
      this.mycart = payload.cart;
      this.sum = payload.total;
    });
  },
  created() {
    this.getCart();
    // this.mycart;

    for (let i of this.mycart) {
      this.sum += i.price;
      console.log(this.sum, 'iniiiiii');
    }
  },
  updated() {
    this.islogin = localStorage.getItem('token') ? false : true;
    // this.getCart();
    // Eventbus.$on('deletecart', payload => {
    //   payload.price -= this.sum;
    // });
  },
};
</script>
<style lang="stylus">

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
