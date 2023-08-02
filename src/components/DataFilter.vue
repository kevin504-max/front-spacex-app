<template>
    <div class="search-container">
        <div class="search-input">
            <i class="fa fa-serach search-icon"></i>
            <input 
                type="text"
                class="search-box"
                v-model="searchTerm"
                placeholder="Search here"    
            />
        </div>
        <div class="serach-button">
            <button class="search-btn" @click="handleSearch">Buscar</button>
        </div>
    </div>
</template>

<script>


export default {
    name: 'DataFilter',
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data () {
        return {
            searchTerm: '',
        };
    },
    methods: {
        handleSearch() {
            this.$emit('onHandleSearch', this.searchTerm);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>