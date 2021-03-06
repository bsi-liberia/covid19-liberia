<template>
  <div>
    <b-container>
      <h1 class="title">COVID-19 Dashboard</h1>
      <h3 class="subtitle">Data on the COVID-19 response in Liberia</h3>
      <template v-if="revenueData.length==0">
        <div class="text-center text-secondary">
          <hr />
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
          <hr />
        </div>
      </template>
      <template v-else>
        <b-badge class="last-updated" variant="light" pill>as of {{ lastUpdated }}</b-badge>
        <hr />
        <h2>Finances</h2>
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
        <hr />
        <h2>Cases</h2>
        <template v-if="cases.length==0">
          <div class="text-center text-secondary">
            <hr />
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
            <hr />
          </div>
        </template>
        <template v-else>
          <b-row>
            <b-col>
              <h3><b-badge variant="primary" style="width:100%">{{ totalCases }} Cases</b-badge></h3>
            </b-col>
            <b-col>
              <h3><b-badge fill variant="danger" style="width:100%">{{ totalDeaths }} Deaths</b-badge></h3>
            </b-col>
          </b-row>
        </template>
        <hr />
        <b-row>
          <b-col>
            <h2>Explore the data</h2>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col md="3">
            <h3>Cases</h3>
            <b-btn :to="{name: 'cases'}" block variant="primary">
              Cases &raquo;
            </b-btn>
          </b-col>
          <b-col md="3">
            <h3>Revenue</h3>
            <b-btn :to="{name: 'revenue'}" block variant="primary">
              {{ revenueData.length }} revenue entries &raquo;
            </b-btn>
          </b-col>
          <b-col md="3">
            <h3>Expenditure</h3>
            <b-btn :to="{name: 'expenditure'}" block variant="primary">
              {{ expenditureData.length }} expenditure entries &raquo;
            </b-btn>
          </b-col>
          <b-col md="3">
            <h3>In-Kind</h3>
            <b-btn :to="{name: 'in-kind'}" block variant="primary">
              {{ inKindData.length }} in-kind contributions &raquo;
            </b-btn>
          </b-col>
        </b-row>
        <SocialMedia url="http://covid19response.gov.lr/" />
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
    totalCases() {
      return this.$store.state.casesData.reduce((total, item) => {
        total += item.Cases
        return total
      }, 0)
    },
    totalDeaths() {
      return this.$store.state.casesData.reduce((total, item) => {
        total += item.Deaths
        return total
      }, 0)
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
      await this.$store.dispatch('getData')
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
