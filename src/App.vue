<script lang="ts">
import { defineComponent } from 'vue';
import NavbarDesktop from './components/NavbarDesktop.vue';
import NavbarMobile from './components/NavbarMobile.vue';
import SidebarDesktop from './components/SidebarDesktop.vue';

export default defineComponent({
  name: 'App',
  components: { NavbarDesktop, NavbarMobile, SidebarDesktop },
  data() {
    return {

    }
  },
  methods: {
    }
  }
)
</script>

<template>
  <NavbarDesktop/>
  <NavbarMobile/>
  <SidebarDesktop />
</template>