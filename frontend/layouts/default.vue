<template>
    <div class="min-h-screen flex flex-col">
        <div
            class="flex-grow"
            :class="{
                'bg-green-200': !isMLMDetected,
                'bg-red-200': isMLMDetected,
            }"
        >
            <nuxt />
        </div>
        <nuxt-link
            :to="footerRoute"
            class="h-12 bg-white w-full flex items-center justify-center hover:bg-gray-200 cursor-pointer fixed bottom-0 left-0"
        >
            <p>
                {{ footerText }}
            </p>
        </nuxt-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            isMLMDetected: 'getIsMLMDetected',
        }),
        isIndex() {
            return this.$route.path === '/';
        },
        footerRoute() {
            if (this.isIndex) {
                return '/all-mlms';
            } else {
                return '/';
            }
        },
        footerText() {
            if (this.isIndex) {
                return 'List of all MLMs';
            } else {
                return 'Back to main page';
            }
        },
    },
};
</script>
