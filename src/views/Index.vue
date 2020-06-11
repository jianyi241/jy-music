<template>
    <div class="index">
        <nav-bar></nav-bar>
        <router-view/>
    </div>
</template>

<script>
import navBar from '@/components/NavBar.vue'

export default {
  name: 'Index',
  components: {
    navBar
  }
}
</script>

<style scoped>
.index{

}
</style>
