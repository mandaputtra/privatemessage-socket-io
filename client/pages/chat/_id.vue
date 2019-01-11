<template>
<v-container grid-list-xl>
<v-layout column wrap>
  <v-flex>
    <v-card>
      <v-card-text> Chat With : {{ chatUser.email }}</v-card-text>
      <v-card-actions>
        <v-btn small depressed block @click="back()">Go Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
  <v-flex>
    <v-card v-for="(item, index) in chat" class="mb-2" :key="index">
      <v-card-text>{{ item.text }}</v-card-text>
    </v-card>
  </v-flex>
  <v-flex>
    <v-footer color="transparent" fixed>
      <v-text-field
        v-model="message"
        @keyup.13="chatIn()"
        outline
        class="mx-4"
        label="type here"
        ></v-text-field>
    </v-footer>
  </v-flex>
</v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      chatUser: '',
      chat: [],
      message: ''
    }
  },
  sockets: {
    chat(data) {
      let chat = {
        text: data
      }
      this.chat.push(chat)
    }
  },
  async mounted() {
    const userid = this.$route.params.id
    const chatuser = this.$route.query.from
    try {
      const userData = await this.$axios.get(`http://localhost:3231/v1/users/${userid}`)
      this.chatUser = userData.data.user;
    } catch(err) {
      console.log(err)
    }
    // Try fetch message
    try {
      const chatData = await this.$axios.get(`http://localhost:3231/v1/chat/${userid}?f=${chatuser}`)
      this.chat = chatData.data.data.message
    } catch (err) {
      console.log('No message before')
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    chatIn() {
      if(this.message) {
        let data = this.chatUser;
        data['message'] = this.message
        data['from'] = this.$store.state.userData._id
        let message = {
          text: this.message
        }
        this.chat.push(message)
        this.$socket.emit('chat', data)
        this.message = '';
      }
    }
  }
}
</script>

<style>

</style>
