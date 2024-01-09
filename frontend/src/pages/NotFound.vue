<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2 text-center">
        <h1>Error 404... Page Not Found!</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';

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
    }
})
</script>