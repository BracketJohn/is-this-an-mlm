<template>
    <div class=" min-h-screen flex"
        :class="{
            'bg-green-200': !isMLMDetected,
            'bg-red-200': isMLMDetected
        }">
        <nuxt />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            isMLMDetected: 'getIsMLMDetected'
        })
    }
}
</script>
