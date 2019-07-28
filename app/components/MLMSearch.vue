<template>
    <div class="flex flex-col flex-grow">

        <!-- Input -->
        <div class="flex flex-col sm:flex-row items-center justify-center mt-12">
            <p class="text-4xl mr-4 sm:text-right">Is</p>
                <input
                    aria-label="Company Name"
                    type="text"
                    class="rounded-lg shadow-lg focus:shadow-outline border border-gray-300 py-2 sm:py-4 px-4"
                    placeholder="Company Name"
                    v-model="name"
                    @blur="updateURL"
                    >
            <p class="text-4xl ml-4 mt-1 sm:mt-1">an MLM?</p>
        </div>

        <!-- Result -->
        <div class="flex items-center justify-center mt-3 text-center">
            <div v-if="name.length == 0" class="text-lg text-gray-800">
                (type in a company name above)
            </div>
            <div v-else-if="name.length > 0 && isThisAnMLM">
                <p class="text-red text-4xl mt-8">Yes!</p>
                <p class="text-xl">Please check out
                    <a class="text-blue-600 underline" @click="shareInform('wikipedia_click')" target="_blank" href="https://en.wikipedia.org/wiki/Multi-level_marketing">Wikipedia</a>,
                    <a class="text-blue-600 underline" @click="shareInform('mlmtruth_click')" target="_blank" href="https://mlmtruth.org/">MLM Truth</a>,
                    <a class="text-blue-600 underline" @click="shareInform('youtube_click')" target="_blank" href="https://www.youtube.com/watch?v=s6MwGeOm8iI&feature=youtu.be">John Oliver's video</a> or
                    <a class="text-blue-600 underline" @click="shareInform('reddit_click')" target="_blank" href="https://www.reddit.com/r/antiMLM">this awesome subreddit</a>
                for information and help!</p>
            </div>
            <div  v-else-if="name.length > 0 && !isThisAnMLM">
                <div v-if="similarCompanyNames.length > 0">
                    <p class="text-xl">Perhaps you meant:</p>
                    <nuxt-link
                        :to="`/mlm/${_name}`"
                        v-for="(_name, index) in similarCompanyNames"
                        :key="_name"
                        class="text-2xl"
                        >
                        <span @click="name = _name" class="underline text-blue-600">{{ _name }}</span>
                        <span v-if="index < similarCompanyNames.length - 1">, </span>
                    </nuxt-link>
                </div>
                <p class="text-md mt-10">
                    Is this an MLM you would like to add?
                </p>
                <div @click="suggestMLM">
                    <Button
                        :text="`Add '${name}'`"
                        class="mt-2 text-xl"
                        />
                </div>
            </div>
        </div>

        <!-- Buttons for sharing -->
        <div class="flex flex-col flex-grow flex-wrap items-center justify-center mt-16" v-if="isThisAnMLM">
            <div class="mb-5">
                Share results on:
            </div>
            <div class="flex flex-col flex-wrap flex-grow">
                <!-- goodshare -->
                <div class="flex flex-wrap justify-around">
                    <div @click="shareInform('facebook_share')">
                        <no-ssr>
                            <vue-goodshare-facebook has_icon title_social="Facebook"></vue-goodshare-facebook>
                        </no-ssr>
                    </div>
                    <div @click="shareInform('twitter_share')">
                        <no-ssr>
                            <vue-goodshare-twitter has_icon title_social="Twitter"></vue-goodshare-twitter>
                        </no-ssr>
                    </div>
                    <div @click="shareInform('reddit_share')">
                        <no-ssr>
                            <vue-goodshare-reddit has_icon title_social="Reddit"></vue-goodshare-reddit>
                        </no-ssr>
                    </div>
                    <div @click="shareInform('whatsapp_share')">
                        <no-ssr>
                            <vue-goodshare-whatsapp has_icon title_social="Whatsapp"></vue-goodshare-whatsapp>
                        </no-ssr>
                    </div>
                    <div @click="shareInform('email_share')">
                        <no-ssr>
                            <vue-goodshare-email has_icon title_social="Email"></vue-goodshare-email>
                        </no-ssr>
                    </div>
                </div>

                <!-- copy url -->
                <div class="flex items-center justify-center">
                    <button class="rounded-sm bg-white w-20 h-10 flex mt-4 items-center justify-center hover:bg-gray-300 cursor-pointer" @click="copy()">
                        Copy Link
                    </button>
                </div>
            </div>
        </div>

        <!-- Reserved/Spacing -->
        <div class="flex-grow"></div>
    </div>
