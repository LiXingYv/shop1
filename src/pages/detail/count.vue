<template>
    <div>
        in count
        <div class="sales-board-line-right">
            <v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>
        </div>
    </div>
</template>

<script>
    import VCounter from '../../components/base/counter.vue'
    export default {
        components:{
            VCounter,
        },
        data () {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>