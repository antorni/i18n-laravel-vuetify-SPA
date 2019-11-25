<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-text-field
      :label="labels.email"
      v-model="form.email"
      type="email"
      :error-messages="errors.email"
      :rules="rules.emailRules('email')"
      :disabled="loading"
    ></v-text-field>

    <v-layout class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        text
        :disabled="loading"
        :to="{ name: 'login', query: {email: form.email} }"
        color="grey darken-2"
        exact
      >
        {{ $t('common.back_to_login') }}
      </v-btn>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading || !valid"
        color="primary"
        class="ml-4"
      >
        {{ $t('profile.password.get_password') }}
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
    labels: {},

    form: {
      email: null
    }
  }),

  created() {
    this.setLabels()
    this.form.email = this.$route.query.email || null
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        axios.post(api.path('password.forgot'), this.form)
          .then((res) => {
            this.$toast.info(this.$t('profile.password.email_sent'))
            this.$emit('success')
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
    }
  }
}
</script>
