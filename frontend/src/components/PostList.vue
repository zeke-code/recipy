<template>
    <div v-for="post in posts" class="post-wrapper d-flex justify-content-center align-items-center mt-4" style="cursor: pointer;">
        <PostComponent :post="post" />
    </div>
    <!--
    <div class="button-container d-flex justify-content-center align-items-center">
        <button v-if="posts?.length > 0" @click="$emit('load-new-posts')" class="btn btn-primary" aria-label="Load new posts">Load New Posts</button>
    </div>
    -->
</template>

<script lang="ts">
import { PropType, defineComponent, onBeforeUnmount, onMounted } from 'vue';
import PostComponent from './PostComponent.vue';
import { Post } from '../types';

export default defineComponent({
    emits: ['load-new-posts'],
    components: { PostComponent },
    props: {
        posts: {
            type: Array as PropType<Post[]>,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const checkScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
                emit('load-new-posts');
            }
        };

        onMounted(() => {
            window.addEventListener('scroll', checkScroll);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', checkScroll);
        })
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

/* .button-container {
    height: 50px;
    max-width: 641px;
}
*/
</style>
