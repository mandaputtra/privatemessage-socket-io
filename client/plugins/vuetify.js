import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#2196f3', // a color that is not in the material colors palette
    accent: colors.deepPurple.base,
    secondary: colors.blueGrey.base,
    info: colors.teal.base,
    warning: colors.orange.base,
    error: colors.deepOrange.base,
    success: colors.green.base
  }
})
