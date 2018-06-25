<template>
   <div style="width:1000px;margin: 0 auto;">
       <v-selection1 :selections="productTypes"></v-selection1>
   </div>
</template>

<script>
    import VSelection1 from '../components/base/selection1'
    export default {
        components: {
            VSelection1
        },
        data () {
            return {
                productTypes:[
                    {
                        label:'入门版',
                        value:0
                    },
                    {
                        label:'中级版',
                        value:1
                    },
                    {
                        label:'高级版',
                        value:2
                    }
                ]
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .buy-dialog-title {
        font-size: 16px;
        font-weight: bold;
    }
    .buy-dialog-btn {
        margin-top: 20px;
    }
    .buy-dialog-table {
        width: 100%;
        margin-bottom: 20px;
    }
    .buy-dialog-table td,
    .buy-dialog-table th{
        border: 1px solid #e3e3e3;
        text-align: center;
        padding: 5px 0;
    }
    .buy-dialog-table th {
        background: #4fc08d;
        color: #fff;
        border: 1px solid #4fc08d;
    }
</style>