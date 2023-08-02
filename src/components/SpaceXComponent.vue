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
                <DataFilter
                    :data="launches"
                    @onHandleSearch="onHandleSearch($event)"
                ></DataFilter>
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
    },
    methods: {
        async handleSearch(event) {
            const searchTerm = event.toLowerCase();

            if (searchTerm === '') {
                this.launches = await launchServices.getLaunches();
                
                return;
            }

            const filteredLaunches = this.launches.filter((launch) => {
                const { name, rocket, success } = launch;

                return (
                    name.toLowerCase().includes(searchTerm) ||
                    rocket.toLowerCase().includes(searchTerm) ||
                    success.toString().toLowerCase().includes(searchTerm)
                );
            });

            this.products = (filteredLaunches.length === 0) ? [] : filteredLaunches;
        }
    }

}
</script>

<style lang="scss" src="./style.scss" scoped></style>