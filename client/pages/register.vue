<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs4>
      <v-card>
        <v-card-text class="title text-xs-center"> login to start chat! 😁 </v-card-text>
        <v-form class="mx-4 pb-4">
          <v-text-field outline label="First Name" v-model="userData.first"></v-text-field>
          <v-text-field outline label="Last Name"  v-model="userData.last"></v-text-field>
          <v-text-field outline label="Email" v-model="userData.email"></v-text-field>
          <v-text-field outline type="Password" label="password" v-model="userData.password"></v-text-field>
          <v-btn depressed color="primary" block @click="register()"> login </v-btn>
        </v-form>
        <v-card-text class="caption text-xs-center">
          Already had an account? please login here <nuxt-link to="/login">📑</nuxt-link>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// jain@mumby.mail
export default {
  layout: 'partial',
  data() {
    return {
      userData: {
        first: null,
        last: null,
        email: null,
        password: null,
      }
    }
  },
  methods: {
    async register() {
      try {
        const register = await this.$axios.$post('http://localhost:3231/v1/users/register', this.userData)
        const token = register.token
        // set token for evety request save to vuex and local-storage
        this.$axios.setToken(token, 'Bearer')
        this.$store.commit('saveUserToken', `Bearer ${token}`)
        localStorage.setItem('user-token', `Bearer ${token}`)
        // save user data
        this.$store.commit('saveUserData', register.user)
        this.$router.push('/')
        // send custom socket-id for saving on server
        this.$socket.emit('join', register.user)
      } catch(err) {
        console.log(err.response)
      }
    }
  }
}
</script>

<style>

</style>
