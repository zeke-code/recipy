<template>
    <nav class="navbar">
        <div class="container-fluid">
            <div class="col-sm-1">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="col-sm-3">
                <a class="navbar-brand" href="/">
                    <img :src="recipyLogo" alt="Recipy Logo">
                </a>
            </div>
        
            <div class="col-sm-3">
                <button class="btn" id="searchIcon" data-bs-toggle="modal" data-bs-target="#fullPageForm">
                    <img :src="magnifyingGlass" alt="Search">
                </button>
                <a href="/user-profile">
                    <img :src="userIconMobile">
                </a>
            </div>
        </div>
    </nav>
    <div class="modal fade" id="fullPageForm" tabindex="-1" aria-labelledby="fullPageFormLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="search" class="form-control" placeholder="Search your recipe here...">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import recipyLogo from '@/assets/images/recipy_logo.png';
import magnifyingGlass from '@/assets/images/magnifying_glass.png'
import userIconMobile from '@/assets/svg/user_icon_mobile.svg'

export default defineComponent({
    data() {
        return {
            recipyLogo,
            magnifyingGlass,
            userIconMobile,
            
        }
    },
    methods: {
        
    },
    mounted() {

    },
    beforeUnmount() {
        
    }
})
</script>

<style scoped lang="scss">
$navbar-color: #F27B5B;

.navbar {
display: block;
  background-color: $navbar-color;

  .navbar-brand img{
    width: 90px;
    height: auto;
    max-height: 100%;
    margin-left: 50px;
    transform: translateY(2px);
  }

  #searchIcon {
    img {
        width: 30px;
        height: auto;
    }
  }
}

@media (min-width: 1207px) {
  .navbar {
    display: none;
  }
}
</style>