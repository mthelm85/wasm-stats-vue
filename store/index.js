export const state = () => ({
  loadingData: false
})

export const mutations = {
  toggleLoadingData(state) {
      state.loadingData = !state.loadingData
  }
}