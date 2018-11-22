const abnormality = {
    namespaced: true,
    state: {
        companyname:"",
        mobile: "",
    },
    mutations: {
        update_companyname (state, companyname) {
            state.companyname = companyname
        },
        update_mobile (state, mobile) {
            state.mobile = mobile
        },
    },
    actions: {
        update_companyname (context, companyname) {
            context.commit('update_companyname', companyname)
        },
        update_mobile (context, mobile) {
            context.commit('update_mobile', mobile)
        }
    },
}

export default abnormality;