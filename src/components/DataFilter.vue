<template>
    <div class="search-content">
            <input 
                type="text"
                class="search-box"
                v-model="searchTerm"
                placeholder="Search here"    
            />
            <div class="search-button">
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
.search-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    
    .search-box {
        width: 50%;
        height: 65%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        margin-bottom: 10px;
        background-color: #62626c;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 5px #303136;
        background-image: url('https://img.icons8.com/ios-filled/50/e87a0a/search--v1.png');
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 30px;

        &:focus {
            background-image: none;
        }
        
        &::placeholder {
            color: #fff;
            font-size: 1.2rem;
            font-weight: 500;
            text-align: start;
            padding: 5px 50px;
        }
    }

    .search-button {
        width: 20%;
        height: 65%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        background-color: #cf6900;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 5px #303136;

        .search-btn {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            border-radius: 10px;
            font-size: 1.2rem;
            font-weight: 600;
            color: #111;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
                background-color: #e87a0a;
            }
        }        
    }
}
</style>