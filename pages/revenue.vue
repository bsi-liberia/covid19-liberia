<template>
  <div>
    <b-container>
      <h2>Revenue</h2>
      <b-row class="mb-2">
        <b-col md="8">
          <BarChart :barChartData="revenueSummary"
          labelField="source"
          valueLabel="Funding (USD)"
          :valueField="revenueValueField"
          valuePrecision="2"
          :chartType="revenueChartType" />
        </b-col>
        <b-col md="4" class="ml-md-auto text-md-right">
          <b-form-group
            label="Breakdown by"
            label-cols-lg="4"
            class="mb-2">
            <b-form-select v-model="revenueBreakdown" :options="revenueBreakdownOptions"></b-form-select>
          </b-form-group>
          <b-form-radio-group v-model="revenueChartType" :options="chartOptions" buttons button-variant="outline-primary" class="mb-2"></b-form-radio-group>
          <b-form-radio-group v-model="revenueValueField" :options="revenueValueFields" buttons button-variant="outline-secondary" class="mb-2" size="sm"></b-form-radio-group>
          <b-form-radio-group v-model="revenueCashFilter" :options="revenueCashFilterFields" buttons button-variant="outline-secondary" class="mb-2" size="sm"></b-form-radio-group>
          <b-form-radio-group v-model="revenueOnBudgetFilter" :options="revenueOnBudgetFilterFields" buttons button-variant="outline-secondary" class="mb-2" size="sm"></b-form-radio-group>
        </b-col>
      </b-row>
      <hr />
      <h3>Revenue data</h3>
      <b-table
      :items="revenueData"
      :fields="revenueTableFields"
      striped
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
      revenueBreakdown: 'Type1',
      revenueBreakdownOptions: [
        {'value': 'Type1', 'text': 'Category'},
        {'value': 'Type2', 'text': 'Subcategory'},
        {'value': 'Donors', 'text': 'Donor'}
      ],
      revenueChartType: 'pie',
      chartOptions: [
        {'value': 'pie', 'text': 'Pie chart'},
        {'value': 'bar', 'text': 'Bar chart'},
        {'value': 'table', 'text': 'Table'}
      ],
      revenueValueField: 'commitment',
      revenueValueFields: [
        {'value': 'commitment', 'text': 'Commitments'},
        {'value': 'disbursement', 'text': 'Disbursements'}
      ],
      revenueCashFilter: 'all',
      revenueCashFilterFields: [
        {'value': 'all', 'text': 'All contributions'},
        {'value': 'cash', 'text': 'Cash'},
        {'value': 'in-kind', 'text': 'In Kind'}
      ],
      revenueOnBudgetFilter: 'all',
      revenueOnBudgetFilterFields: [
        {'value': 'all', 'text': 'On/off budget'},
        {'value': 'cash', 'text': 'On budget'},
        {'value': 'in-kind', 'text': 'Off budget'}
      ],
    }
  },
  computed: {
    revenueData() {
      if ((this.revenueCashFilter == 'all') && (this.revenueOnBudgetFilter == 'all')) {
        return this.$store.state.revenueData
      }
      const checkCash = (item) => {
        if (this.revenueCashFilter == 'all') { return true }
        if (this.revenueCashFilter == 'cash') {
          if (item.Cash > 0) { return true }
        }
        if (this.revenueCashFilter == 'in-kind') {
          if (item['In Kind'] > 0) { return true }
        }
        return false
      }
      const checkOnBudget = (item) => {
        if (this.revenueOnBudgetFilter == 'all') { return true }
        if (this.revenueOnBudgetFilter == 'cash') {
          if (item['On Budget'] > 0) { return true }
        }
        if (this.revenueOnBudgetFilter == 'in-kind') {
          if (item['Off Budget'] > 0) { return true }
        }
        return false
      }
      return this.$store.state.revenueData.filter(item => {
          return checkCash(item) && checkOnBudget(item)
      })
    },
    revenueTableFields() {
      return [
      { key: 'Donors', label: 'Donor', sortable: true },
      { key: 'Type1', label: 'Category', sortable: true },
      { key: 'Type2', label: 'Subcategory', sortable: true },
      { key: 'Dates', label: 'Date', sortable: true, formatter: 'dateFormatter' },
      { key: 'Commitment', label: 'Commitments (USD)', sortable: true },
      { key: 'Disbursement', label: 'Disbursements (USD)', sortable: true },
      { key: 'Cash', sortable: true },
      { key: 'In Kind', sortable: true }
      ]
    },
    committed() {
      return this.revenueData.reduce((total, item) => {
        total += item.Commitment
        return total
      }, 0.00)
    },
    disbursed() {
      return this.revenueData.reduce((total, item) => {
        total += item.Disbursement
        return total
      }, 0.00)
    },
    spent() {
      return this.expenditureData.reduce((total, item) => {
        total += item.Disbursement
        return total
      }, 0.00)
    },
    revenueSummary() {
      return Object.values(this.revenueData.reduce((summary, item)=> {
        if (item.Commitment != "#ERROR!") {
          if (summary[item[this.revenueBreakdown]]) {
            summary[item[this.revenueBreakdown]].commitment += item.Commitment
            summary[item[this.revenueBreakdown]].disbursement += item.Disbursement
          } else {
            summary[item[this.revenueBreakdown]] = {
            'source': item[this.revenueBreakdown],
            'commitment': item.Commitment,
            'disbursement': item.Disbursement
            }
          }
        }
        return summary
      },
      {})).sort((a,b) =>
          a[this.revenueValueField] < b[this.revenueValueField] ? -1 : 1
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
    }
  }
}
</script>
