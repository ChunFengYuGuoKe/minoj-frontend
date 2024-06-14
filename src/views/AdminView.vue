<template>
  <div>仅管理员可见</div>
  <div class="home">
    <hello-world />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "AdminView",
  components: {
    HelloWorld,
  },
});
</script>
