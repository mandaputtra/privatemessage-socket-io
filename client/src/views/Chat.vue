<template>
<div>
  <h2>Chat With : {{ userData.first + ' ' + userData.last }}</h2>

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
        console.log(response)
        this.userData = response.data.user
      })
      .catch(err => console.log(err))
  }
}
</script>


