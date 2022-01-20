<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
          <v-file-input
            accept=".csv"
            label="Upload CSV File"
            v-model="file"
            @change="readFile(file)"
            :clearable=false
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
    coefs: null
}),

computed: {
    contents () {
        return this.$store.state.fileUpload.contents
    },

    matrix () {
        return this.$store.state.fileUpload.contents.slice(1, this.$store.state.fileUpload.contents.length + 1)
    }
},

methods: {
    JSON (file) {
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

    ...mapMutations({
        toggleLoadingData: 'toggleLoadingData'
    }),

    readFile (file) {
        this.toggleLoadingData()
        const reader = new FileReader()
        reader.onload = async e => {
            let contents = await this.JSON(e.target.result)
            this.$store.commit('fileUpload/setContents', contents.data)
            this.toggleLoadingData()
        }
        reader.readAsText(file)
    },
}
}
</script>