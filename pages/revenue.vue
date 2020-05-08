<template>
  <div>
    <b-container>
      <h2>Revenue</h2>
      <h3>Summary</h3>
      <b-row class="mb-2">
        <b-col>
          <BarChart :barChartData="revenueSummary"
          labelField="source"
          valueLabel="Funding (USD)"
          :valueField="revenueValueField"
          valuePrecision="2"
          :chartType="revenueChartType"
          :pctField="`${revenueValueField}_pct`"
          :commitments="true"
          :maximumValues="maximumValues" />
        </b-col>
      </b-row>
      <b-button v-b-toggle.sidebar-filters size="sm" variant="secondary" class="mt-2" block>
        <font-awesome-icon :icon="['fas', 'cog']" />
        <b>Chart options</b>
      </b-button>
      <hr />
      <h3>Data</h3>
      <b-table
      :items="revenueData"
      :fields="revenueTableFields"
      striped
      responsive>
        <template v-slot:cell(CashInKind)="data">
          <b-badge v-if="data.item.Cash>0" variant="primary">Cash</b-badge>
          <b-badge v-if="data.item['In Kind']>0">In Kind</b-badge>
        </template>
        <template v-slot:cell(OnBudget)="data">
          <b-badge v-if="data.item['On Budget']>0" variant="primary">On Budget</b-badge>
          <b-badge v-if="data.item['Off Budget']>0">Off budget</b-badge>
        </template>
        <template v-slot:cell(GrantLoan)="data">
          <b-badge v-if="data.item['Grant Component']>0" variant="primary">Grant</b-badge>
          <b-badge v-if="data.item['Loan Component']>0">Loan</b-badge>
        </template>
      </b-table>
      <b-sidebar id="sidebar-filters" title="Chart options" shadow>
        <div class="px-3 py-2">
          <h5>Display as</h5>
          <b-form-radio-group
            v-model="revenueChartType"
            :options="chartOptions"
            buttons
            button-variant="outline-primary"
            class="mb-2"></b-form-radio-group>
          <hr />
          <h5>Breakdown by</h5>
          <b-form-group
            class="mb-2">
            <b-form-select v-model="revenueBreakdown" :options="revenueBreakdownOptions"></b-form-select>
          </b-form-group>
          <hr />
          <h5>Filters</h5>
          <b-form-radio-group v-model="revenueValueField" :options="revenueValueFields" buttons button-variant="outline-secondary" class="mb-2" size="sm"></b-form-radio-group>
          <b-form-group
            label="Cash / In Kind contributions">
            <b-form-checkbox-group v-model="revenueCashFilter" :options="revenueCashFilterFields" stacked button-variant="outline-secondary" class="mb-2" size="sm"></b-form-checkbox-group>
          </b-form-group>
          <b-form-group
            label="On/off budget">
            <b-form-checkbox-group v-model="revenueOnBudgetFilter" :options="revenueOnBudgetFilterFields" stacked button-variant="outline-secondary" class="mb-2" size="sm"></b-form-checkbox-group>
          </b-form-group>
          <b-form-group
          label="Donor category">
            <b-form-checkbox-group
            v-model="categoryFilter" :options="categoryFilterOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <b-form-group
          label="Donor subcategory">
            <b-form-checkbox-group
            v-model="subCategoryFilter" :options="subCategoryFilterOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <b-form-group
          label="Donors">
            <b-form-checkbox-group
            v-model="donorFilter" :options="donorFilterOptions" stacked></b-form-checkbox-group>
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
      revenueCashFilter: ['cash', 'in-kind'],
      revenueCashFilterFields: [
        {'value': 'cash', 'text': 'Cash'},
        {'value': 'in-kind', 'text': 'In Kind'}
      ],
      revenueOnBudgetFilter: ['on-budget', 'off-budget'],
      revenueOnBudgetFilterFields: [
        {'value': 'on-budget', 'text': 'On budget'},
        {'value': 'off-budget', 'text': 'Off budget'}
      ],
      dateFilter: [],
      categoryFilter: [],
      subCategoryFilter: [],
      donorFilter: [],
      maximumValues: 10
    }
  },
  computed: {
    dateFilterOptions() {
      const monthNames = ["January", "February", "March",
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December"];
      var _dateValues = Object.values(this.$store.state.revenueData.reduce((out, item) => {
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
    categoryFilterOptions() {
      var _filters = Object.values(
        this.$store.state.revenueData.reduce((out, item) => {
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
      var _filters = Object.values(
        this.$store.state.revenueData.reduce((out, item) => {
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
    donorFilterOptions() {
      var _filters = Object.values(
        this.$store.state.revenueData.reduce((out, item) => {
        if (!(item.Donors in out)) {
          out[item.Donors] = {
            'value': item.Donors,
            'text': item.Donors,
            'category': item.Type1,
            'subCategory': item.Type2
          }
        }
        return out
      }, {}))
      this.donorFilter = _filters.map(item => {
        return item.value
      })
      return _filters
    },
    revenueData() {
      if ((this.revenueCashFilter.length == 0) &&
        (this.revenueOnBudgetFilter.length == 0) &&
        (this.dateFilter.length==0) &&
        (this.donorFilter.length == 0)) {
        return this.$store.state.revenueData
      }
      const checkCash = (item) => {
        if (this.revenueCashFilter == null) { return true }
        if (this.revenueCashFilter.includes('cash')) {
          if (item.Cash > 0) { return true }
        }
        if (this.revenueCashFilter.includes('in-kind')) {
          if (item['In Kind'] > 0) { return true }
        }
        return false
      }
      const checkOnBudget = (item) => {
        if (this.revenueOnBudgetFilter == null) { return true }
        if (this.revenueOnBudgetFilter.includes('on-budget')) {
          if (item['On Budget'] > 0) { return true }
        }
        if (this.revenueOnBudgetFilter.includes('off-budget')) {
          if (item['Off Budget'] > 0) { return true }
        }
        return false
      }
      const checkDate = (item) => {
        if (this.dateFilter.length == 0) { return true }
        const _date = new Date(item.Dates)
        if (this.dateFilter.includes(`${_date.getFullYear()}-${_date.getMonth()}`)) {
          return true
        }
        return false
      }
      const checkDonor = (item) => {
        if (this.donorFilter.length == 0) { return true }
        if (this.donorFilter.includes(item.Donors)) {
          return true
        }
        return false
      }
      return this.$store.state.revenueData.filter(item => {
          return checkCash(item) && checkOnBudget(item) && checkDate(item) && checkDonor(item)
      })
    },
    revenueTableFields() {
      return [
      { key: 'Donors', label: 'Donor', sortable: true },
      { key: 'Type1', label: 'Category', sortable: true },
      { key: 'Type2', label: 'Subcategory', sortable: true },
      { key: 'Dates', label: 'Date', sortable: true, formatter: 'dateFormatter' },
      { key: 'Commitment', label: 'Commitments (USD)', sortable: true, formatter: 'numberFormatter', class: 'number-value' },
      { key: 'Disbursement', label: 'Disbursements (USD)', sortable: true, formatter: 'numberFormatter', class: 'number-value'  },
      { key: 'CashInKind', label: 'Cash / In Kind', sortable: true },
      { key: 'OnBudget', label: 'On / Off Budget', sortable: true },
      { key: 'GrantLoan', label: 'Grant / Loan', sortable: true }
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
      const sumCommitments = this.revenueData.reduce((total, item) => {
        total += item.Commitment
        return total
      }, 0.0)
      const sumDisbursements = this.revenueData.reduce((total, item) => {
        total += item.Disbursement
        return total
      }, 0.0)
      return Object.values(this.revenueData.reduce((summary, item)=> {
        if (item.Commitment != "#ERROR!") {
          if (summary[item[this.revenueBreakdown]]) {
            summary[item[this.revenueBreakdown]].commitment += item.Commitment
            summary[item[this.revenueBreakdown]].disbursement += item.Disbursement
            summary[item[this.revenueBreakdown]].commitment_pct += (item.Commitment/sumCommitments)*100.0,
            summary[item[this.revenueBreakdown]].disbursement_pct += (item.Disbursement/sumDisbursements)*100.0
          } else {
            summary[item[this.revenueBreakdown]] = {
            'source': item[this.revenueBreakdown],
            'commitment': item.Commitment,
            'disbursement': item.Disbursement,
            'commitment_pct': (item.Commitment/sumCommitments)*100.0,
            'disbursement_pct': (item.Disbursement/sumDisbursements)*100.0
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
  watch: {
    categoryFilter: {
      handler: function(newCategoryFilter) {
        this.donorFilterOptions.forEach(donor => {
          // Add
          if ((newCategoryFilter.includes(donor.category))) {
            if (!(this.donorFilter.includes(donor.value))) {
              this.donorFilter.push(donor.value)
            }
          }
          // Remove
          else {
            if (this.donorFilter.includes(donor.value)) {
              const index = this.donorFilter.indexOf(donor.value)
              if (index > -1) {
                this.donorFilter.splice(index, 1);
              }
            }
          }
        })
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
    },
    subCategoryFilter: {
      handler: function(newSubCategoryFilter) {
        this.donorFilterOptions.forEach(donor => {
          // Add
          if ((newSubCategoryFilter.includes(donor.subCategory))) {
            if (!(this.donorFilter.includes(donor.value))) {
              this.donorFilter.push(donor.value)
            }
          }
          // Remove
          else {
            if (this.donorFilter.includes(donor.value)) {
              const index = this.donorFilter.indexOf(donor.value)
              if (index > -1) {
                this.donorFilter.splice(index, 1);
              }
            }
          }
        })
      }
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
