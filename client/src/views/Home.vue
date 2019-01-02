<template>
  <div>
    <form>
      <input type="text" placeholder="email">
      <input type="text" placeholder="passoword">
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
        body: JSON.stringify(data)
      })
    }
  }
}
</script>
