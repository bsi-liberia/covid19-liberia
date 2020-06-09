<template>
  <div class="bar-chart-container">
    <BarChart
      :data="chartData"
      :options="chartOptions"
      class="bar-chart"
      v-if="chartType=='bar'"></BarChart>
  </div>
</template>
<style scoped>
.bar-chart-container {
  max-width: 100%;
  overflow-x: scroll;
}
.bar-chart {
  height: 600px;
  min-width: 800px;
}
.pie-chart {
  height: 400px;
}
</style>
<script>
import BarChart from '~/components/charts/bar-chart'
export default {
  name: 'SummaryBarChart',
  components: {
    BarChart
  },
  props: ['barChartData', 'labelField', 'valueField',
    'pctField', 'valueLabel', 'valuePrecision', 'step',
    'chartType', 'commitments', 'maximumValues', 'colour'],
  data() {
    return {
      colours: [
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
            var label = this.chartData.datasets[tooltipItem.datasetIndex].label || '';

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
          }),
          footer: ((tooltipItem, data) => {
            if (this.pctField) {
              const pct = this.barChartData[tooltipItem[0].index][this.pctField].toLocaleString(undefined, {
                  maximumFractionDigits: 1
                })
              return `${pct}% of total`
            }
          })
        }
      }
      const scales = {
        yAxes: [
          {
            id: 'y-axis-left',
            position: 'left',
            ticks: {
              beginAtZero: true,
              precision: this.valuePrecision,
              stepSize: this.step ? this.step : undefined
            },
            scaleLabel: {
              display: true,
              labelString: 'Number (per day)'
            },
            gridLines: {
              display: false
            }
          },
          {
            id: 'y-axis-right',
            position: 'right',
            ticks: {
              beginAtZero: true,
              precision: this.valuePrecision,
              stepSize: this.step ? this.step : undefined
            },
            scaleLabel: {
              display: true,
              labelString: 'Number (cumulative)'
            },
            gridLines: {
              display: false
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
            },
            gridLines: {
              display: false
            }
          }
        ]
      }
      const legend = {
        display: true
      }
      return {
        maintainAspectRatio: false,
        legend: legend,
        tooltips: tooltips,
        scales: this.chartType == 'bar' ? scales : null,
        layout: {
          padding: 20
        },
        plugins: {
          datalabels: {
            backgroundColor: function(context) {
              return context.dataset.backgroundColor;
            },
            display: (context) => {
              return (([0,1].includes(context.datasetIndex)) && (context.dataIndex == this.barChartData.length-1))
            },
            borderColor: 'white',
            borderRadius: 2,
            borderWidth: 2,
            color: 'white',
            textShadowColor : '#000000',
            textShadowBlur: 2,
            font: {
              weight: 'bold'
            },
            anchor: 'end'
          }
        }
      }
    },
    chartData() {
      return {
        datasets: [

        {
          label: "Deaths (cumulative)",
          fill: false,
          data: this.makeCumulativeData("Deaths"),
          backgroundColor: "rgb(255,0,0,0.5)",
          borderColor: "rgb(255,0,0,0.5)",
          borderWidth: 10,
          type: 'line',
          yAxisID: 'y-axis-right',
          pointBackgroundColor: "rgb(255,0,0,0)",
          pointHoverBackgroundColor: "rgb(255,0,0,0.5)",
          pointBorderColor: "rgb(255,0,0,0)",
          pointRadius: 1,
          pointHitRadius: 5,
          pointStyle: "circle",
          datalabels: {
            formatter: (value, context) => {
              return value
            }
          }
        },
        {
          label: "Cases (cumulative)",
          fill: false,
          data: this.makeCumulativeData("Cases"),
          backgroundColor: "rgb(31,119,180,0.5)",
          borderColor: "rgb(31,119,180,0.5)",
          borderWidth: 10,
          type: 'line',
          yAxisID: 'y-axis-right',
          pointBackgroundColor: "rgb(31,119,180,0)",
          pointHoverBackgroundColor: "rgb(31,119,180,0.8)",
          pointBorderColor: "rgb(31,119,180,0)",
          pointRadius: 1,
          pointHitRadius: 5,
          pointStyle: "circle",
          datalabels: {
            formatter: (value, context) => {
              return value
            }
          }
        },
        {
          label: "Deaths",
          fill: true,
          data: this.makeData("Deaths"),
          backgroundColor: "#ff0000",
          yAxisID: 'y-axis-left',
          type: 'line',
          showLine: false,
          pointRadius: (context) => {
            return this.makeData("Deaths")[context.dataIndex] > 0 ? 5 : 0
          }
        },
        {
          label: "Cases",
          fill: true,
          data: this.makeData("Cases"),
          backgroundColor: this.colour ? this.colour : this.colours,
          yAxisID: 'y-axis-left',
        }],
        labels: this.makeLabels(this.labelField),
      }
    }
  },
  methods: {
    makeData(valueField) {
      var _data = this.barChartData.map((ds) => {
        return ds[valueField]
      })
      return _data
    },
    makeCumulativeData(valueField) {
      var _data = this.barChartData.reduce((summary, ds, i) => {
        if (summary.length == 0) {
          summary.push(ds[valueField])
        } else {
          summary.push(ds[valueField] + summary[i-1])
        }
        return summary
      }, [])
      return _data
    },
    makeLabels(labelField) {
      return this.barChartData.map((ds) => { return ds[labelField] })
    },
    numberFormatter(value) {
      return value ? value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }) : ""
    }
  }
}
</script>
