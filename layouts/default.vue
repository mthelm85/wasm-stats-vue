<template>
  <v-app dark>
    <NavDrawer />
    <Nuxt />
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: 'Stats'
    }
  }
}
</script>
