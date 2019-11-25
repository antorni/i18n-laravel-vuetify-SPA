<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-card>
      <v-card-text>
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
      </v-card-text>
    </v-card>

    <h3 class="headline mb-4 mt-12">{{ $t('common.password') }}</h3>

    <v-card>
      <v-card-text>
        <v-text-field
          :label="labels.password"
          v-model="form.password"
          :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
          @click:append="() => (passwordHidden = !passwordHidden)"
          :type="passwordHidden ? 'password' : 'text'"
          :error-messages="errors.password"
          :disabled="loading"
          :hint="$tc('form.validation.at_least_n_characters', 6)"
          autocomplete="new-password"
          @input="clearErrors('password')"
        ></v-text-field>

        <v-text-field
          :label="labels.password_confirmation"
          v-model="form.password_confirmation"
          :type="passwordHidden ? 'password' : 'text'"
          :error-messages="errors.password_confirmation"
          :disabled="loading"
          autocomplete="new-password"
          @input="clearErrors('password')"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-layout mt-12 mx-0>
      <v-spacer></v-spacer>

      <v-btn
        text
        :disabled="loading"
        :to="{ name: 'profile' }"
        color="grey darken-2"
        exact
      >
        {{ $t('common.cancel') }}
      </v-btn>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading"
        color="primary"
        class="ml-4"
      >
        {{ $t('common.save') }}
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
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
      password_confirmation: null,
    }
  }),

  computed: mapGetters({
    auth: 'auth/user'
  }),

  mounted() {
    this.setLabels()
    this.form = Object.assign(this.form, this.auth)
  },

  beforeUpdate() {
    this.setLabels()
    this.$refs.form.validate()
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        axios.put(api.path('profile'), this.form)
          .then(res => {
            this.$toast.success(this.$t('profile.updated_successfully'))
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
