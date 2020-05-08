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

.last-updated {
  font-style: italic;
}

</style>
<script>
import config from '../nuxt.config'

export default {
  components: {
  },
  data() {
    return {
      title: config.head.title
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
      this.$nuxt.$loading.finish()
    }
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.loadData()
    })
  }
}
</script>
