<template>
<div class="flex flex-col w-full m-auto max-w-xs h-screen">
  <router-link to="/chatlobby">back to chat lobby</router-link>
  <h2>Chat With : {{ userData.first + ' ' + userData.last }}</h2>

  <div v-for="(item, index) in chat" class="mt-5" :key="index">
    <span><b>{{ item.user }}</b> : {{ item.message }}</span>
  </div>

  <div class="mb-10 mt-10">
      <input
      @keyup.enter="sendChat()"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none" type="text" placeholder="Chat here" v-model="message">
  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      message: '',
      userData: '',
      chat: []
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
  },
  methods: {
    sendChat () {
      let message = this.message
      let chat = this.chat
      let user = this.$store.getters.userName
      this.$socket.emit('chat', { user, message })
      chat.push({ user, message })

      // make chat input clear again
      this.message = null
    }
  }
}
</script>
