<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs4>
      <v-card>
        <v-card-title class="headline"> Login </v-card-title>
        <v-form class="mx-4 pb-4">
          <v-text-field label="email"></v-text-field>
          <v-text-field type="password" label="password"></v-text-field>
          <v-btn flat block> login </v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'partial'
}
</script>

<style>

</style>
