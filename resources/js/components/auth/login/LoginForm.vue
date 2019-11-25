<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-text-field
      :label="labels.email"
      v-model="form.email"
      type="email"
      :error-messages="errors.email"
      :rules="rules.emailRules('email')"
      :disabled="loading"
      prepend-icon="person"
      @input="clearErrors('email')"
    ></v-text-field>

    <v-text-field
      :label="labels.password"
      v-model="form.password"
      :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
      @click:append="() => (passwordHidden = !passwordHidden)"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password"
      :disabled="loading"
      :rules="[rules.required('password')]"
      prepend-icon="lock"
      @input="clearErrors('password')"
    ></v-text-field>

    <v-layout class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        text
        :disabled="loading"
        :to="{ name: 'forgot', query: {email: form.email} }"
        color="grey darken-2"
      >
        {{ $t('common.forgot_password') }}
      </v-btn>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading || !valid"
        color="primary"
        class="ml-4"
      >
        {{ $t('common.login')}}
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import axios from 'axios'
import { api } from '~/config'
import Form from '~/mixins/form'

export default {
  mixins: [Form],

  data: () => ({
    passwordHidden: true,

    labels: {},

    form: {
      email: null,
      password: null
    }
  }),

  created() {
    this.form.email = this.$route.query.email || null
    this.setLabels()
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        axios.post(api.path('login'), this.form)
          .then(res => {
            this.$toast.success(this.$t('profile.welcome_back'))
            this.$emit('success', res.data)
          })
          .catch(err => {
            this.handleErrors(err.response.data.errors)
          })
          .then(() => {
            this.loading = false
          })
      }
    },

    setLabels() {
      this.labels.email = this.$t('common.email')
      this.labels.password = this.$t('common.password')
    }
  }
}
</script>
