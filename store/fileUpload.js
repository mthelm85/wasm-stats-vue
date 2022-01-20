export const state = () => ({
  contents: [],
  dataTypeAlert: false,
  fileSizeAlert: false,
  fileSize: null
})

export const mutations = {
  addContents(state, row) {
    state.contents.push(row)
  },
  setContents(state, contents) {
    state.contents = contents
  },
  setFileSize(state, size) {
    state.fileSize = size
  },
  toggleDataTypeAlert(state) {
    state.dataTypeAlert = !state.dataTypeAlert
  },
  toggleFileSizeAlert(state) {
    state.fileSizeAlert = !state.fileSizeAlert
  }
}