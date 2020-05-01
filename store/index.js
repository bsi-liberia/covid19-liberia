import axios from 'axios'
import config from '../nuxt.config'
import Vue from 'vue'
import csvtojson from 'csvtojson'


export const state = () => ({
  revenueData: [],
  expenditureData: [],
  lastUpdated: null,
  dataURL: "https://docs.google.com/spreadsheets/d/1gFh5PF4XKoxSSaIxP9E-iZi_xbuyahfAXmhr2j3I1x0/export?format=csv"
})


export const mutations = {
  setRevenueData(state, revenueData) {
    state.revenueData = revenueData
  },
  setExpenditureData(state, expenditureData) {
    state.expenditureData = expenditureData
  },
  setLastUpdated(state) {
    state.lastUpdated = new Date(Math.max.apply(
      null, state.expenditureData.map(item => { return item.Dates })
    )).toISOString().substr(0, 10)
  }
}


export const actions = {
  async getData({ commit, state }) {
    function makeNumber(value) {
      const _value = parseFloat(value.replace(/,/g, ""))
      if (isNaN(_value)) { return 0.00 }
      return _value
    }
    function makeDate(value) {
      var _date = value.split("/")
      var day = _date[0]
      var month = _date[1]-1
      var year = _date[2]
      return new Date(year, month, day)
    }

    return await this.$axios.$get(`${state.dataURL}`, {
        headers: {
        }
      }).then(data => {
        csvtojson({colParser: {
            'Commitment': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Disbursement': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Cash': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'In Kind': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Dates': (item, head, resultRow, row, colIDx) => {
              return makeDate(item)
            }
          }}).fromString(data).then((csvJson=> {
          commit('setRevenueData', csvJson.filter(item=> {
            return item["Primary Object"] == "Revenue"
          }))
          commit('setExpenditureData', csvJson.filter(item=> {
            return item["Primary Object"] == "Expenditure"
          }))
          commit('setLastUpdated')
        }))
    })
  }
}
