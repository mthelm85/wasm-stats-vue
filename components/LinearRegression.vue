<template>
    <v-card>
        <v-card-title>
            Define your model
        </v-card-title>
        <v-card-subtitle>
            <span v-if="!contents">
                Start by loading a CSV file with the menu on the left
            </span>
            Select from the available data elements to build your model
            <v-chip
                class="ma-2"
                color="orange"
                text-color="white"
                >
                <v-icon left>
                    mdi-star
                </v-icon>
                Important: The first element selected should be the dependent variable
            </v-chip>
        </v-card-subtitle>
        <v-card-text>
            <v-textarea
                readonly
                dense
                rounded
                filled
                v-model="userFormula"
                auto-grow="true"
            >
            </v-textarea>
        <v-btn :disabled="!(selectedElements.length > 1)" color="primary" @click="estimate">Estimate Coefficients</v-btn>
        </v-card-text>
            <div v-if="contents">
                <v-chip-group
                    active-class="primary--text"
                    column
                    class="ma-2"
                    v-model="selectedElements"
                    multiple
                >
                <v-chip
                v-for="tag in tags"
                :key="tag"
                :value="tag"
                >
                {{ tag }}
                </v-chip>
             </v-chip-group>
            </div>
    </v-card>
</template>
<script>
export default {
    name: 'LinearRegression',

data: () => ({
        coefs: null,
        selectedElements: [],
        wasm: null
    }),

async created () {
    let wasm = await import('wasm-stats')
    this.wasm = wasm
},

computed: {
    contents () {
        let contents = this.$store.state.fileUpload.contents
        return contents ? contents : null
    },

    tags () {
        return this.contents ? this.contents[0] : []
    },

    userFormula () {
        let lhs = `${this.selectedElements[0]} = `
        let rhs = this.selectedElements.slice(1, this.selectedElements.length).join(' + ')
        return this.selectedElements.length > 0 ? `${lhs} ${rhs}` : null
    }
},

methods: {
    estimate () {
        let is = []
        for (let i = 0; i < this.selectedElements.length; i++) {
            is.push(this.contents[0].indexOf(this.selectedElements[i]))
        }
        // let data = this.contents.slice(1, this.contents.length).map(el => { 
        //     return el.filter((_el, i) => is.includes(i))
        // })
        // let res = this.wasm.lin_reg_qr(data)
        // this.coefs = res
        let res = this.wasm.lin_req_qr2(this.contents.slice(1, this.contents.length), is)
        console.log(res)
    }
}
}
</script>