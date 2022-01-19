<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
          <v-file-input
            accept=".csv"
            label="File"
            v-model="file"
            @change="readFile(file)"
            :clearable=false
          ></v-file-input>
          <v-btn @click="filter">Filter</v-btn>
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

async created () {
    let wasm = await import('wasm-stats')
    this.wasm = wasm
},

methods: {
    filter () {
        let res = this.wasm.lin_reg_qr(this.contents.slice(1, this.contents.length + 1))  
        this.coefs = res
        console.log(this.coefs)
    },

    async JSON (file) {
    let parsed = await Papa.parse(file, { skipEmptyLines: true, dynamicTyping: true })
    return parsed.data
    },

    readFile (file) {
    const reader = new FileReader()
    reader.onload = async e => {
        let contents = await this.JSON(e.target.result)
        this.$store.commit('fileUpload/set', contents)
    }
    reader.readAsText(file)
    },
}
}
</script>