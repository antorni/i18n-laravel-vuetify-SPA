<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-center wrap>
      <v-flex lg7 sm8 xs12>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-flex>
      <v-flex lg3 sm4 xs12 mt-12>
        <sidemenu :threshold="67" :offset="90" :items="items">{{ $t('') }}</sidemenu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Sidemenu from '$comp/ui/Sidemenu'

export default {
  components: {
    Sidemenu
  },

  data: () => ({
    items: []
  }),

  mounted() {
    this.navigation()
  },

  beforeUpdate() {
    this.navigation()
  },

  methods: {
    navigation() {
      this.items = [
        { title: this.$t('common.view'), icon: 'visibility', to: { name: 'profile' } },
        { title: this.$t('common.edit'), icon: 'edit', to: { name: 'profile-edit' } },
      ]
    }
  }
}
</script>
