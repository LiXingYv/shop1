/**
 * Created by Lee on 2018/6/25.
 */
import Vue from 'vue'
const state = {
    orderList: [],
    params: {}
}
const getters = {
    // orderList: function (state) {
    //     return state.orderList
    // }
    getOrderList: state => state.orderList
}
const actions = {
    fetchOrderList({commit,state}){
        Vue.http.post('/api/getOrderList', state.params)
            .then((res) => {
                commit('updateOrderList',res.data.data.list)
            },(err) =>{

            })
    }
}
const mutations = {
    updateOrderList (state,payload) {
        state.orderList = payload
    },
    updateParams (state,{key, val}) {
        state.params[key] = val
        console.log(state.params)
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}