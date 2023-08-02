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
        </div>
        <div class="search-container">
            <DataFilter
                :data="launches"
                @onHandleSearch="onHandleSearch($event)"
            ></DataFilter>
        </div>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>N° Vôo</th>
                        <th>Logo</th>
                        <th>Missão</th>
                        <th>Data de lançamento</th>
                        <th>Foguete</th>
                        <th>Resultado</th>
                        <th>Vídeo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="launch in launches.slice((currentPage - 1) * limit, currentPage * limit)" :key="launch.id">
                        <td class="align-middle" style="font-weight: bold;">{{ launch.flight_number }}</td>
                        <td class="align-middle" style="font-weight: bold;">
                            <img :src="launch.links.patch.small" alt="Logo" class="img-thumbnail" />
                        </td>
                        <td class="align-middle" style="font-weight: bold;">{{ launch.name }}</td>
                        <td class="align-middle" style="font-weight: bold;">{{ new Date(launch.launch_date_utc).toLocaleDateString('pt-BR') }}</td>
                        <td class="align-middle" style="font-weight: bold;">{{ launch.rocket }}</td>
                        <td class="align-middle" style="font-weight: bold;">{{ launch.success ? 'Sucesso' : 'Falha' }}</td>
                        <td class="align-middle" style="font-weight: bold;">
                            <a :href="`https://www.youtube.com/watch?v=${launch.links.youtube_id}`" target="_blank">
                                <i class="fab fa-youtube" style="color: #f00; font-size: 2.5rem;"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <v-pagination
            v-model="currentPage"
            :page-count="totalPages"
            :classes="bootstrapPaginationClasses"
            :labels="paginationAnchorTexts"
            :limit="limit"
            class="pagination"
        ></v-pagination>
    </div>
</template>

<script>
import { launchServices } from '@/services/launchServices';
import DataFilter from './DataFilter.vue';
import vPagination from 'vue-plain-pagination';

export default {
    name: 'SpaceXComponent',
    components: {
        DataFilter,
        vPagination,
    },
    data () {
        return {
            launches: [],
            filteredLaunches: [],
            currentPage: 1,
            limit: 5,
            totalPages: 1,
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link',
                buttonDisable: 'disabled'
            },
            paginationAnchorTexts: {
                first: '<i class="fa fa-angles-left"></i>',
                prev: '<i class="fa fa-angle-left">',
                next: '<i class="fa fa-angle-right">',
                last: '<i class="fa fa-angles-right"></i>'
            }
        };
    },
    async mounted() {
        this.launches = await launchServices.getLaunches();

        this.totalPages = Math.ceil(this.launches.length / this.limit);
    },
    methods: {
        async handleSearch(event) {
            const searchTerm = event.toLowerCase();

            if (searchTerm === '') {
                this.launches = await launchServices.getLaunches();
                this.totalPages = Math.ceil(this.launches.length / this.limit);
                this.currentPage = 1;
                
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

            this.totalPages = Math.ceil(filteredLaunches.length / this.limit) || 1;
            this.currentPage = 1;
            this.launches = (filteredLaunches.length === 0) ? [] : filteredLaunches;
        }
    }

}
</script>

<style lang="scss" src="./style.scss" scoped></style>