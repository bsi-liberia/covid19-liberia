<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="8">
          <h2>Cases</h2>
        </b-col>
        <b-col md="4" class="text-md-right">
          <b-badge class="last-updated" variant="light" pill>as of {{ lastUpdatedCases }}</b-badge>
          <br />
          <SocialMedia url="http://covid19response.gov.lr/cases/" />
        </b-col>
      </b-row>
      <template v-if="cases.length==0">
        <div class="text-center text-secondary">
          <hr />
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
          <hr />
        </div>
      </template>
      <template v-else>
        <h3>Total cases over time</h3>
        <BarLineChart :barChartData="cases"
        labelField="Date"
        valueLabel="Number of cases"
        valueField="Cases"
        valuePrecision="0"
        chartType="bar"
        :commitments="false"
        :maximumValues="100"
        colour="#1f77b4" />
        <hr />
        <h3>By county, to date</h3>
        <b-badge class="last-updated" variant="light" pill>as of {{ lastUpdatedCases }}</b-badge>
        <BarChart :barChartData="counties"
        labelField="County"
        valueLabel="Number of cases"
        valueField="Cases"
        value2Label="Number of deaths"
        value2Field="Deaths"
        valuePrecision="0"
        colour="#1f77b4"
        colour2="#ff0000"
        chartType="bar"
        :legend="true"
        :commitments="false"
        :maximumValues="100" />
      </template>
    </b-container>
  </div>
</template>
<style scoped>

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3.5rem;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 2rem;
  word-spacing: 5px;
  /* padding-bottom: 15px; */
  max-width: 800px;
}

</style>
<script>
import config from '../nuxt.config'
import BarChart from '~/components/BarChart.vue'
import BarLineChart from '~/components/BarLineChart.vue'
import SocialMedia from '~/components/SocialMedia.vue'

export default {
  components: {
    BarChart,
    BarLineChart,
    SocialMedia
  },
  data() {
    return {
      title: config.head.title
    }
  },
  computed: {
    cases() {
      return this.$store.state.casesData
    },
    counties() {
      return this.$store.state.countiesData
    },
    lastUpdated() {
      return this.$store.state.lastUpdated
    },
    lastUpdatedCases() {
      return this.$store.state.lastUpdatedCases
    },
    revenueData() {
      return this.$store.state.revenueData
    },
    expenditureData() {
      return this.$store.state.expenditureData
    },
    inKindData() {
      return this.$store.state.inKindData
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
      await this.$store.dispatch('getCasesData')
      await this.$store.dispatch('getCountiesData')
      this.$nuxt.$loading.finish()
    }
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      if (this.cases.length == 0) {
        this.$nuxt.$loading.start()
        this.loadData()
      }
    })
  }
}
</script>
