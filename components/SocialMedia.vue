<template>
  <div>
    <b-row>
      <b-col class="mb-2">
        <ShareNetwork
        network="twitter"
        url="http://covid19response.gov.lr/revenue/"
        title="A dashboard of data on the COVID-19 response in Liberia."
        twitter-user="mfdp_lib">
          <font-awesome-icon :icon="['fab', 'twitter']" />
          <span>Share on Twitter</span>
        </ShareNetwork>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col>
        <ShareNetwork
        network="facebook"
        url="http://covid19response.gov.lr/revenue/"
        title="A dashboard of data on the COVID-19 response in Liberia.">
          <font-awesome-icon :icon="['fab', 'facebook']" />
          <span>Share on Facebook</span>
        </ShareNetwork>
      </b-col>
    </b-row>
  </div>
</template>
<style scoped>
a[class^="share-network-"] {
  color: #FFFFFF;
  background-color: #333;
  border-radius: 3px;
  cursor: pointer;
  margin: 0px 10px 10px 0;
  padding: 4px;
  font-size: 0.8rem;
}
a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^="share-network-"] span {
  flex: 1 1;
  font-weight: 500;
}
a.share-network-twitter, a.share-network-twitter:hover {
  color: #ffffff;
  background-color: #1da1f2;
}
a.share-network-facebook, a.share-network-facebook:hover {
  color: #ffffff;
  background-color: #1877f2;
}
</style>
<script>
export default {
  name: 'SocialMedia',
  components: {
  },
  props: ['url'],
  data() {
    return {
    }
  },
}
</script>
