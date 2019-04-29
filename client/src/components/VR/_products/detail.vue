<template>
  <b-container fluid class="my-4" id="back">
    <b-row>
      <b-col v-if="loader">
        <img src="../../../assets/loader.gif" alt="" />
      </b-col>
      <b-col v-else sm="4" class="height" id="text">
        <h3>{{ list.productName }}</h3>
        <p>{{ list.desc }}</p>
        <br />
        <span> stock: {{ list.stock }}</span> <br />
        <span
          ><b> ${{ list.price }}</b></span
        >
        <br />
        <b-button
          type="submit"
          variant="primary"
          class="p-2 my-4"
          @click="buy({ id: list._id, price: list.price })"
          >add to cart</b-button
        >
      </b-col>
      <b-col sm="8" class="height my-4">
        <a-scene embedded vr-mode-ui="enabled: false" class="my-4">
          <a-assets>
            <img :id="'texture' + list._id" :src="list.image" alt="" />
          </a-assets>
          <a-cylinder
            :src="'#texture' + list._id"
            position="0.1 1.6 -2.27"
            height="1.9"
            width="23"
            animation="property: rotation; direction: normal;to: 0 360 0; loop: true; dur: 10000; easing:linear;  repeat: indefinite; fill:forwards"
          ></a-cylinder>
        </a-scene>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Eventbus from '../../../event-bus.js';
export default {
  name: 'products',
  data() {
    return {
      loader: false,
      list: null,
    };
  },
  methods: {
    getOneProduct() {
      this.loader = true;
      this.$axios
        .get('/api/user/list/' + this.$route.params.id)
        .then(({ data }) => {
          this.loader = false;
          this.list = data;
        })
        .catch(err => {
          this.loader = false;
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    buy(val) {
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
            Eventbus.$emit('buythis', { data: data, price: val.price });
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
  created() {
    this.getOneProduct();
  },
};
</script>

<style lang="stylus" scoped>
.height
  height 460px
#text
  margin-top 115px
  // margin-bottom 110px
#back
  background: #ADA996;
  background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);
  background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);
</style>
