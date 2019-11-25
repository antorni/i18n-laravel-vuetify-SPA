<template>
  <v-select
    :items="langs"
    :label="$t('common.language')"
    v-model="$i18n.locale"
    outlined
    prepend-icon="translate"
  ></v-select>
</template>

<script>
export default {
  name: 'localizer',
  data () {
    return { langs: ['es', 'en'] }
  }
}
</script>