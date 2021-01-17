import { mlms } from '../helpers/mlms';

export const state = () => ({
    isMLMDetected: false,
    allMLMs: [...mlms]
})

export const mutations = {
    setIsMLMDetected(state, value) {
        state.isMLMDetected = value
    },
}

export const getters = {
    allMLMs: state => state.allMLMs,
    isMLMInList: state => name => !!name && state.allMLMs.includes(name.toLowerCase()),
    getIsMLMDetected: state => state.isMLMDetected
}
