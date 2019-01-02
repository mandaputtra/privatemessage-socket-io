<template>
  <div>
    <form>
      <input type="text" placeholder="email" v-model="email">
      <input type="text" placeholder="password" v-model="password">
      <button @click="login()">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let data = {
        email: this.email,
        password: this.password
      }
      fetch(this.$baseURL + 'users/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => console.log(response.json()))
      .catch( err => console.log(err))
    }
  }
}
</script>
