<template>
  <b-container>
    <b-card-group columns>
      <b-card
        v-for="(order, index) in status"
        :key="index"
        :header="order._id"
        header-tag="header"
        :footer="order.paid == true ? ` already paid` : ''"
        footer-tag="footer"
        title=""
      >
        <b-card-text v-if="order.status === false">confirmation this order</b-card-text>
        <b-card-text v-else-if="order.status === true"> already sent </b-card-text>
        <b-card-text v-if="order.status == false">
          customer address: {{ order.address }}</b-card-text
        >
        <b-card-text v-if="order.status == true">
          <b>
            {{
              order.confirm == false
                ? 'waiting customer to confirm receive item'
                : 'customer receive item'
            }}
          </b></b-card-text
        >

        <b-button variant="warning" @click="gosend(order._id)" v-if="order.status == false">
          accept and send</b-button
        >
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
export default {
  name: 'statusItem',
  data() {
    return {
      status: null,
      loader: false,
    };
  },
  methods: {
    getListStatus() {
      this.$axios
        .get('/api/checkout/list/' + 'true')
        .then(({ data }) => {
          this.status = data;
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.erro,
          });
        });
    },
    gosend(id) {
      this.$axios
        .put('/api/checkout/update/' + id, {
          status: true,
        })
        .then(({ data }) => {
          this.$swal.fire({
            type: 'success',
            text: 'success updated order',
          });
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.erro,
          });
        });
    },
  },

  mounted() {
    this.getListStatus();
  },
  updated() {
    this.getListStatus();
  },
};
</script>

<style lang="stylus" scoped></style>
