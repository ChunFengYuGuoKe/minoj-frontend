<template>
  <div id="example">
    <MdEditor :value="mdValue" :handle-change="onMdChange"></MdEditor>
    <!--    让父组件传参，以便父组件更容易拿到值-->
    <CodeEditor :value="codeValue" :handle-change="onCodeChange"></CodeEditor>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref("");
const mdValue = ref("");

const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};

const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};
</script>
