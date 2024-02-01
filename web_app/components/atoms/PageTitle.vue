<template>
  <div>
    <v-breadcrumbs v-if="text" large>
      <v-breadcrumbs-item link nuxt replace>
        {{ text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-breadcrumbs v-else :items="crumb" large>
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template #item="{ item }">
        <v-breadcrumbs-item :href="item.href" link nuxt replace :disabled="item.disabled">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: '',
    },
  },

  head(this: any): Object {
    return {
      title: this.$route.name,
    };
  },

  computed: {
    name(this: any): string {
      return this.$route.meta.name;
    },

    crumb(): Object {
      const Routes = this.$router.options.routes;
      const pathArray = this.$route.path.split('/');
      let pathFull = '';

      pathArray.shift();

      const breadcrumb = {
        text: this.$route?.meta?.screenName,
        href: this.$route.path,
        path: this.$route.path,
        to: this.$route.path,
        disabled: true,
      };

      const idx = pathArray.indexOf('edit');

      if (idx !== -1) pathArray.splice(idx + 1, 1);

      const breadcrumbs: Object[] = [];

      // eslint-disable-next-line array-callback-return
      pathArray.map((path, idx) => {
        pathFull += '/' + path;
        const route = Routes && Routes.find((item) => item?.path === pathFull);
        if (route) {
          breadcrumbs.push({
            text: route?.meta?.screenName,
            href: route?.path,
            path: route?.path,
            to: route?.path,
            disabled: idx + 1 === pathArray.length,
          });
        }
      });

      if (!breadcrumbs.some((bread: any) => bread.text === breadcrumb.text))
        breadcrumbs.push(breadcrumb);

      return breadcrumbs;
    },
  },
});
</script>
