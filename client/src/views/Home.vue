<template>
  <div>
      <input type="text" placeholder="email" v-model="email">
      <input type="text" placeholder="password" v-model="password">
      <button @click="login()">Login</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post(this.$baseURL + 'users/login', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          let token = response.data.token
          localStorage.setItem('user-token', token)
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('user-token')
        })
    }
  }
}
</script>
