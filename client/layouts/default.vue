<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    mounted () {
      if(!this.$store.state.token) {
        this.$router.push('/login')
      }
    }
  }
</script>
