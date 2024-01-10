<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <div v-if="postDetails" class="post-wrapper d-flex justify-content-center mt-4">
                <PostComponent :post="postDetails[0]" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import axios from 'axios';
import { Post } from '../types';
import PostComponent from '../components/PostComponent.vue';

export default defineComponent({
    components: { PostComponent },
    props: {
        post: Object as PropType<Post>
    },
    setup() {
        useHead({
            title: 'Post | Recipy',
            meta: [
                {
                    name: 'description',
                    content: 'Page where you view a post in Recipy.'
                }
            ]
        })
    },

    data() {
        return {
            postDetails: null as Post[] | null,
        }
    },

    methods: {
        async getPostById() {
            await axios.get(`/api/post/${this.$route.params.recipe_id}/details`)
                .then(response => {
                    this.postDetails = response.data[0];
                    console.log(this.postDetails);
                })
        }
    },

    mounted() {
        this.getPostById();
    }
})
</script>