<template>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Sagacious
          </v-list-item-title>
          <v-list-item-subtitle>
            Analytics For All
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <FileUpload />
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
              <NuxtLink :to="item.to" class="none">
                <v-list-item-title>
                    {{ item.title }}
                </v-list-item-title>
              </NuxtLink>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    name: 'NavDrawer',

    data: () => ({
        items: [
            { title: 'Scalar Statistics', icon: 'mdi-alphabet-greek', to: 'ScalarStats' },
            { title: 'Linear Regression', icon: 'mdi-chart-scatter-plot', to: 'Regression' },
            { title: 'About', icon: 'mdi-help-box', to: '/' },
        ],
        right: null,
    }),
}
</script>
<style scoped>
a {
    color: inherit;
    text-decoration: inherit;
}
</style>
