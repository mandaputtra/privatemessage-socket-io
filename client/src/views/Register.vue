<template>
  <div>
    <input type="text" placeholder="email">
    <input type="text" placeholder="last name">
    <input type="text" placeholder="first name">
    <input type="text" placeholder="username">
    <input type="text" placeholder="password">
    <input type="text" placeholder="phone">
    <button @click="register()">Register</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: ''
    }
  },
  methods: {
    register () {
      let data = {
        email: this.email,
        password: this.password,
        first: this.firstname,
        last: this.lastname,
        phone: this.phone
      }
      fetch(this.$baseURL + 'users/register', {
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
