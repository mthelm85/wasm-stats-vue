export const state = () => ({
  contents: null,
})

export const mutations = {
  setContents(state, contents) {
    state.contents = contents
  },
}