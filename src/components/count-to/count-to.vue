<template>
  <div class="count-to-wrapper">
    <slot name="left"/>
    <p class="content-outer"><span :class="['count-to-count-text', countClass]" :id="counterId">{{ init }}</span><i :class="['count-to-unit-text', unitClass]">{{ unitText }}</i></p>
    <slot name="right"/>
  </div>
</template>

<script>
// import CountUp from 'countup'
import './index.less'
export default {
  name: 'CountTo',
  props: {

  }
}
</script>
