<template>
  <div>
    <b-container>
      <h2>About</h2>
      <img src="coat_of_arms_liberia.png" class="liberia-coat-of-arms" align="right"/>
      <p>This Dashboard shows data on the COVID-19 response in Liberia. It contains the following pages:</p>
      <ul>
        <li><b>Cases</b> &ndash; data on cases and deaths over time, according to data provided by the Ministry of Health and National Public Health Institute.</li>
        <li><b>Revenue</b> &ndash; data on total receipts from the Government of Liberia, donor partners including the World Bank,  businesses and individual contributors.</li>
        <li><b>Expenditure</b> &ndash; data on variuos expenditures including case management, surveillance, lab operations, risk and communication, support to county health team, etc.</li>
        <li><b>In-Kind Contributions</b> &ndash; data on in-kind rather than cash contributions from private businesses, non-governmental organizations, and ordinary citizens. This donations are  then converted to a monetary value using market prices to aid comparability.</li>
      </ul>
      <p>On the revenue, expenditure, and in-kind contributions pages, users can filter and adjust the display of the data, by clicking the grey "chart options" button below the chart.</p>
      <p>** All data for the dashboard are provided by the Incident Management Team & and the National Response Center, comprising of the Ministry of Health, National Public Health Institute, and the Ministry of Finance and Development Planning.</p>
      <p>The Dashboard is continually updated. Information on the last updated date is visible on each page.</p>
      <p>The site has been developed with the support of the Government of Sweden, via the Overseas Development Institute. It is managed by the Ministry of Finance and Development Planning. For more information, contact +231776263344.</p>
    </b-container>
  </div>
</template>
<style scoped>
.liberia-coat-of-arms {
  width: 200px;
  margin: 10px;
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
  },
  methods: {
  },
  watch: {
  },
  mounted() {
  }
}
</script>
