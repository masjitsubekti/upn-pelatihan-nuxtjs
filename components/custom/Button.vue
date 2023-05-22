<template>
  <v-btn class="fancy-btn">
    {{title}}
    <!-- <slot></slot> -->
  </v-btn>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>
