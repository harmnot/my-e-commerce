<template lang="html">
  <b-container>
    <b-row id="aturmargin">
      <b-col lg="6" id="aturketengah">
        <a-scene embedded vr-mode-ui="enabled: false">
          <a-assets>
            <img id="texture1" src="../../assets/colorful-texture-pattern.jpeg" alt="" />
            <img id="texture2" src="../../assets/texture-3445749_960_720.jpg" alt="" />
            <img
              id="texture3"
              src="../../assets/d50om08-a1e37851-f8f9-4d20-9b23-ca965e0f0ee6.jpg"
              alt=""
            />
          </a-assets>
          <a-cylinder
            position="5 2 -13"
            src="#texture1"
            segments-radial="10"
            height="3"
            animation="property: rotation; direction: normal;to: 0 360 0; loop: true; dur: 10000; easing:linear;  repeat: indefinite; fill:forwards"
          ></a-cylinder>

          <a-cylinder
            position="-1.3 2 -4"
            src="#texture2"
            height="2.6"
            animation="property: rotation; direction: normal;to: 0 360 0; loop: true; dur: 10000; easing:linear;  repeat: indefinite; fill:forwards"
          ></a-cylinder>
          <a-cylinder position="1 2 -7" src="#texture3" height="2.6"></a-cylinder>
        </a-scene>
      </b-col>

      <b-col sm="4" offset-md="2" id="aturmargin2">
        <b-form @submit.prevent="goLogin">
          <b-input v-model="input" placeholder="enter your username/email"></b-input>
          <b-form-invalid-feedback :state="inputState">
            enter valid username/email
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="inputState">
            Looks Good.
          </b-form-valid-feedback>

          <b-input type="password" v-model="password" placeholder="enter your password"></b-input>
          <b-form-invalid-feedback :state="passwordState">
            password must be more than 7 lengths
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="passwordState">
            Looks Good.
          </b-form-valid-feedback>

          <br />
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Eventbus from '../../event-bus.js';
export default {
  name: 'Login',
  computed: {
    // usernameState() {
    //   const re = /^[a-zA-Z0-9]+$/;
    //   return re.test(this.username);
    // },
    // emailState() {
    //   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return re.test(this.email) ? true : false;
    // },
    inputState() {
      return this.input.length > 3 ? true : false;
    },
    passwordState() {
      return this.password.length > 6 ? true : false;
    },
  },
  data() {
    return {
      input: '',
      password: '',
    };
  },
  methods: {
    goLogin() {
      if (!this.input || !this.password) {
        this.$swal.fire({
          type: 'error',
          text: `please enter your email/username and password`,
        });
      } else {
        const client = {
          input: this.input,
          password: this.password,
        };
        this.$axios
          .post('/api/user/login', client)
          .then(({ data }) => {
            Eventbus.$emit('loggined', false);
            Eventbus.$emit('showthiscart', data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.tryingLogin.role);
            this.$swal.fire({
              type: 'success',
              text: `successfully login`,
            });
            if (data.tryingLogin.role === 'admin') {
              this.$router.replace({ path: '/admin' });
            } else {
              this.$router.push({ path: '/' });
            }
          })
          .catch(err => {
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
#text
  text-align left
  margin-top 50px
#aturmargin
  margin-top 8rem
#aturketengah
  text-align center
  height 480px
#aturmargin2
  margin-top 100px
  // margin-right 2px
</style>
