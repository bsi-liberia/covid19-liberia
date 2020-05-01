<template>
  <div>
    <b-container>
      <h2>Expenditure</h2>
      <b-row class="mb-2">
        <b-col md="8">
          <b-form-group
            label="Show breakdown by">
            <b-form-select v-model="expenditureBreakdown" :options="expenditureBreakdownOptions"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="4" class="ml-md-auto text-md-right">
          <b-form-radio-group v-model="expenditureChartType" :options="chartOptions" buttons button-variant="outline-primary" class="mb-2"></b-form-radio-group>
        </b-col>
      </b-row>
      <BarChart :barChartData="expenditureSummary"
      labelField="source"
      valueLabel="Funding (USD)"
      valueField="disbursement"
      valuePrecision="2"
      :chartType="expenditureChartType" />
      <hr />
      <h3>Expenditure data</h3>
        <b-table
        :items="expenditureData"
        :fields="expenditureTableFields"
        responsive></b-table>
    </b-container>
  </div>
</template>
<style scoped>


</style>
<script>
import config from '../nuxt.config'
import BarChart from '~/components/BarChart.vue'

export default {
  components: {
    BarChart
  },
  data() {
    return {
      title: config.head.title,
      chartOptions: [
        {'value': 'pie', 'text': 'Pie chart'},
        {'value': 'bar', 'text': 'Bar chart'},
        {'value': 'table', 'text': 'Table'}
      ],
      expenditureBreakdown: 'Type1',
      expenditureBreakdownOptions: [
        {'value': 'Type1', 'text': 'Category'},
        {'value': 'Type2', 'text': 'Subcategory'}
      ],
      expenditureChartType: 'pie'
    }
  },
  computed: {
    expenditureData() {
      return this.$store.state.expenditureData
    },
    expenditureTableFields() {
      return [
      { key: 'Type1', sortable: true },
      { key: 'Type2', sortable: true },
      { key: 'Dates', sortable: true, formatter: 'dateFormatter' },
      { key: 'Disbursement', sortable: true },
      { key: 'Beneficiary Business', sortable: true },
      { key: 'Beneficiary Entity', sortable: true }
      ]
    },
    expenditureSummary() {
      return Object.values(this.expenditureData.reduce((summary, item)=> {
        if (item.Commitment != "#ERROR!") {
          if (summary[item[this.expenditureBreakdown]]) {
            summary[item[this.expenditureBreakdown]].disbursement += item.Disbursement
          } else {
            summary[item[this.expenditureBreakdown]] = {
            'source': item[this.expenditureBreakdown],
            'disbursement': item.Disbursement
            }
          }
        }
        return summary
      },
      {})).sort((a,b) =>
          a.disbursement < b.disbursement ? -1 : 1
      ).reverse()
    }
  },
  methods: {
    makeNumber(value) {
      const _value = parseFloat(value.replace(/,/g, ""))
      if (isNaN(_value)) { return 0.00 }
      return _value
    },
    dateFormatter(value) {
      return value ? value.toISOString().substr(0,10) : ""
    },
    numberFormatter(value) {
      return value ? value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }) : ""
    },
    async loadData() {
      await this.$store.dispatch('getData')
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
