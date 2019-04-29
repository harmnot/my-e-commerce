<template lang="html">
  <b-container fluid>
    <!-- <router-view /> -->
    <b-row id="main">
      <b-col>
        <div id="caption">
          <h3>shop what you want</h3>
        </div>
        <div id="caption2">
          <h3>we are different</h3>
        </div>
        <div id="caption3">
          <h3>make your house <br />be awesome</h3>
        </div>
        <div id="caption4">
          <h3>unique and elegant</h3>
        </div>
      </b-col>
    </b-row>

    <h1 class="my-4 p-4">choose your texture</h1>
    <b-container class="my-4">
      <b-row>
        <b-col sm="4" v-for="(product, index) in list" :key="product._id">
          <b-card>
            <div class="wrapper">
              <b-img :src="product.image"></b-img>
            </div>
          </b-card>
          <b-col>
            <div class="thiscaption my-4 p-2">
              <!-- <b-nav-item class="p-2" > Login</b-nav-item> -->
              <b-link :to="`/product/${product._id}`">
                <h4>{{ product.productName }}</h4>
              </b-link>

              <span>
                {{
                  product.desc
                    .split(' ')
                    .slice(0, 8)
                    .join(' ')
                }}...</span
              >
              <br />

              <span>
                <b>${{ product.price }} </b>
              </span>
              <br />
              <b-button
                type="submit"
                variant="primary"
                class="p-2 my-4"
                @click="addcart({ id: product._id, price: product.price })"
                >add to cart</b-button
              >
            </div>
          </b-col>
        </b-col>
      </b-row>
    </b-container>

    <!-- <ProductHere :list="list" /> -->
  </b-container>
</template>

<script>
import Eventbus from '../../event-bus.js';
export default {
  name: 'shop',
  data() {
    return {
      list: null,
      mainpic: { width: 75, height: 100, class: 'm1' },
    };
  },
  methods: {
    getProducts() {
      this.$axios
        .get('/api/admin/listproducts')
        .then(({ data }) => {
          this.list = data;
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    addcart(val) {
      if (localStorage.getItem('token')) {
        const token = {
          token: localStorage.getItem('token'),
        };
        const obj = {
          item: val.id,
          amount: 1,
        };
        this.$axios
          .post(
            '/api/cart/addcart',
            {
              item: val.id,
              amount: 1,
            },
            {
              headers: token,
            },
          )
          .then(({ data }) => {
            Eventbus.$emit('addcart', { data: data, price: val.price });
            this.$swal.fire({
              type: 'success',
              text: `add to cart`,
            });
          })
          .catch(err => {
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      } else {
        this.$router.replace({ path: '/login' });
      }
    },
  },
  mounted() {
    if (localStorage.getItem('role') == 'admin') {
      this.$router.push('/');
    }
  },
  created() {
    this.getProducts();
  },
  updated() {},
};
</script>

<style lang="stylus" scoped>

@import url('https://rsms.me/inter/inter.css');
dfont = 'Inter', sans-serif

#main
  font-family dfont
  color #fff
  background: #141E30;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
#caption
  width 150px
  height 80px
  -ms-transform rotate(10deg)
  -webkit-transform rotate(10deg)
  transform rotate(10deg)
h4
  font-size 18px
#caption2
  float right
  width 130px
  height 80px
  -ms-transform rotate(10deg)
  -webkit-transform rotate(20deg)
  transform rotate(-40deg)
#caption3
  height 30px
  -ms-transform rotate(30deg)
  -webkit-transform rotate(20deg)
  transform rotate(-8deg)
#caption4
  position absolute
  left 60%
  bottom: 40%
  width 100px
  height 90px
  -ms-transform rotate(30deg)
  -webkit-transform rotate(80deg)
  transform rotate(80deg)
.wrapper
  position relative
  overflow hidden

.wrapper:after
  content ''
  display block
  padding-top 100%

.wrapper img
  width auto
  height 100%
  max-width none
  position absolute
  left 50%
  top 0
  transform translateX(-50%)
  text-align: center;
.thiscaption
  // border 1px solid
  background-color #F5F4F3
  // height 200px
</style>
