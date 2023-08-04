<template>
  <div v-if="dataLoaded">
    <vue-apex-charts type="bar" width="380" :options="chartOptions" :series="series"></vue-apex-charts>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'BarChart',
  components: {
    VueApexCharts,
  },
  props: {
    launchesByYear: {
      type: Object,
      required: true,
    },
    launches: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dataLoaded: false,
      series: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              position: 'top',
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Ano',
            style: {
              fontSize: '14px',
              fontWeight: 600,
            },
          },
        },
        yaxis: {
          categories: [],
          title: {
            text: 'Lançamentos',
            style: {
              fontSize: '14px',
              fontWeight: 600,
            },
          },
        },
        legend: {
          position: 'top',
          offsetY: 30,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
  watch: {
    launchesByYear: {
      immediate: true,
      handler() {
        var rockets = this.launches.map((launch) => {
          return launch.rocket_name;
        });

        var rocketsUnique = [...new Set(rockets)];

        var datas = {};
        rocketsUnique.forEach((rocket) => {
          datas[rocket] = Object.keys(this.launchesByYear).map((year) => {
            return this.launches.filter(
              (launch) =>
                launch.rocket_name === rocket &&
                new Date(launch.date_local).getFullYear() === parseInt(year)
            ).length;
          });
        });

        this.series = Object.keys(datas).map((rocket) => {
          return {
            name: rocket,
            data: datas[rocket],
          };
        });

        this.chartOptions.xaxis.categories = Object.keys(this.launchesByYear);

        this.dataLoaded = true;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
