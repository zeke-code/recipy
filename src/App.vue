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
  <div class="container-fluid">
    <div class="row">
    <NavbarDesktop />
    <NavbarMobile />
      <SidebarDesktop />
      <div class="col-sm-12 col-lg-10 text-center">
        <p>Placeholder text</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>