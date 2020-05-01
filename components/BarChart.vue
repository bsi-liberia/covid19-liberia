<template>
  <div>
    <BarChart
      :data="chartData"
      :options="chartOptions"
      class="bar-chart"
      v-if="chartType=='bar'"></BarChart>
    <PieChart
      :data="chartData"
      :options="chartOptions"
      class="pie-chart"
      v-if="chartType=='pie'"></PieChart>
    <b-table
      :items="barChartData"
      v-if="chartType=='table'"></b-table>
    <p class="text-muted mb-3 mt-3" v-if="barChartData.length > 20">
      Showing the top 20 entries. Click <b>Table</b> above to view all entries.
    </p>
  </div>
</template>
<style scoped>
.bar-chart {
  height: 300px;
  padding: 15px;
}
.pie-chart {
  height: 300px;
}
</style>
<script>
import PieChart from '~/components/charts/pie-chart'
import BarChart from '~/components/charts/bar-chart'
export default {
  name: 'SummaryBarChart',
  components: {
    BarChart,
    PieChart
  },
  props: ['barChartData', 'labelField', 'valueField', 'valueLabel', 'valuePrecision', 'step', 'chartType'],
  data() {
    return {
    }
  },
  computed: {
    chartOptions() {
      const tooltips = {
        callbacks: {
          title: ((tooltipItem, data) => {
            return this.chartData.labels[tooltipItem[0].index]
          }),
          label: ((tooltipItem, data) => {
            var label = this.valueLabel || '';

            if (label) {
                label += ': ';
            }
            var value = this.chartType=='bar' ?
              tooltipItem.yLabel :
              this.chartData.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            if (this.valuePrecision) {
              label += value.toLocaleString(undefined, {
                maximumFractionDigits: this.valuePrecision,
                minimumFractionDigits: this.valuePrecision
              })
            } else {
              label += value
            }
            return label;
          })
        }
      }
      const scales = {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                precision: this.valuePrecision,
                stepSize: this.step ? this.step : undefined
              },
              scaleLabel: {
                display: true,
                labelString: this.valueLabel
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                callback: function(tick) {
                  const characterLimit = 20
                  if (tick.length >= characterLimit) {
                    return (
                      tick
                        .slice(0, tick.length)
                        .substring(0, characterLimit - 1)
                        .trim() + '...'
                    )
                  }
                  return tick
                }
              }
            }
          ]
        }
      return {
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        tooltips: tooltips,
        scales: this.chartType == 'bar' ? scales : null
      }
    },
    chartData() {
      const colours = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf"
      ]
      return {
        datasets: [{
          label: this.labelField,
          fill: true,
          data: this.barChartData.map((ds) => { return ds[this.valueField] }).slice(0,20),
          backgroundColor: colours
        }],
        labels: this.barChartData.map((ds) => { return ds[this.labelField] }).slice(0,20),
      }
    }
  }
}
</script>
