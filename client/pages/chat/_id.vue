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
      <v-card-text>{{ item }}</v-card-text>
    </v-card>
  </v-flex>
  <v-flex>
    <v-card class="pa-2">
      <v-text-field
        v-model="message"
        @keyup.13="chatIn()"
        small
        class="mx-4"
        label="type here"
        ></v-text-field>
    </v-card>
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
  async mounted() {
    const userid = this.$route.params
    try {
      const userData = await this.$axios.get(`http://localhost:3231/v1/users/${userid.id}`)
      this.chatUser = userData.data.user;
    } catch(err) {
      console.log(err)
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    chatIn() {
      if(this.message) this.chat.push(this.message)
    }
  }
}
</script>

<style>

</style>
