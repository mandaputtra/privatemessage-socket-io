<template>
<div class="flex flex-col w-full m-auto max-w-xs h-screen">
  <h2>Chat With : {{ userData.first + ' ' + userData.last }}</h2>
  <div class="mb-4 mt-4">
      <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none" type="text" placeholder="Chat here">
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userData: ''
    }
  },
  mounted () {
    axios.get(this.$baseURL + 'users/' + this.$route.params.id, {
      headers: {
        'Authorization': this.$store.state.token
      }
    })
      .then(response => {
        this.userData = response.data.user
      })
      .catch(err => console.log(err))
  }
}
</script>


