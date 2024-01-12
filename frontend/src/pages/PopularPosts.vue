<template>
<div class="col-sm-12 col-md-10 col-lg-7 offset-lg-5 offset-md-2">
    <PostList :posts="datiPost" @load-new-posts="getPopularPosts"/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import { Post } from '../types';
import axios from 'axios';
import PostComponent from '../components/PostComponent.vue';
import PostList from '../components/PostList.vue';

export default defineComponent({
    components: { PostComponent, PostList },
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
            datiPost: [] as Post[],
            noMoreData: false,
            currentPage: 1
        }
    },

    methods: {
        async getPopularPosts() {
            if (this.noMoreData) {
                alert('No more posts are retrievable.');
                return;
            }

            const response = await axios.get('/api/post/mostpopular', {
                params: { page: this.currentPage }
            });
            if (response.data.length < 5) {
                this.noMoreData = true;
                this.datiPost = [...this.datiPost, ...response.data];
            } else {
                this.datiPost = [...this.datiPost, ...response.data];
                console.log(this.datiPost)
                this.currentPage++;
            }
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