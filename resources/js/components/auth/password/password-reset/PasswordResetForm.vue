<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-text-field
      :label="labels.password"
      v-model="form.password"
      :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
      @click:append="() => (passwordHidden = !passwordHidden)"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password"
      :disabled="loading"
      :rules="[rules.required('password')]"
      :hint="$tc('form.validation.at_least_n_characters', 6)"
      @input="clearErrors('password')"
    ></v-text-field>

    <v-text-field
      :label="labels.password_confirmation"
      v-model="form.password_confirmation"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password_confirmation"
      :disabled="loading"
      :rules="[rules.required('password_confirmation')]"
      @input="clearErrors('password')"
    ></v-text-field>

    <v-layout class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading || !valid"
        color="primary"
      >
        Set new password
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
      token: null,
      email: null,
      password: null,
      password_confirmation: null
    }
  }),

  created() {
    this.setLabels()
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        axios.post(api.path('password.reset'), this.form)
          .then((res) => {
            this.$toast.success('Your password has been reset.')
            this.$emit('success', this.form)
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
      this.labels.password = this.$t('common.password')
      this.labels.password_confirmation = this.$t('common.password_confirmation')
    }
  }
}
</script>
