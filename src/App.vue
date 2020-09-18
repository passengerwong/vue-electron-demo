<template>
  <div id="app">
    <div id="page-nav-wrap" v-if="!$route.meta.noShowNav">
      <PageNav />
    </div>
    <div class="page-content-wrap">
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PageNav from '@/components/pageNavCom/index.vue';

@Component({
  name: 'app',
  components: { PageNav }
})
export default class App extends Vue {

}
</script>
<style lang="less">
  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
    #nav-wrap {
    }
    .page-content-wrap {
      overflow-y: auto;
      flex: 1;
    }
  }
</style>
