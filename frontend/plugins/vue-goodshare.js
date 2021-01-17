import Vue from 'vue';

import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue';
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue';
import VueGoodshareReddit from 'vue-goodshare/src/providers/Reddit.vue';
import VueGoodshareWhatsApp from 'vue-goodshare/src/providers/WhatsApp.vue';
import VueGoodshareEmail from 'vue-goodshare/src/providers/Email.vue';

Vue.component('vue-goodshare-facebook', VueGoodshareFacebook);
Vue.component('vue-goodshare-twitter', VueGoodshareTwitter);
Vue.component('vue-goodshare-reddit', VueGoodshareReddit);
Vue.component('vue-goodshare-whatsapp', VueGoodshareWhatsApp);
Vue.component('vue-goodshare-email', VueGoodshareEmail);
