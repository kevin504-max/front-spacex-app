<template>
    <div v-if="dataLoaded">
        <vue-apex-charts type="pie" width="380" :options="chartOptions" :series="series"></vue-apex-charts>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    name: 'PieChart',
    components: {
        VueApexCharts,
    },
    props: {
        launches: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            series: [],
            chartOptions: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: [
                    'Falcon 1',
                    'Falcon 9',
                    'Falcon Heavy',
                ],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                            legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        };
    },
    watch: {
        launches: {
            immediate: true,
            handler(newLaunches) {
                var rockets = newLaunches.reduce((acc, launch) => {
                    const rocket = acc.find((rocket) => rocket.name === launch.rocket_name);

                    if (rocket) {
                        rocket.data[0] += 1;
                    } else {
                        acc.push({
                            name: launch.rocket_name,
                            data: [1]
                        });
                    }

                    return acc;
                }, []);

                this.series = rockets.map((rocket) => {
                    return rocket.data[0];
                });

                this.chartOptions.labels = rockets.map((rocket) => {
                    return rocket.name;
                });

                this.dataLoaded = true;
            },
        },
    },
}
</script>

<style lang="scss" scoped>

</style>