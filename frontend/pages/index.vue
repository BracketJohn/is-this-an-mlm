<template>

  <section class="hero is-fullheight">
      <div class="hero-body">
      <div class="container">

        <div class="columns">
          <div class="column has-text-right has-text-centered-mobile">
            <p class="is-size-3">
              Is
            </p>
          </div>
          <div class="column has-text-centered">
            <b-field>
              <b-input size="is-large" placeholder="Company Name" v-model="companyName" rounded></b-input>
            </b-field>

            <div v-if="companyName">
              <div v-if="isMlm">
                <h1 class="is-size-2 has-text-danger">Yes!</h1>
                <h2>Please check out <a href="https://en.wikipedia.org/wiki/Multi-level_marketing">Wikipedia</a>, <a href="http://www.pinktruth.com/">Pink truth</a>, <a href="https://www.youtube.com/watch?v=s6MwGeOm8iI&feature=youtu.be">John Oliver's video</a> or <a href="https://www.reddit.com/r/MLMRecovery">this awesome subreddit</a> for information and help!</h2>
              </div>
              <div v-else>
                <h1 class="is-size-2 has-text-success">No!</h1>
                <h2 v-if="getSimilarCompanyNames">Perhaps you meant: {{ getSimilarCompanyNames }}?</h2>
              </div>
            </div>
            <div v-else>
              <h1 class="is-size-4 is-size-6-mobile">Please type in a company name!</h1>
            </div>

          </div>
          <div class="column has-text-left has-text-centered has-text-centered-mobile">
            <p class="is-size-3">
            an MLM?
            </p>
          </div>
        </div>

      </div>
      </div>

  </section>


</template>

<script>
const levenshtein = require('fast-levenshtein');

export default {
  computed: {
    isMlm() {
      return this.knownMlms.indexOf(this.companyName.toLowerCase()) > -1;
    },
    getSimilarCompanyNames() {
      let distances = [];
      this.knownMlms.forEach(element => {
        let distance = levenshtein.get(element, this.companyName);
        distances.push({
          name: element,
          distance: distance
        });
      });
      return distances.sort(function compare(compOne,compTwo) {
        if (compOne.distance < compTwo.distance)
          return -1;
        if (compOne.distance > compTwo.distance)
          return 1;
        return 0;
      }).slice(0, 3).filter(comp => comp.distance < 5).map(comp => comp.name).join(', ');
    }
  },
  data: function() {
    return {
      companyName: '',
      knownMlms: []
    }
  },
  fetch () {
    return axios.get('/api/mlms')
    .then((res) => {
      this.knownMlms = res;
    })
  },
}
</script>
