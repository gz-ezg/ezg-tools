<template>
    <div>
        {{companyname}}
        {{name}}
        {{tel}}
    </div>
</template>

<script>
export default {
    computed:{
        companyname(){
            return this.$store.state.companyname
        },
        name(){
            return this.$store.state.name
        },
        tel(){
            return this.$store.state.tel
        },
    }
}
</script>
