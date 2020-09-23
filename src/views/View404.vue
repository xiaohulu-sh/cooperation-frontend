<template functional>
  <a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在" style="padding-top:100px">
    <template #extra>
      <router-link to="/"><a-button type="primary">回到首页</a-button></router-link>
    </template>
  </a-result>
</template>
