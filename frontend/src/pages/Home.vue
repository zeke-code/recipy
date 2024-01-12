<template>
    <div class="col-sm-12 col-md-10 col-lg-7 offset-lg-5 offset-md-2">
        <PostList :posts="datiPost" @load-new-posts="getPosts"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useHead } from '@unhead/vue';
import { Post } from '../types';
import PostComponent from '../components/PostComponent.vue';
import PostList from '../components/PostList.vue';

export default defineComponent({
    components: { PostComponent, PostList },
    // Composition API used to define metadata as it is simpler, and I'm lazy.
    setup() {
        useHead({
            title: 'Home | Recipy',
            meta: [
                {
                    name: 'description',
                    content: 'Home page of Recipy.'
                }
            ]
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
        async getPosts() {
            if (this.noMoreData) {
                alert('No more posts are retrievable.');
                return;
            }

            const response = await axios.get('/api/post/getposts', {
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
        },
    },

    mounted() {
        this.getPosts();
    },
})

</script>

<style scoped lang="scss">

</style>