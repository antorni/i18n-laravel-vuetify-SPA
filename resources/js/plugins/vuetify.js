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
  	themes: {
	  ligth: {
	    primary: '#4caf50',
	    secondary: '#2196f3',
	    accent: '#e91e63',
	    error: '#f44336',
	    warning: '#ff9800',
	    info: '#673ab7',
	    success: '#8bc34a'
	  }
	}
  },
})
