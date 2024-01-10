<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2">
        <div class="d-flex flex-column justify-content-center align-items-center mt-5">
            <h3>Hey, {{ user?.username }}! Here are the recipes you posted!</h3>
            <div v-for="post in datiPost" class="post-wrapper d-flex justify-content-center mt-4">
                <PostComponent :post="post" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import axios from 'axios';
import { useHead } from '@unhead/vue';
import { Post, User } from '../types';
import PostComponent from '../components/PostComponent.vue';

export default defineComponent({
    components: { PostComponent },
    props: {
        user: Object as PropType<User>,
    },
    setup() {
        useHead({
            title: 'Profile | Recipy',
            meta: [
                {
                    name: 'description',
                    content: 'Profile page of Recipy.'
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
        getPosts() {
            axios.get('/api/profile')
            .then(response => {
                this.datiPost = response.data;
            })
        }
    },

    mounted() {
        this.getPosts();
    }
})
</script>