<template>

  <section class="hero is-fullheight">
      <div class="hero-body">
      <div class="container">

        <div class="columns">
          <div class="column has-text-centered">

            <h1 v-if="error.statusCode === 400">Bad request!</h1>
            <h1 v-else-if="error.statusCode === 401">Authorization required!</h1>
            <h1 v-else-if="error.statusCode === 403">Forbidden</h1>
            <h1 v-else-if="error.statusCode === 404">Page not found!</h1>
            <h1 v-else>An error occurred</h1>
            <nuxt-link to="/">Home page</nuxt-link>

          </div>
        </div>

      </div>
      </div>

  </section>

</template>

<script>
export default {
  props: ['error'],
  layout: 'blog'
}
</script>
