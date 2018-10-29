import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        companyname: "则为",
        name: "",
        tel: "",
        userid: ""
    },
    mutations: {
        update_companyname (state, companyname) {
            state.companyname = companyname
        },
        update_name (state, name) {
            state.name = name
        },
        update_tel (state, tel) {
            state.tel = tel
        },
        update_userid (state, userid) {
            state.userid = userid
        },
    },
    actions: {
        // get_companyname: (state) => {
        //     return state.companyname
        // }
    },
    modules: {

    }
});

export default store;