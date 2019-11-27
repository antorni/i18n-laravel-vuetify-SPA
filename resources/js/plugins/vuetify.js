import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

import es from 'vuetify/es5/locale/es'
import en from 'vuetify/es5/locale/en'

Vue.use(VuetifyToast)

export default new Vuetify({
  lang: {
    locales: { es, en },
    current: 'es',
  },

  theme: {
  	dark: true
  },

  theme: {
    themes: {
      dark: {
        primary: '#4682B4',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
    dark: true,
  },
})
