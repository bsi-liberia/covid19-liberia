import { Doughnut, mixins } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default {
  extends: Doughnut,
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
