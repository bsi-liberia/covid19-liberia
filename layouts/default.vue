<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="covid-navbar">
      <b-navbar-brand :to="'/'">COVID-19 Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item exact-active-class="active" :to="{name: 'index'}">
            Summary
          </b-nav-item>
          <b-nav-item active-class="active" :to="{name: 'revenue'}">
            Revenue
          </b-nav-item>
          <b-nav-item active-class="active" :to="{name: 'expenditure'}">
            Expenditure
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid class="covid-container">
      <b-container>
        <b-alert show variant="danger">Note: this site is still under active development.
          The data and functionality are liable to frequently change and should not be
          relied on, or taken in any way as authoritative, in this period.
        </b-alert>
      </b-container>
      <nuxt />
    </b-container>
    <footer>
      <b-container>
        <b-row>
          <b-col class="mt-2 mb-2">
            <!--<img src="logo_mfdp.png" width="250px" />-->
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
footer {
  background-color: #55a44f;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.covid-navbar {
  background-color: #55a44f;
}

.covid-container {
  margin: 0px auto;
  min-height: 100vh;
  min-width:100%;
  /*
  background-color: #365e93;
  color: #ffffff;
  */
  padding-top:40px;
  padding-bottom: 40px;
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
  methods: {
    async loadData() {
      this.$nuxt.$loading.start()
      await this.$store.dispatch('getData')
      this.$nuxt.$loading.finish()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData()
    })
  }
}
</script>
