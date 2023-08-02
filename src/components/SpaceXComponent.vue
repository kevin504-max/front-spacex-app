<template>
    <div class="main">
        <div class="header">
            <h1><i class="fas fa-rocket icon"></i> Space X</h1>
        </div>
        <div class="charts">
            <div class="chart">
                <h2>Lançamentos de foguetes</h2>
                
            </div>
            <div class="chart">
                <h2>Lançamentos por ano</h2>
                
            </div>
        </div>
        <div class="header">
            <h2>Registros de lançamentos</h2>
            <div class="search-container">
                <DataFilter></DataFilter>
            </div>
        </div>
    </div>
</template>

<script>
import { launchServices } from '@/services/launchServices';
import DataFilter from './DataFilter.vue';

export default {
    name: 'SpaceXComponent',
    componentes: {
        DataFilter,
    },
    data () {
        return {
            launches: [],
            filteredLaunches: [],
        };
    },
    async mounted() {
        this.launches = await launchServices.getLaunches();
    }

}
</script>

<style lang="scss" src="./style.scss" scoped></style>