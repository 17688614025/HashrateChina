<template>
  <div>
    <div>calculator {{ path }}</div>
  </div>
</template>
<script>
export default {
  data: () => ({
    path: ''
  }),
  mounted() {
    this.path = this.$route.params.height
    console.log(this.path)
  },
  methods: {

  }
}
</script>
