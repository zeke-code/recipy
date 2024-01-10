<template>
    <div class="col-sm-12 col-md-10 col-lg-7 offset-lg-5 offset-md-2">
        <div v-for="post in datiPost" class="post-wrapper d-flex justify-content-center align-items-center mt-4" style="cursor: pointer;">
            <PostComponent :post="post" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useHead } from '@unhead/vue';
import { Post } from '../types';
import PostComponent from '../components/PostComponent.vue';

export default defineComponent({
    components: { PostComponent },
    
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
            
        }
    },

    methods: {
        async getPosts() {
            await axios.get('/api/post/allPosts')
                .then(response => {
                    this.datiPost = response.data
                    console.log(response.data)
            })
        },
    },

    mounted() {
        this.getPosts();
    },
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