<template>
  <v-flex sm8 md6 lg4>
    <v-card>
      <v-toolbar dark color="primary" flat>
        <v-toolbar-title>{{ $t('common.login') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <login-form @success="success"></login-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-4">{{ $t('common.no_account') }}<router-link :to="{ name: 'register' }">{{ $t('profile.register') }}</router-link></div>
  </v-flex>
</template>

<script>
import LoginForm from './LoginForm'

export default {
  components: {
    LoginForm
  },

  methods: {
    success(data) {
      this.$store.dispatch('auth/saveToken', data)
      this.$store.dispatch('auth/setUser', data)
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
