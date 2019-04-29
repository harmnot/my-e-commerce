<template lang="html">
  <b-container id="back">
    <div class="" v-if="items == null">
      <h3>Hello :)</h3>
    </div>
    <div class="he" v-else-if="checkpaid.paid === false">
      <b-row v-for="(item, index) in items" :key="index" class="p-2">
        <b-col>
          <h5>{{ item.productName }}</h5>
        </b-col>
        <b-col class="border">
          <span> {{ amount[index].amount }}</span>
        </b-col>
      </b-row>
      <b-row class="p-2">
        <b-col>
          <label for="address"> Address </label>
        </b-col>
        <b-col>
          <b-form-textarea placeholder="enter address" v-model="address" required>
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="p-2">
        <b-col>
          <h3><i> Total Cost</i></h3>
        </b-col>
        <b-col>
          <h4>${{ total2 + items.length * 8 }}</h4>
          <b-col class="my-4">
            <b-button variant="success" @click="updated">Pay</b-button>
          </b-col>
        </b-col>
      </b-row>
    </div>

    <div class="" v-else>
      <h3>Hello there :)</h3>
    </div>
  </b-container>
</template>

<script>
import Eventbus from '../event-bus.js';
export default {
  name: 'checkout',
  data() {
    return {
      total: 0,
      items: null,
      total2: 0,
      amount: null,
      address: '',
      id: '',
      checkpaid: null,
      itemsID: [],
    };
  },
  methods: {
    getAll() {
      this.$axios
        .get('/api/checkout/alllist', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          let obj = [];

          for (let i of data) {
            if (i.status === false) {
              obj.push(i);
            }
          }

          // obj transaction
          this.checkpaid = obj[0];

          // id trancaition number
          this.id = obj[0]._id;

          // total
          this.total2 = obj[0].total;

          // orderan
          const list = obj[0].order;

          // arr for items
          const arr = [];

          this.amount = list;

          for (let j of list) {
            arr.push(j.item);
          }

          //  items go here
          this.items = arr;

          for (let getidorderan of list) {
            this.itemsID.push(getidorderan._id);
          }
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.errror,
          });
        });
    },
    updated() {
      if (this.address.length <= 10 || !this.address) {
        this.$swal.fire({
          type: 'error',
          text: 'please enter valid address',
        });
      } else {
        const address = {
          address: this.address,
          paid: 'true',
        };
        this.$axios
          .put('/api/checkout/update/' + this.id, address, {
            headers: {
              token: localStorage.getItem('token'),
            },
          })
          .then(({ data }) => {
            Eventbus.$emit('alreadypaid', { cart: [], total: 0 });
            Eventbus.$emit('showcart', true);

            this.$swal.fire({
              type: 'success',
              text: 'successfully to pay, please wait the items arrive soon',
            });
            this.$router.push('/');
            this.updatedPaid();
          })
          .catch(err => {
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      }
    },
    updatedPaid() {
      const items = {
        items: this.itemsID,
      };
      this.$axios
        .put('/api/cart/updatepaid', items, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          console.log(data, 'updated success for carts');
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style lang="stylus" scoped>
@import url('https://rsms.me/inter/inter.css');
#back
  background: #C9D6FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  font-style 'Inter', sans-serif
.border
  border 1px solid
  display inline-block
  margin  auto 0
.he
  margin-top 7rem
</style>
