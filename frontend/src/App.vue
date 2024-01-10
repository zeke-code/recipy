<script lang="ts">
import { defineComponent } from 'vue';
import NavbarDesktop from './components/NavbarDesktop.vue';
import NavbarMobile from './components/NavbarMobile.vue';
import SidebarDesktop from './components/SidebarDesktop.vue';
import Home from './pages/Home.vue';
import { User } from './types';
import axios from 'axios';

export default defineComponent({
  name: 'App',
  components: { NavbarDesktop, NavbarMobile, SidebarDesktop, Home },
  data() {
    return {
      user: null as User | null,
    }
  },
  methods: {
    async getUser() {
      const res = await axios.get('/api/auth/profile')
      this.user = res.data
      },
    },

  mounted() {
    this.getUser()
    }
  }
)
</script>

<template>
  <NavbarDesktop :user="user" />
  <NavbarMobile />
  <div class="container-fluid">
    <div class="row">
    <SidebarDesktop />
    <RouterView :user="user" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>