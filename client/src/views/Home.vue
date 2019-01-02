<template>
<div class="flex flex-col w-full m-auto max-w-xs h-screen">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
      v-model="email"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email">
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
      v-model="password"
      class="shadow appearance-none border border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
    </div>
    <div class="flex items-center justify-between">
      <button @click="login" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
  <p class="text-center text-grey text-xs">
    ©2018 Chat App. All rights reserved.
  </p>
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
          let userData = {
            email: response.data.user.email,
            name: `${response.data.user.first} ${response.data.user.last}`,
            phone: response.data.user.phone
          }
          localStorage.setItem('user-token', token)
          this.$store.state.token = token
          this.$store.state.credentials = userData
          this.$router.push('/chatlobby')
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('user-token')
        })
    }
  }
}
</script>
