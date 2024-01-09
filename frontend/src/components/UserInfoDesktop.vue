<script lang="ts">
import axios from 'axios';
import { PropType, defineComponent } from 'vue';
import { User } from '../types';

export default defineComponent({
    props: {
        user: Object as PropType<User>,
    },
    methods: {
        async logout() {
            await axios.post('/api/auth/logout')
            window.location.reload()
        }
    }
})
</script>