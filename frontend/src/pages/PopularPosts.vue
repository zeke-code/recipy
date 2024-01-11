<template>
<div class="col-sm-12 col-md-10 col-lg-7 offset-lg-5 offset-md-2">
        <div v-for="post in datiPost" class="post-wrapper d-flex justify-content-center align-items-center mt-4" style="cursor: pointer;">
            <PostComponent :post="post" />
        </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import { Post } from '../types';
import axios from 'axios';
import PostComponent from '../components/PostComponent.vue';

export default defineComponent({
    components: { PostComponent },
    setup() {
        useHead({
            title: 'Popular | Recipy',
            meta: [{
                name: 'description',
                content: 'See the most popular recipes on Recipy.'
            }]
        })
    },

    data() {
        return {
            datiPost: [] as Post[]
        }
    },

    methods: {
        async getPopularPosts() {
            await axios.get('/api/post/mostpopular')
                    .then(response => {
                        this.datiPost = response.data,
                        console.log(response.data);
                    })
        }
    },

    mounted() {
        this.getPopularPosts();
    }
})
</script>

<style scoped lang="scss">
$post-text-color: #492318;
.post-wrapper {
    padding: 10px;
    max-width: 641px;
    word-wrap: break-word;
    color: $post-text-color;
}
</style>