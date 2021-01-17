<template>
    <MLMSearch :namePageWasCalledWith="name"> </MLMSearch>
</template>

<script>
import MLMSearch from '~/components/MLMSearch';

export default {
    async asyncData({ params }) {
        return {
            name: params.name,
        };
    },
    components: {
        MLMSearch,
    },
};
</script>
