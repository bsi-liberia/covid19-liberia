<template>
  <div>
    <b-container>
      <h1 class="title">COVID-19 Dashboard</h1>
      <h3 class="subtitle">Revenue and expenditure data on the COVID-19 response in Liberia </h3>
      <b-badge class="last-updated" variant="light" pill>as of {{ lastUpdated }}</b-badge>
      <hr />
      <h2>Summary</h2>
      <b-progress :max="committed" variant="success" height="30px" show-label>
        <b-progress-bar :value="disbursed" variant="success" :label="`USD ${numberFormatter(disbursed)} Disbursed`"></b-progress-bar>
        <b-progress-bar :value="committed-disbursed" variant="secondary" striped :label="`USD ${numberFormatter(committed)} Not yet disbursed`"></b-progress-bar>
      </b-progress>
      <small>Out of USD {{ numberFormatter(committed) }} committed (cash only)</small>
      <hr />
      <h3>Usage of funds</h3>
      <b-progress :max="disbursed" variant="success" height="30px" show-label>
        <b-progress-bar :value="spent" variant="primary" :label="`USD ${numberFormatter(spent)} Spent`"></b-progress-bar>
        <b-progress-bar :value="disbursed-spent" variant="secondary" striped :label="`USD ${numberFormatter(disbursed-spent)} Unspent`"></b-progress-bar>
      </b-progress>
      <small>Out of USD {{ numberFormatter(disbursed) }} disbursed (cash only)</small>
    </b-container>
  </div>
</template>
<style scoped>

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 4rem;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 2.5rem;
  word-spacing: 5px;
  /* padding-bottom: 15px; */
  max-width: 800px;
}

.last-updated {
  font-style: italic;
}

</style>
<script>
import config from '../nuxt.config'
import BarChart from '~/components/BarChart.vue'
import axios from 'axios'
import csvtojson from 'csvtojson'

export default {
  components: {
    BarChart
  },
  data() {
    return {
      title: config.head.title,
      dataURL: "https://docs.google.com/spreadsheets/d/1gFh5PF4XKoxSSaIxP9E-iZi_xbuyahfAXmhr2j3I1x0/export?format=csv",
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
      expenditureBreakdown: 'Type1',
      expenditureBreakdownOptions: [
        {'value': 'Type1', 'text': 'Category'},
        {'value': 'Type2', 'text': 'Subcategory'}
      ],
      expenditureChartType: 'pie'
    }
  },
  computed: {
    lastUpdated() {
      return this.$store.state.lastUpdated
    },
    revenueData() {
      return this.$store.state.revenueData
    },
    expenditureData() {
      return this.$store.state.expenditureData
    },
    revenueTableFields() {
      return ['Donors', 'Type1', 'Type2', 'Dates',
      'Commitment', 'Disbursement', 'Cash', 'In Kind'].map(field => {
          return {
            key: field,
            sortable: true
          }
      })
    },
    expenditureTableFields() {
      return ['Type1', 'Type2', 'Dates', 'Disbursement',
      'Beneficiary Business', 'Beneficiary Entity'].map(field => {
          return {
            key: field,
            sortable: true
          }
      })
    },
    committed() {
      return this.revenueData.reduce((total, item) => {
        if (item.Cash > 0) {
          total += item.Commitment
        }
        return total
      }, 0.00)
    },
    disbursed() {
      return this.revenueData.reduce((total, item) => {
        if (item.Cash > 0) {
          total += item.Disbursement
        }
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
  },
  watch: {
    useCache() {
      this.$store.commit('setOriginalActivityData', [])
      this.loadData()
    },
    IATISource() {
      this.$store.commit('setOriginalActivityData', [])
      this.loadData()
    },
    selectedCountry(value) {
      if (value) {
        this.summaryLabelField = 'organisation'
      }
    },
    selectedReportingOrg(value) {
      if (value) {
        this.summaryLabelField = 'country'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.loadData()
    })
  }
}
</script>
