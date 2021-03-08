export default {
    name: 'Home',
    mounted() {
    },
    data() {
        return {
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/get']()
        }
    },
    components: {
    }
}
