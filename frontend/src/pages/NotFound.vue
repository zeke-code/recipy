<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2 text-center">
        <h1>Error 404... Page Not Found.</h1>
        <div class="container-fluid">
            <img :src="errorImage">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import errorImage from '@/assets/images/404error.png';

export default defineComponent({
    setup() {
        useHead({
            title: 'Page Not Found | Recipy',
            meta: [
                {
                    name: 'description',
                    content: 'Page was not found!'
                }
            ]
        })
    },
    data() {
        return {
            errorImage
        }
    }
})
</script>

<style scoped lang="scss">
img {
    width: 60%;
}
</style>