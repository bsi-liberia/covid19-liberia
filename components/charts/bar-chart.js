import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    this.addPlugin({
      id: 'chartjs-plugin-datalabels'
    })
    this.renderChart(this.data, this.options)
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    }
  }
}
