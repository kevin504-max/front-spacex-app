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
            <table>
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
                    <tr v-for="launch in launches" :key="launch.id">
                        <td>{{ launch.flight_number }}</td>
                        <td>
                            <img :src="launch.links.patch.small" alt="Logo" />
                        </td>
                        <td>{{ launch.name }}</td>
                        <td>{{ new Date(launch.launch_date_utc).toLocaleDateString('pt-BR') }}</td>
                        <td>{{ launch.rocket }}</td>
                        <td>{{ launch.success }}</td>
                        <td>
                            <a :href="`https://www.youtube.com/watch?v=${launch.links.youtube_id}`" target="_blank">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { launchServices } from '@/services/launchServices';
import DataFilter from './DataFilter.vue';

export default {
    name: 'SpaceXComponent',
    components: {
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