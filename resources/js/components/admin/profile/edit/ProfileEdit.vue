<template>
  <div>
    <h2 class="mb-4 primary--text headline">{{ $t('profile.edit') }}</h2>
    <profile-edit-form @success="success"></profile-edit-form>
  </div>
</template>

<script>
import ProfileEditForm from './ProfileEditForm'

export default {
  components: {
    ProfileEditForm
  },

  methods: {
    success(data) {
      this.$store.dispatch('auth/setUser', data)
      this.$router.push({ name: 'profile' })
    }
  }
}
</script>
