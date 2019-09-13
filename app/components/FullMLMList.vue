<template>
    <div class="mx-auto w-full md:w-1/2 pb-12">
        <div class="text-center text-2xl font-semibold">
            All MLMs currently known to us:
        </div>
        <p class="text-center">
            (MLMs are bad and fraudulent compnaies, please stay away from them!)
        </p>
        <div v-for="mlm in mlms" :key="mlm" class="shadow-lg rounded-sm p-4 m-2 bg-white hover:bg-gray-200 cursor-default">
            {{ mlm }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        currentSimilarCompanyNames: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapGetters({
            mlms: 'getMLMs'
        })
    }
}
</script>
