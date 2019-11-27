<template>
  <v-select
    :items="langs"
    :label="$t('common.language')"
    v-model="$i18n.locale"
    outlined
    append-icon="translate"
  ></v-select>
</template>

<script>
export default {
  name: 'localizer',
  data: () => ({
      langs: []
  }),

  mounted() {
    this.langs = Object.keys(this.$i18n.messages)
  } 
}
</script>