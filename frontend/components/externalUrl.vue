<template>
    <a class="text-blue-600 underline" target="_blank" :href="href">{{ text }}</a>
</template>

<script>
export default {
    props: {
        href: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
};
</script>
