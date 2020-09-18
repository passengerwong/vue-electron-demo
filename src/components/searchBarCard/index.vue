<template>
  <div class="search-bar-card">{{title}}</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'searchBarCard'
})
export default class SearchBarCard extends Vue {
  title = 'search bar card';
}
</script>
<style lang="less">
.search-bar-card {}
</style>
