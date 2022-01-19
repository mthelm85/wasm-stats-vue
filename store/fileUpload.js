export const state = () => ({
  contents: null
})

export const mutations = {
  set(state, contents) {
    state.contents = contents
  },
  remove(state) {
    state.contents = null
  }
}