<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs8>
      <v-card>
        <v-card-title class="headline"> Login </v-card-title>
        <v-form class="mx-4 pb-4">
          <v-text-field label="email" v-model="userData.email"></v-text-field>
          <v-text-field type="password" label="password" v-model="userData.password"></v-text-field>
          <v-btn flat block @click="login()"> login </v-btn>
        </v-form>
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
        email: null,
        password: null
      }
    }
  },
  methods: {
    async login() {
      try {
        const login = await this.$axios.$post('http://localhost:3231/v1/users/login', this.userData)
        const token = login.token
        // set token for evety request save to vuex and local-storage
        this.$axios.setToken(token, 'Bearer')
        this.$store.commit('saveUserToken', `Bearer ${token}`)
        localStorage.setItem('user-token', `Bearer ${token}`)
        // save user data
        this.$store.commit('saveUserData', login.user)
        this.$router.push('/')
        // send custom socket-id for saving on server
        this.$socket.emit('join', login.user)
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
