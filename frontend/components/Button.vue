<template>
    <div class="shadow-lg rounded p-2 flex items-center justify-center bg-white hover:bg-gray-300 cursor-pointer">
        <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
    props: ['text']
}
</script>
