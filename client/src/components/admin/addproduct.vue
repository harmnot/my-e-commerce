<template lang="html">
  <b-form id="formaddproduct" @submit.prevent="addProduct">
    <b-row class="my-4" v-for="(type, index) in types" :key="index">
      <b-col sm="3">
        <label :for="`type-${type[0]}`"> {{ type[1] }}:</label>
      </b-col>
      <b-col v-if="type[3] == 'stock'" sm="2">
        <b-form-input
          :id="`type-${index}`"
          :type="type[0]"
          :placeholder="type[2]"
          min="1"
          v-model="formProduct.stock"
        ></b-form-input>
      </b-col>
      <b-col v-else-if="type[3] == 'price'" sm="2">
        <b-form-input
          :id="`type-${index}`"
          :type="type[0]"
          :placeholder="type[2]"
          min="1"
          v-model="formProduct.price"
        ></b-form-input>
      </b-col>
      <b-col v-else-if="type[1] == 'description'">
        <b-form-textarea :placeholder="type[2]" v-model="formProduct.desc"> </b-form-textarea>
        <b-form-file
          v-model="formProduct.image"
          class="mt-3"
          placeholder="upload texture product here"
        ></b-form-file>
      </b-col>
      <b-col v-else sm="9">
        <b-form-input
          :id="`type-${index}`"
          :type="type[0]"
          :placeholder="type[2]"
          v-model="formProduct.productName"
        ></b-form-input>
      </b-col>
    </b-row>
    <span v-if="tryingadd"> trying add....... </span>
    <b-button type="submit" variant="outline-primary" class="m-4" v-else> add product</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'addproduct',
  data() {
    return {
      types: [
        ['text', 'Product Name', 'enter product name', 'productName'],
        ['number', 'Stock', 'enter stock', 'stock'],
        ['text', 'description', 'product description', null],
        ['number', 'Price', 'enter price', 'price'],
      ],
      loader: false,
      tryingadd: false,
      formProduct: {
        productName: '',
        stock: 0,
        desc: '',
        price: 0,
        image: '',
      },
    };
  },
  methods: {
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
};
</script>

<style lang="stylus" scoped>
#formaddproduct
  padding 60px
  margin 20px 100px
  background #E7E7E7

h2
  font-family 'Concert One', cursive
</style>
