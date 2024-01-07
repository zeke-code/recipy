<template>
  
  <div class="col-lg-2 ps-4" id="column">
    <div class="sidebar">
    <!-- Sidebar content goes here -->
      <ul class="nav flex-column">
        <li class="nav-item"><a href="#" class="nav-link"><img :src="homeIcon">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link"><img :src="fireIcon">Trending</a></li>
        <li class="nav-item"><a href="#" class="nav-link"><img :src="exploreIcon">Explore</a></li>
        <li class="nav-item"><a href="#" class="nav-link"><img :src="favoritesIcon">My Favorites</a></li>
        <!-- More items... -->
      </ul>
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
$hover-link-color: #F27B5B;

#column {
  display: none;
}

#column {
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

    &:hover {
      background-color: $hover-link-color;
    }

    &:active {
      background-color: $hover-link-color;
    }

    img {
      margin-right: 20px;
    }
  }
}

@media (min-width: 1207px) {
  #column {
    display: block;
  }
}
</style>