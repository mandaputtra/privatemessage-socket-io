<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row justify-center align-center wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">{{ name }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="(item, index) in contact" :key="index" xs6>
        <v-card dark color="secondary">
          <v-card-text class="px-0">
            {{ item.email }}
          </v-card-text>
          <v-card-actions>
            <v-btn flat block @click="chatUser(item)">Message</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// jain@mumby.mail
export default {
  data () {
    return {
      name: this.$store.getters.fullname,
      contact: []
    }
  },
  methods: {
    chatUser(payload) {
      this.$router.push(`/chat/${payload._id}`)
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

