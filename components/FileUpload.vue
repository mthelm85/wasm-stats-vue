<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
          <v-file-input
            accept=".csv"
            label="Upload CSV File"
            v-model="file"
            @change="checkFile(file)"
            :clearable="false"
          ></v-file-input>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations } from 'vuex'
import * as Papa from 'papaparse'

export default {
name: 'FileUpload',

data: () => ({
    file: null,
}),

computed: {
    contents () {
        return this.$store.state.fileUpload.contents
    },

    proceed () {
        return this.$store.state.fileUpload.fileSizeAlert
    }
},

methods: {
    ...mapMutations({
        toggleLoadingData: 'toggleLoadingData'
    }),

    async checkFile (file) {
        this.file = file
        let size = file.size / 1024 / 1024
        let preview = null
        let allNumeric = null
        if (size > 100) {
            this.$store.commit('fileUpload/setFileSize', size)
            this.$store.commit('fileUpload/toggleFileSizeAlert')
            preview = await this.previewFile(file)
            preview.data.slice(1, 11).every(arr => arr.every(el => typeof el == 'number'))
        } else if (!allNumeric) {
            this.$store.commit('fileUpload/toggleDataTypeAlert')
        } else {
            this.readFile(file)
        }
    },

    parseFile (file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                skipEmptyLines: true,
                dynamicTyping: true,
                worker: true,
                complete: function (results, _file) {
                    resolve(results)
                },
                error: function (err, _file) {
                    reject(err)
                }
            })
        })
    },

    parseFileStreaming (file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: function (_results, _file) {
                    resolve('Ok')
                },
                error: function (err, _file) {
                    reject(err)
                },
                step: this.step,
                worker: true,
            })
        })
    },

    previewFile (file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: function (results, _file) {
                    resolve(results)
                },
                error: function (err, _file) {
                    reject(err)
                },
                preview: 11,
                worker: true,
            })
        })
    },

    async readFile (file) {
        if (!this.$store.state.fileUpload.fileSizeAlert) {
            this.toggleLoadingData()
            let contents = await this.parseFile(file)
            this.$store.commit('fileUpload/setContents', contents.data)
            this.toggleLoadingData()
        }
    },

    step (results, _parser) {
        this.$store.commit('fileUpload/addContents', results.data) 
    },
},

watch: {
    proceed: function (n, o) {
        if (n == false) {
            this.readFile(this.file)
        }
    }
}
}
</script>