</template>

<script>
import Button from '~/components/Button'

const levenshtein = require('fast-levenshtein');

import { mapGetters } from 'vuex'

export default {
    props: {
        namePageWasCalledWith: {
            type: String,
            default: ''
        }
    },
    head () {
        return {
            title: `Is ${this.name || 'company X'} an MLM? ${this.isThisAnMLM ? 'Yes' : 'No'}!`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: (this.isThisAnMLM ?
                                `The company ${this.name} is an MLM. MLMs are usually predatory in behavior and should be avioded at all cost! Please help any family memeber or friend in need by showing them this page.`
                                : (this.name ? `Currently, ${this.name} is not a known MLM. If you think it is, please help this page by clicking 'Add ${this.name}' below.`
                                   : `Website to determine whether a company is an MLM. Usually, so-called MLMs are predatory and in-fact pyramid schemes, that only allow you to earn money by recruiting people rather than by selling actual products.`)
                             )
                }
            ]
        }
    },
    data() {
        return {
            name: this.namePageWasCalledWith,
            shareTargets: [
                'Facebook',
                'Twitter',
                'Reddit',
                'Whatsapp'
            ],
            timerID: null,
        }
    },
    mounted() {
        this.shareInform('_visitor')

        let self = this
        this.timerID = setInterval(() => {
            self.shareInform(`${self.name || '__no_name'}_checked`)
        }, 2000)
    },
    beforeDestroy() {
        clearInterval(this.timerID)
    },
    computed: {
        ...mapGetters({
            mlms: 'getMLMs'
        }),
        isThisAnMLM() {
            let _isMLM = (this.name.length > 0) && (this.mlms.indexOf(this.name.toLowerCase()) > -1)

            this.updateMLMMode(_isMLM)
            return _isMLM
        },
        fullURL() {
            return `https://isthisanmlm.com/mlm/${this.name}`;
        },
        similarCompanyNames() {
            let distances = []
            this.mlms.forEach(mlm => {
                distances.push({
                    name: mlm,
                    distance: levenshtein.get(mlm, this.name)
                })
            })

            return distances.sort((compOne, compTwo) => {
                if (compOne.distance < compTwo.distance) {
                    return -1
                }
                if (compOne.distance > compTwo.distance) {
                    return 1
                }
                return 0
            }).slice(0, 3).filter(comp => comp.distance < 5).map(comp => comp.name)
        },
    },
    methods: {
        copy() {
            this.shareInform('copyURL_share')

            let self = this;
            this.$copyText(`https://isthisanmlm.com/mlm/${this.name}`)
                .then((response) => {
                    self.$toast.success('Copied link to clipboard!')
                })
                .catch((error) => {
                    self.$toast.error('Failed to copy link to clipboard!')
            })
        },
        updateMLMMode(isMLM) {
            this.$store.commit('setIsMLMDetected', isMLM)

            if (isMLM) {
                this.shareInform(`${this.name}_match`)
            }
        },
        async suggestMLM() {
            const res = await this.$axios.post('/api/make-suggestion', {
                name: this.name
            })

            let { status } = res.data
            if (status == 'success') {
                this.$toast.success('Suggestion made, thanks!')
            } else {
                this.$toast.error('Failed to make suggestion!')
            }

            this.name = ""
        },
        updateURL() {
            this.shareInform(`${this.name || '__no_name'}_checked`)
            if (this.isThisAnMLM) {
                this.$router.push(`/mlm/${this.name}`)
            }
        },
        shareInform(target) {
            this.$axios.post('/api/shared', {
                target: target
            })
        },
    },
    components: {
        Button
    }
}
</script>
