<template>
  <div class="flex flex-col w-full m-auto max-w-xs h-screen">
    <h2 class="mt-4 mb-4">Your Contact List</h2>
    <contact-list/>
  </div>
</template>

<script>
import ContactList from '../components/Contact'

export default {
  components: {
    'contact-list': ContactList
  }
}

</script>

<style>

</style>
