<template>
  <v-container grid-list-xl>
    <v-layout row align-center wrap>
      <v-flex class="mb-2" xs12>
        <v-layout row wrap>
          <v-flex xs1 offset-xs2>
            <v-avatar size="110px" class="elevation-2 ma-2">
              <img src="https://pbs.twimg.com/profile_images/978369970773086208/IL1Ytuzu_400x400.jpg" alt="John Lieder">
            </v-avatar>
          </v-flex>
          <v-flex class="mt-3 ml-5">
            <p class="title mb-0">{{ name }}</p>
            <p class="caption">{{ $store.state.userData.email }}</p>
          </v-flex>
          <v-flex>
              <v-btn depressed small @click="logout()">Log Out</v-btn>
          </v-flex>
        </v-layout>
        <v-divider color="primary"></v-divider>
      </v-flex>
      <v-flex v-for="(item, index) in contact" :key="index" xs4>
        <v-card dark color="accent">
          <v-layout row wrap>
            <v-flex xs4 offset-xs1>
              <v-avatar size="80px" class="elevation-5 ml-2">
                <img src="https://pbs.twimg.com/profile_images/978369970773086208/IL1Ytuzu_400x400.jpg" alt="John Lieder">
              </v-avatar>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="mt-2 pl-0 pb-0 title"> {{ item.first + ' ' + item.last }}</v-card-text>
              <v-card-text class="pt-1 pl-0 caption">
                {{ item.email }}
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-btn depressed block @click="chatUser(item)">Message</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  sockets: {
    send (data) {
      console.log(data)
    }
  },
  data () {
    return {
      name: this.$store.getters.fullname,
      contact: []
    }
  },
  methods: {
    chatUser (payload) {
      const data = {
        sender: this.$store.state.userData.email,
        whoget: payload
      }
      this.$router.push(`/chat/${payload._id}?${this.$store.state.userData._id}`)
      this.$socket.emit('send', data)
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  },
  async mounted () {
    try {
      const allContact = await this.$axios.$get('http://localhost:3231/v1/users/getall')
      const allUser = allContact.user
      this.contact = allUser
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

