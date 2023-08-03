<template>
    <div class="main">
        <div class="header">
            <h1><i class="fas fa-rocket icon"></i> Space X</h1>
        </div>
        <div class="charts">
            <div class="chart">
                <h2>Lançamentos de foguetes</h2>
                <div class="chart-container">
                    <PieChart v-if="dataLoaded" :launches="launches"></PieChart>
                </div>
                <div class="stats">
                    <h3>Resultados de lançamento:</h3>
                    <p>Total: <span class="total">{{ launchesData.total }}</span></p>
                    <p>Sucesso: <span class="success">{{ launchesData.success }}</span></p>
                    <p>Falha: <span class="fail">{{ launchesData.failed }}</span></p>
                </div>
            </div>
            <div class="chart">
                <h2>Lançamentos por ano</h2>
                
            </div>
        </div>
        <div class="header">
            <h2>Registros de lançamentos</h2>
        </div>
        <div class="search-container">
            <DataFilter
                :data="launches"
                @onHandleSearch="handleSearch($event)"
            ></DataFilter>
        </div>
        <div class="table-container">
            <table class="table table-secondary">
                <thead>
                    <tr>
                        <th>N° Vôo</th>
                        <th>Logo</th>
                        <th>Missão</th>
                        <th>Data de lançamento</th>
                        <th>Foguete</th>
                        <th 
                            @click="sortLaunches('success')" 
                            style="cursor: pointer;"
                        >
                            Resultado <i :class="`fa fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`"></i>
                        </th>
                        <th>Vídeo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="launch in launches.slice((currentPage - 1) * limit, currentPage * limit)" :key="launch.id">
                        <td class="" scope="col" style="font-weight: bold;">{{ launch.flight_number }}</td>
                        <td class="" width="10%">
                            <img :src="launch.links.patch.small" alt="Logo" class="img-thumbnail" />
                        </td>
                        <td class="" scope="col" style="font-weight: bold;">{{ launch.name }}</td>
                        <td class="" scope="col" style="font-weight: bold;">{{ new Date(launch.date_local).toLocaleDateString('pt-BR') }}</td>
                        <td class="" scope="col" style="font-weight: bold;">{{ launch.rocket_name }}</td>
                        <td 
                            :class="'mt-3 badge ' + (launch.success ? 'badge-success' : 'badge-danger')" 
                            scope="col" style="font-weight: bold;"
                        >{{ launch.success ? 'Sucesso' : 'Falha' }}</td>
                        <td class="" scope="col" style="font-weight: bold;">
                            <a :href="`https://www.youtube.com/watch?v=${launch.links.youtube_id}`" target="_blank">
                                <i class="fab fa-youtube" style="color: #f00; font-size: 2.5rem;"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <v-pagination
                v-model="currentPage"
                :page-count="totalPages"
                :classes="bootstrapPaginationClasses"
                :labels="paginationAnchorTexts"
                :limit="limit"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
import { launchServices } from '@/services/launchServices';
import DataFilter from './DataFilter.vue';
import vPagination from 'vue-plain-pagination';
import PieChart from './PieChart.vue';
import axios from 'axios'

export default {
    name: 'SpaceXComponent',
    components: {
        DataFilter,
        vPagination,
        PieChart,
    },
    inject: ['makeSpin'],
    data () {
        return {
            launches: [],
            filteredLaunches: [],
            launchesData: [],
            launchesByYear: [],
            sortBy: '',
            sortDirection: 'asc',
            currentPage: 1,
            limit: 5,
            totalPages: 1,
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link',
                buttonDisable: 'disabled',
            },
            paginationAnchorTexts: {
                first: '<i class="fa fa-angles-left"></i>',
                prev: '<i class="fa fa-angle-left">',
                next: '<i class="fa fa-angle-right">',
                last: '<i class="fa fa-angles-right"></i>'
            },
        };
    },
    async mounted() {
        this.makeSpin.value = true;

        this.launches = await launchServices.getLaunches();

        const rocketPromises = this.launches.map(async (launch) => {
            const rocketName = await launchServices.getRocket(launch.rocket);
            launch.rocket_name = rocketName;
            
            return launch;
        });

        await Promise.all(rocketPromises);

        this.totalPages = Math.ceil(this.launches.length / this.limit);

        const response = await axios.get('/launches/stats');

        this.launchesData = response.data.launchesData;
        this.launchesByYear = response.data.launchesByYear;
        
        this.makeSpin.value = false;

        this.dataLoaded = true;
        
        this.$emit('data-loaded', true);
    },
    methods: {
        async handleSearch(event) {
            const searchTerm = event.toLowerCase();

            if (searchTerm === '') {
                this.launches = await launchServices.getLaunches();
                this.totalPages = Math.ceil(this.launches.length / this.limit);
                this.currentPage = 1;
                window.location.reload();
                
                return;
            }

            const filteredLaunches = this.launches.filter((launch) => {
                const { name, rocket_name } = launch;

                return (
                    name.toLowerCase().includes(searchTerm) ||
                    rocket_name.toLowerCase().includes(searchTerm)
                );
            });

            this.totalPages = Math.ceil(filteredLaunches.length / this.limit) || 1;
            this.currentPage = 1;
            this.launches = (filteredLaunches.length === 0) ? [] : filteredLaunches;
        },

        sortLaunches(field) {
            if (this.sortBy === field) {
                this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc';
            } else {
                this.sortBy = field;
                this.sortDirection = 'asc';
            }

            this.launches.sort((a, b) => {
                const aValue = a[field];
                const bValue = b[field];

                if (aValue === bValue) {
                    return 0;
                }

                if (this.sortDirection === 'asc') {
                    return aValue < bValue ? -1 : 1;
                } else {
                    return aValue > bValue ? -1 : 1;
                }
            });
        },
    }

}
</script>

<style lang="scss" src="./style.scss" scoped></style>