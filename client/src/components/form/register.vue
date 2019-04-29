<template lang="html">
  <b-container>
    <b-row id="aturmargin">
      <b-col md="2" offset-md="2" id="aturketengah">
        <div class="clearfix">
          <b-img
            left
            width="350px"
            src="https://images.clipartlogo.com/files/images/39/393084/sign-symbol-signs-symbols-keep-tidy-inside-trash-bin-clean-rubish-garbage_f.jpg"
            alt="Responsive image"
          ></b-img>
        </div>
      </b-col>

      <b-col md="4" offset-md="2">
        <b-form @submit.prevent="goRegister">
          <b-input v-model="username" placeholder="enter your username"></b-input>
          <b-form-invalid-feedback :state="usernameState">
            enter valid username
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="usernameState">
            Looks Good.
          </b-form-valid-feedback>

          <b-input v-model="email" id="feedback-user" placeholder="enter your email"></b-input>
          <b-form-invalid-feedback :state="emailState">
            enter a valid email address
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="emailState">
            Looks Good.
          </b-form-valid-feedback>

          <b-input
            type="password"
            v-model="password"
            id="feedback-user"
            placeholder="enter your password"
          ></b-input>
          <b-form-invalid-feedback :state="passwordState">
            password must be more than 7 lengths
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="passwordState">
            Looks Good.
          </b-form-valid-feedback>

          <!-- <label for="feedback-user">name</label> -->
          <b-input v-model="name" id="feedback-user" placeholder="enter your full name"></b-input>
          <b-form-invalid-feedback :state="nameState">
            enter your full name
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="nameState">
            Looks Good.
          </b-form-valid-feedback>

          <b-form-radio-group
            v-model="selected"
            :options="options"
            name="radio-inline"
          ></b-form-radio-group>

          <b-input v-model="address" placeholder="enter your address"></b-input>
          <b-form-invalid-feedback :state="addressState">
            enter your address
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="addressState">
            Looks Good.
          </b-form-valid-feedback>

          <b-input v-model="phone" placeholder="enter your phone number"></b-input>
          <b-form-invalid-feedback :state="phoneState">
            enter your us phone
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="phoneState">
            Looks Good.
          </b-form-valid-feedback>
          <br />
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Register',
  computed: {
    usernameState() {
      const re = /^[a-zA-Z0-9]+$/;
      return re.test(this.username);
    },
    emailState() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email) ? true : false;
    },
    passwordState() {
      return this.password.length > 6 ? true : false;
    },
    nameState() {
      return this.name.length > 2 ? true : false;
    },
    phoneState() {
      const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      return phone.test(this.phone) ? true : false;
    },
    addressState() {
      return this.address.length > 10 ? true : false;
    },
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phone: '',
      name: '',
      address: '',
      selected: 'Male',
      options: [{ text: 'Male', value: 'Male' }, { text: 'Female', value: 'Female' }],
    };
  },
  methods: {
    goRegister() {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        name: this.name,
        address: this.address,
        gender: this.gender,
        phone: this.phone,
      };
      this.$axios
        .post('/api/user/register', newUser)
        .then(({ data }) => {
          this.$swal.fire({
            type: 'success',
            text: `successfully register`,
          });
          this.$router.replace({ path: 'login' });
        })
        .catch(err => {
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
#text
  text-align left
  // border 1px solid
  margin-top 50px
#aturmargin
  margin-top 8rem
#aturketengah
  margin-top 2rem
</style>
