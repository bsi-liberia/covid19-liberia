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
      :fields="tableFields"
      v-if="chartType=='table'"
      striped>
      <template v-slot:thead-top="data">
        <b-tr>
          <b-th></b-th>
          <b-th colspan="2" v-if="commitments" class="number-value">Commitments</b-th>
          <b-th colspan="2" class="number-value">Disbursements</b-th>
          <b-th colspan="2" v-if="commitments" class="number-value">Outstanding</b-th>
        </b-tr>
      </template>
    </b-table>
      </b-table>
    <p class="text-muted mb-3 mt-3" v-if="(barChartData.length > maximumValues) && (chartType != 'table')">
      Showing the top {{ maximumValues }} entries. Change to <b>Table</b> in
      chart options to view all {{ barChartData.length}} entries.
    </p>
  </div>
</template>
<style scoped>
.bar-chart {
  height: 400px;
}
.pie-chart {
  height: 400px;
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
  props: ['barChartData', 'labelField', 'valueField',
    'pctField', 'valueLabel', 'value2Label', 'value2Field', 'valuePrecision', 'step',
    'chartType', 'commitments', 'maximumValues', 'colour', 'colour2', 'legend'],
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
    tableFields() {
      if (!this.commitments) {
        return [
          {
            key: 'source',
            sortable: true
          },
          {
            key: 'disbursement',
            label: 'USD',
            sortable: true,
            formatter: 'numberFormatter',
            class: 'number-value'
          },
          {
            key: 'disbursement_pct',
            label: '%',
            sortable: true,
            formatter: 'numberFormatter',
            class: 'number-value'
          },
        ]
      }
      return [
        {
          key: 'source',
          sortable: true
        },
        {
          key: 'commitment',
          label: 'USD',
          sortable: true,
          formatter: 'numberFormatter',
          class: 'number-value'
        },
        {
          key: 'commitment_pct',
          label: '%',
          sortable: true,
          formatter: 'numberFormatter',
          class: 'number-value'
        },
        {
          key: 'disbursement',
          label: 'USD',
          sortable: true,
          formatter: 'numberFormatter',
          class: 'number-value'
        },
        {
          key: 'disbursement_pct',
          label: '%',
          sortable: true,
          formatter: 'numberFormatter',
          class: 'number-value'
        },
        {
          key: 'outstanding',
          label: 'USD',
          sortable: true,
          formatter: 'numberFormatter',
          class: 'number-value'
        },
        {
          key: 'outstanding_pct',
          label: '%',
          sortable: true,
          formatter: 'numberFormatter',
          class: 'number-value'
        },
      ]
    },
    chartOptions() {
      const tooltips = {
        callbacks: {
          title: ((tooltipItem, data) => {
            return this.chartData.labels[tooltipItem[0].index]
          }),
          label: ((tooltipItem, data) => {
            const makeLabel = () => {
              return tooltipItem.datasetIndex == 0 ? this.valueLabel : this.value2Label
            }
            var label = makeLabel() || '';

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
      const yAxisLeft = {
        id: 'y-axis-left',
        position: 'left',
        ticks: {
          beginAtZero: true,
          precision: this.valuePrecision,
          stepSize: this.step ? this.step : undefined
        },
        scaleLabel: {
          display: true,
          labelString: this.valueLabel
        },
        gridLines: {
          display: false
        }
      }
      const yAxisRight = {
        id: 'y-axis-right',
        position: 'right',
        ticks: {
          beginAtZero: true,
          precision: this.valuePrecision,
          stepSize: this.step ? this.step : undefined
        },
        scaleLabel: {
          display: true,
          labelString: this.value2Label
        },
        gridLines: {
          display: false
        }
      }
      const scales = {
        yAxes: this.value2Label ? [yAxisLeft, yAxisRight] : [yAxisLeft],
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
        legend: (this.chartType == 'pie' || this.legend) ? legend : null,
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
              if (this.pctField) {
                return this.barChartData[context.dataIndex][this.pctField] > 5
              }
              return true
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
            anchor: 'end',
            align: 'top'
          }
        }
      }
    },
    chartData() {
      const datasets = [{
        label: this.valueLabel,
        fill: true,
        yAxisID: 'y-axis-left',
        data: this.makeData(this.valueField),
        backgroundColor: this.colour ? this.colour : this.colours,
        datalabels: {
          formatter: (value, context) => {
            if (this.pctField) {
              const pct = this.barChartData[context.dataIndex][this.pctField].toLocaleString(undefined, {
                maximumFractionDigits: 1
              })
              return `${pct}%`
            }
            return value
          }
        }
      }]
      if (this.value2Label) {
        const datasets2 = {
          label: this.value2Label,
          fill: true,
          yAxisID: 'y-axis-right',
          data: this.makeData(this.value2Field),
          backgroundColor: this.colour2 ? this.colour2 : this.colours,
          datalabels: {
            formatter: (value, context) => {
              if (this.pctField) {
                const pct = this.barChartData[context.dataIndex][this.pctField].toLocaleString(undefined, {
                  maximumFractionDigits: 1
                })
                return `${pct}%`
              }
              return value
            }
          }
        }
        datasets.push(datasets2)
      }

      return {
        datasets: datasets,
        labels: this.makeLabels(),
      }
    }
  },
  methods: {
    makeData(valueField) {
      var _data = this.barChartData.map((ds) => {
        return ds[valueField]
      }).slice(0, this.maximumValues)
      if (this.barChartData.length > this.maximumValues) {
        _data.push(
          this.barChartData.slice(this.maximumValues).reduce((total, item) => {
            total += item[valueField]
            return total
          }, 0.0)
        )
      }
      return _data
    },
    makeLabels() {
      var _labels = this.barChartData.map((ds) => { return ds[this.labelField] }).slice(0, this.maximumValues)
      if (this.barChartData.length > this.maximumValues) {
        _labels.push("Other")
      }
      return _labels
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
