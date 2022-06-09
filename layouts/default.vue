<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="covid-navbar">
      <b-container>
        <b-navbar-brand :to="'/'" class="covid-brand">
          <img src="~/assets/flag-lr.png" alt="Flag of Liberia" />
          COVID-19 Dashboard</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item exact-active-class="active" :to="{name: 'index'}">
              Summary
            </b-nav-item>
            <b-nav-item active-class="active" :to="{name: 'cases'}">
              Cases
            </b-nav-item>
            <b-nav-item active-class="active" :to="{name: 'revenue'}">
              Revenue
            </b-nav-item>
            <b-nav-item active-class="active" :to="{name: 'expenditure'}">
              Expenditure
            </b-nav-item>
            <b-nav-item active-class="active" :to="{name: 'in-kind'}">
              In Kind Contributions
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item active-class="active" :to="{name: 'about'}">
              About
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-container fluid class="covid-container">
      <nuxt />
    </b-container>
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
.covid-brand {
}
.covid-brand img {
  padding-right: 5px;
}

.covid-container {
  margin: 0px auto;
  min-height: 70vh;
  min-width:100%;
  padding-top:40px;
  padding-bottom: 40px;
}
.number-value {
  text-align: right;
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
