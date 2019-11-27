<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-text-field
      :label="labels.name"
      v-model="form.name"
      :error-messages="errors.name"
      :rules="[rules.required('name')]"
      :disabled="loading"
      @input="clearErrors('name')"
    ></v-text-field>

    <v-text-field
      :label="labels.email"
      v-model="form.email"
      type="email"
      :error-messages="errors.email"
      :rules="rules.emailRules('email')"
      :disabled="loading"
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

    <v-layout row class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        text
        :disabled="loading"
        :to="{ name: 'login' }"
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
        {{ $t('common.register') }}
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
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    }
  }),

  created() {
    this.setLabels()
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        console.log(api.path('register'))
        axios.post(api.path('register'), this.form)
          .then(res => {
            this.$toast.success(this.$t('profile.registered'))
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
      this.labels.name = this.$t('common.name')
      this.labels.password = this.$t('common.password')
      this.labels.password_confirmation = this.$t('common.password_confirmation')
    }
  }
}
</script>
