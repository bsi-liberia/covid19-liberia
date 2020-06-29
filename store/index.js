import axios from 'axios'
import config from '../nuxt.config'
import Vue from 'vue'
import csvtojson from 'csvtojson'

export const state = () => ({
  revenueData: [],
  expenditureData: [],
  inKindData: [],
  casesData: [],
  countiesData: [],
  lastUpdated: null,
  lastUpdatedRevenue: null,
  lastUpdatedExpenditure: null,
  lastUpdatedInKind: null,
  lastUpdatedCases: null,
  dataURL: "http://raw.githubusercontent.com/bsi-liberia/covid19-liberia-data/gh-pages/data.csv",
  casesURL: "http://raw.githubusercontent.com/bsi-liberia/covid19-liberia-data/gh-pages/cases.csv",
  countiesURL: "http://raw.githubusercontent.com/bsi-liberia/covid19-liberia-data/gh-pages/counties.csv"
})


export const mutations = {
  setRevenueData(state, revenueData) {
    state.revenueData = revenueData
  },
  setExpenditureData(state, expenditureData) {
    state.expenditureData = expenditureData
  },
  setCasesData(state, casesData) {
    state.casesData = casesData
  },
  setCountiesData(state, countiesData) {
    state.countiesData = countiesData
  },
  setInKindData(state, inKindData) {
    state.inKindData = inKindData
  },
  setLastUpdated(state) {
    state.lastUpdatedRevenue = new Date(Math.max.apply(
      null, state.revenueData.map(item => { return item.Dates })
    )).toISOString().substr(0, 10)
    state.lastUpdatedExpenditure = new Date(Math.max.apply(
      null, state.expenditureData.map(item => { return item.Dates })
    )).toISOString().substr(0, 10)
    state.lastUpdatedInKind = new Date(Math.max.apply(
      null, state.inKindData.map(item => { return item.Dates })
    )).toISOString().substr(0, 10)
    state.lastUpdated = new Date(Math.max.apply(null,
      [state.lastUpdatedRevenue,
      state.lastUpdatedExpenditure,
      state.lastUpdatedInKind].map(d=> {
        return new Date(d)
      }))
    ).toISOString().substr(0, 10)
  },
  setLastUpdatedCases(state) {
    state.lastUpdatedCases = new Date(Math.max.apply(
      null, state.casesData.map(item => { return new Date(item.Date) })
    )).toISOString().substr(0, 10)
  }
}


export const actions = {
  async getCasesData({ commit, state }) {
    function makeInteger(value) {
      const _value = parseInt(value)
      if (isNaN(_value)) { return 0 }
      return _value
    }
    function makeDate(value) {
      /* Dates are now formatted in ISO format (yyyy-mm-dd) */
      return new Date(value).toISOString().substr(0, 10)
    }
    return await axios.get(`${state.casesURL}`, {

    }).then(response => {
      csvtojson({colParser: {
            'Cases': (item, head, resultRow, row, colIDx) => {
              return makeInteger(item)
            },
            'Deaths': (item, head, resultRow, row, colIDx) => {
              return makeInteger(item)
            },
            'Date': (item, head, resultRow, row, colIDx) => {
              return makeDate(item)
            },
          }}).fromString(response.data).then((csvJson=> {
        commit('setCasesData', csvJson)
        commit('setLastUpdatedCases')
    }))})
  },
  async getCountiesData({ commit, state }) {
    function makeInteger(value) {
      const _value = parseInt(value)
      if (isNaN(_value)) { return 0 }
      return _value
    }
    return await axios.get(`${state.countiesURL}`, {

    }).then(response => {
      csvtojson({colParser: {
            'Cases': (item, head, resultRow, row, colIDx) => {
              return makeInteger(item)
            },
            'Deaths': (item, head, resultRow, row, colIDx) => {
              return makeInteger(item)
            }
          }}).fromString(response.data).then((csvJson=> {
        commit('setCountiesData', csvJson)
    }))})
  },
  async getData({ commit, state }) {
    function makeNumber(value) {
      const _value = parseFloat(value.replace(/,/g, ""))
      if (isNaN(_value)) { return 0.00 }
      return _value
    }
    function makeDate(value) {
      /* Dates are now formatted in ISO format (yyyy-mm-dd) */
      return new Date(value)
    }

    return await axios.get(`${state.dataURL}`, {
        headers: {
        }
      }).then(response => {
        csvtojson({colParser: {
            'Commitment': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Disbursement': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Outstanding': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Cash': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'In Kind': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'On Budget': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Off Budget': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Grant Component': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Loan Component': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            'Dates': (item, head, resultRow, row, colIDx) => {
              return makeDate(item)
            }
          }}).fromString(response.data).then((csvJson=> {
          commit('setRevenueData', csvJson.filter(item=> {
            return item["Primary Object"] == "Revenue"
          }))
          commit('setExpenditureData', csvJson.filter(item=> {
            return item["Primary Object"] == "Expenditure"
          }))
          commit('setInKindData', csvJson.filter(item=> {
            return item["Primary Object"] == "In Kind"
          }))
          commit('setLastUpdated')
        }))
    })
  }
}
