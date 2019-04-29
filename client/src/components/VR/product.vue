<template lang="html">
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
</template>

<script>
export default {
  name: 'producthere',
  props: ['list'],
  methods: {
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
};
</script>

<style lang="css" scoped></style>
