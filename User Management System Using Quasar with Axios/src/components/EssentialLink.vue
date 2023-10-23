<template>
  <q-item :clickable="isClickable" :to="route_name">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <a
          v-if="isExternalLink"
          :href="link"
          target="_blank"
          class="external-link"
          >{{ title }}</a
        >
        <router-link v-else :to="route_name" class="router-link">{{
          title
        }}</router-link>
      </q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.external-link,
.router-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.router-link.active {
  font-weight: bold;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },

    route_name: {
      type: String,
      default: "",
    },
  },
  computed: {
    isClickable() {
      // Determine if the link should be clickable
      return this.route_name !== "" || this.link !== "";
    },
    isExternalLink() {
      // Determine if the link is an external link
      return this.link.startsWith("http");
    },
  },
});
</script>
