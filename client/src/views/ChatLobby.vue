<template>
  <div class="flex flex-col w-full m-auto max-w-xs h-screen">
    <h2 class="mt-4 mb-4">{{ $store.state.credentials.name }} Contact List</h2>
    <div v-for="(contact, index) in contactList" :key="index">
      <contact-list :contact="contact" :contactWhoChat="$store.state.credentials" />
    </div>
  </div>
</template>

<script>
import ContactList from '../components/Contact'
import axios from 'axios'

export default {
  components: {
    'contact-list': ContactList
  },
  sockets: {
    join() {
      console.log('someone chat')
    },
    chat(data) {
      console.log(data)
    }
  },
  data () {
    return {
      contactList: ''
    }
  },
  mounted () {
    axios.get(this.$baseURL + 'users/getall', {
      headers: {
        'Authorization': this.$store.state.token
      }
    })
      .then(response => {
        this.contactList = response.data.user
      })
      .catch(err => console.log(err))
  }
}

</script>

<style>

</style>
