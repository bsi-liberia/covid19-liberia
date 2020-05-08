<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="8">
          <h2>In Kind Contributions</h2>
        </b-col>
        <b-col md="4" class="text-md-right">
          <b-badge class="last-updated" variant="light">as of {{ lastUpdated }}</b-badge>
        </b-col>
      </b-row>
      <h3>Summary</h3>
      <b-row class="mb-2">
        <b-col>
          <BarChart :barChartData="inKindSummary"
          labelField="source"
          valueLabel="Funding (USD) equivalent"
          valueField="disbursement"
          valuePrecision="2"
          :chartType="inKindChartType"
          pctField="disbursement_pct"
          :commitments="false" />
        </b-col>
      </b-row>
        <b-button v-b-toggle.sidebar-filters size="sm" variant="secondary" class="mt-2" block>
          <font-awesome-icon :icon="['fas', 'cog']" />
          <b>Chart options</b>
        </b-button>
      <hr />
      <h3>Data</h3>
        <b-table
        :items="inKindData"
        :fields="inKindTableFields"
        striped
        responsive></b-table>
      <b-sidebar id="sidebar-filters" title="Chart options" shadow="lg">
        <div class="px-3 py-2">
          <h5>Display as</h5>
          <b-form-radio-group v-model="inKindChartType" :options="chartOptions" buttons button-variant="outline-primary" class="mb-2"></b-form-radio-group>
          <h5>Breakdown by</h5>
          <b-form-group
            class="mb-2">
            <b-form-select v-model="inKindBreakdown" :options="inKindBreakdownOptions"></b-form-select>
          </b-form-group>
          <h5>Filters</h5>
          <b-form-group
          label="Response Center">
            <b-form-checkbox-group
            v-model="responseCenterFilter" :options="responseCenterFilterOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <b-form-group
          label="Donor Category">
            <b-form-checkbox-group
            v-model="categoryFilter" :options="categoryFilterOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <b-form-group
          label="Donor Subcategory">
            <b-form-checkbox-group
            v-model="subCategoryFilter" :options="subCategoryFilterOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <b-form-group
          label="Dates">
            <b-form-checkbox-group
            v-model="dateFilter" :options="dateFilterOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <hr />
          <h5>Maximum values</h5>
          <b-form-group
            :description="`Show the top ${maximumValues} values`">
            <b-form-select v-model="maximumValues" :options="[5, 10, 20, 100]"></b-form-select>
          </b-form-group>
        </div>
      </b-sidebar>
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
      inKindBreakdown: 'Response Center',
      inKindBreakdownOptions: [,
        {'value': 'Response Center', 'text': 'Response Center'},
        {'value': 'Type1', 'text': 'Donor Category'},
        {'value': 'Type2', 'text': 'Donor Subcategory'}
      ],
      inKindChartType: 'pie',
      dateFilter: [],
      categoryFilter: [],
      subCategoryFilter: [],
      responseCenterFilter: [],
      maximumValues: 10
    }
  },
  computed: {
    lastUpdated() {
      return this.$store.state.lastUpdatedInKind
    },
    dateFilterOptions() {
      const monthNames = ["January", "February", "March",
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December"];
      var _dateValues = Object.values(this.$store.state.inKindData.reduce((out, item) => {
        var _date = new Date(item.Dates)
        if (!(`${_date.getFullYear()}-${_date.getMonth()}` in out)) {
          out[`${_date.getFullYear()}-${_date.getMonth()}`] = {
            'value': `${_date.getFullYear()}-${_date.getMonth()}`,
            'text': `${monthNames[_date.getMonth()]} ${_date.getFullYear()}`
          }
        }
        return out
      }, {}))
      this.dateFilter = _dateValues.map(_date => {
        return _date.value
      })
      return _dateValues
    },
    responseCenterFilterOptions() {
      var _filters = Object.values(this.$store.state.inKindData.reduce((out, item) => {
        if (!(item['Response Center'] in out)) {
          out[item['Response Center']] = {
            'value': item['Response Center'],
            'text': item['Response Center']
          }
        }
        return out
      }, {}))
      this.responseCenterFilter = _filters.map(item => {
        return item.value
      })
      return _filters
    },
    categoryFilterOptions() {
      var _filters = Object.values(this.$store.state.inKindData.reduce((out, item) => {
        if (!(item.Type1 in out)) {
          out[item.Type1] = {
            'value': item.Type1,
            'text': item.Type1
          }
        }
        return out
      }, {}))
      this.categoryFilter = _filters.map(item => {
        return item.value
      })
      return _filters
    },
    subCategoryFilterOptions() {
      var _filters = Object.values(this.$store.state.inKindData.reduce((out, item) => {
        if (!(item.Type2 in out)) {
          out[item.Type2] = {
            'value': item.Type2,
            'text': item.Type2,
            'category': item.Type1
          }
        }
        return out
      }, {}))
      this.subCategoryFilter = _filters.map(item => {
        return item.value
      })
      return _filters
    },
    inKindData() {
      const checkDate = (item) => {
        if (this.dateFilter.length == 0) { return true }
        const _date = new Date(item.Dates)
        if (this.dateFilter.includes(`${_date.getFullYear()}-${_date.getMonth()}`)) {
          return true
        }
        return false
      }
      const checkSubCategory = (item) => {
        if (this.subCategoryFilter.length == 0) { return true }
        if (this.subCategoryFilter.includes(item.Type2)) {
          return true
        }
        return false
      }
      const checkResponseCenter = (item) => {
        if (this.responseCenterFilter.length == 0) { return true }
        if (this.responseCenterFilter.includes(item['Response Center'])) {
          return true
        }
        return false
      }
      return this.$store.state.inKindData.filter(item => {
          return checkDate(item) && checkSubCategory(item) && checkResponseCenter(item)
      })
    },
    inKindTableFields() {
      return [
      { key: 'Donors', label: 'Donor', sortable: true },
      { key: 'Type1', label: 'Category', sortable: true },
      { key: 'Type2', label: 'Subcategory', sortable: true },
      { key: 'Dates', label: 'Dates', sortable: true, formatter: 'dateFormatter' },
      { key: 'Disbursement', label: 'Amount (USD)', sortable: true, formatter: 'numberFormatter', class: 'number-value' },
      { key: 'Response Center', sortable: true }
      ]
    },
    inKindSummary() {
      const sumDisbursements = this.inKindData.reduce((total, item) => {
        total += item.Disbursement
        return total
      }, 0.0)
      return Object.values(this.inKindData.reduce((summary, item)=> {
        if (item.Commitment != "#ERROR!") {
          if (summary[item[this.inKindBreakdown]]) {
            summary[item[this.inKindBreakdown]].disbursement += item.Disbursement
            summary[item[this.inKindBreakdown]].disbursement_pct += (item.Disbursement/sumDisbursements)*100.0
          } else {
            summary[item[this.inKindBreakdown]] = {
            'source': item[this.inKindBreakdown],
            'disbursement': item.Disbursement,
            'disbursement_pct': (item.Disbursement/sumDisbursements)*100.0
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
  },
  watch: {
    categoryFilter: {
      handler: function(newCategoryFilter) {
        this.subCategoryFilterOptions.forEach(subCategory => {
          // Add
          if ((newCategoryFilter.includes(subCategory.category))) {
            if (!(this.subCategoryFilter.includes(subCategory.value))) {
              this.subCategoryFilter.push(subCategory.value)
            }
          }
          // Remove
          else {
            if (this.subCategoryFilter.includes(subCategory.value)) {
              const index = this.subCategoryFilter.indexOf(subCategory.value)
              if (index > -1) {
                this.subCategoryFilter.splice(index, 1);
              }
            }
          }
        })
      }
    }
  },
}
</script>
