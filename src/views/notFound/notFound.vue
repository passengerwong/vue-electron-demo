<template>
  <div class="notFound">
    <h2>{{title}}</h2>
    <div>访问的页面不存在！</div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'notFound'
})
export default class NotFound extends Vue {
  title = '~404'
}
</script>
