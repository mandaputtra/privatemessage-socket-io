<template>
  <div>
    <input type="text" placeholder="email" v-model="email">
    <input type="text" placeholder="last name" v-model="lastname">
    <input type="text" placeholder="first name" v-model="firstname">
    <input type="text" placeholder="password" v-model="password">
    <input type="text" placeholder="phone" v-model="phone">
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
        .then(response => console.log(response.token))
        .catch(err => console.log('err -', err))
    }
  }
}
</script>
