<script lang="ts">
import { defineComponent } from 'vue';
import NavbarDesktop from './components/NavbarDesktop.vue';
import NavbarMobile from './components/NavbarMobile.vue';
import SidebarDesktop from './components/SidebarDesktop.vue';
import Home from './pages/Home.vue';

export default defineComponent({
  name: 'App',
  components: { NavbarDesktop, NavbarMobile, SidebarDesktop, Home },
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
  <NavbarDesktop />
  <NavbarMobile />
  <div class="container-fluid">
    <div class="row">
    <SidebarDesktop />
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>