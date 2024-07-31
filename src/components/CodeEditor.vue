<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 500px; height: 70vh"
  />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";

/**
 * 定义组件属性类型
 * 使父组件能操纵子组件，给子组件传值
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (value: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    // fillValue(v);
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

// 销毁旧的编辑器实例并创建新的编辑器实例
const createEditor = () => {
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    lineNumbers: "on",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
    colorDecorators: true,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
};

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor!.value).getModel()!,
        props.language
      );
    }
  }
);

// const fillValue = (v: string) => {
//   if (!codeEditor.value) {
//     return;
//   }
//   // 改变值
//   toRaw(codeEditor.value).setValue(v);
// };

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  createEditor();
});
</script>

<style scoped></style>
