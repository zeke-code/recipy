<template>
  <div class="container-fluid d-none d-lg-block">
    <div class="row">
      <div class="col-lg-2 ps-5">
        <!-- Sidebar content goes here -->
        <div class="sidebar">
          <ul class="nav flex-column">
            <li class="nav-item"><a href="#" class="nav-link"><img :src="homeIcon">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link"><img :src="fireIcon">Trending</a></li>
            <li class="nav-item"><a href="#" class="nav-link"><img :src="exploreIcon">Explore</a></li>
            <li class="nav-item"><a href="#" class="nav-link"><img :src="favoritesIcon">My Favorites</a></li>
            <!-- More items... -->
          </ul>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-10">
        <!-- Main content goes here -->
        <div class="main-content">
          <p>Your main content here...</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import homeIcon from '@/assets/svg/home_icon.svg';
import fireIcon from '@/assets/svg/fire_icon.svg';
import exploreIcon from '@/assets/svg/explore_icon.svg';
import favoritesIcon from '@/assets/svg/star_icon.svg';

export default defineComponent({
    data() {
        return {
          homeIcon,
          fireIcon,
          exploreIcon,
          favoritesIcon
        }
    },

    methods: {

    },

    mounted() {

    },
})
</script>

<style scoped lang="scss">
$text-color: #492318;
$active-link-color: #FFCA42;
.sidebar {
  background-color: transparent;
  min-height: 100vh;
  border-right: 1px solid black;
  padding-top: 50px;

  .nav-link {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 20px;
    border: 1px solid black;
    border-radius: 15px;
    width: 90%;
    height: auto;

    &:active {
      background-color: #492318;
    }

    img {
      margin-right: 20px;
    }
  }
}
</style>