<template>
    <div class="flex flex-col flex-grow">

        <!-- Input -->
        <div class="flex flex-col sm:flex-row items-center justify-center mt-12">
            <p class="text-4xl mr-4 sm:text-right">Is</p>
                <input
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
                    <a class="text-blue-600 underline" target="_blank" href="https://en.wikipedia.org/wiki/Multi-level_marketing">Wikipedia</a>,
                    <a class="text-blue-600 underline" target="_blank" href="https://mlmtruth.org/">MLM Truth</a>,
                    <a class="text-blue-600 underline" target="_blank" href="https://www.youtube.com/watch?v=s6MwGeOm8iI&feature=youtu.be">John Oliver's video</a> or
                    <a class="text-blue-600 underline" target="_blank" href="https://www.reddit.com/r/antiMLM">this awesome subreddit</a>
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
            <div class="flex flex-grow">
                <div @click="shareInform('facebook')">
                    <no-ssr>
                        <vue-goodshare-facebook title_social="Facebook" ></vue-goodshare-facebook>
                    </no-ssr>
                </div>
                <div @click="shareInform('twitter')">
                    <no-ssr>
                        <vue-goodshare-twitter title_social="Twitter" ></vue-goodshare-twitter>
                    </no-ssr>
                </div>
                <div @click="shareInform('reddit')">
                    <no-ssr>
                        <vue-goodshare-reddit title_social="Reddit" ></vue-goodshare-reddit>
                    </no-ssr>
                </div>
                <div @click="shareInform('whatsapp')">
                    <no-ssr>
                        <vue-goodshare-whatsapp title_social="Whatsapp" ></vue-goodshare-whatsapp>
                    </no-ssr>
                </div>
                <div @click="shareInform('email')">
                    <no-ssr>
                        <vue-goodshare-email title_social="Email" ></vue-goodshare-email>
                    </no-ssr>
                </div>
                <button class="rounded-sm bg-white w-20 h-10 flex items-center justify-center hover:bg-gray-300 cursor-pointer" @click="shareInform('copyLink');copyUrlToClipboard()">
                    Copy Link
                </button>
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
    data() {
        return {
            name: this.namePageWasCalledWith,
            shareTargets: [
                'Facebook',
                'Twitter',
                'Reddit',
                'Whatsapp'
            ],
        }
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
            return `https://www.isthisanmlm.com/mlm/${this.name}`;
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
        updateMLMMode(isMLM) {
            this.$store.commit('setIsMLMDetected', isMLM)
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
            if (this.isThisAnMLM) {
                this.$router.push(`/mlm/${this.name}`)
            }
        },
        shareInform(target) {
            this.$axios.post('/api/shared', {
                target: target
            })
        },
        copyUrlToClipboard() {
            let self = this;
            this.$copyText(`http://www.isthisanmlm.com/mlm/${this.name}`)
                .then((response) => {
                    self.$toast.success('Copied link to clipboard!')
                })
                .catch((error) => {
                    self.$toast.error('Failed to copy link to clipboard!')
            })
        },
    },
    components: {
        Button
    }
}
</script>
