<template>
  <div id="ViewQuestionsView">
    <a-row :gutter="[24, 24]" justify="center">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题信息"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  <a-tag>{{ question.judgeConfig?.timeLimit ?? 0 }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  <a-tag>{{ question.judgeConfig?.memoryLimit ?? 0 }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  <a-tag>{{ question.judgeConfig?.stackLimit ?? 0 }}</a-tag>
                </a-descriptions-item>
              </a-descriptions>
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
              <MdViewer :value="question?.content || ''" />
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论">
            Content of Tab Panel 2
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解">
            Content of Tab Panel 3
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="questionSubmit" layout="inline">
          <a-form-item field="title" label="编程语言">
            <a-select
              v-model="questionSubmit.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <a-divider size="0" />
        <CodeEditor
          :value="questionSubmit.code"
          :language="questionSubmit.language"
          :handleChange="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 100px" @click="onsubmit"
          >提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

const questionSubmit = ref<QuestionSubmitAddRequest>({
  code: "",
  language: "java",
  questionId: question.value?.id,
});

const code = ref("");

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败." + res.message);
  }
};

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});

const onsubmit = async () => {
  questionSubmit.value.questionId = question.value?.id;
  questionSubmit.value.language = "java";
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
    questionSubmit.value
  );
  if (res.code === 0) {
    message.success("提交成功.");
  } else {
    message.error("提交失败." + res.message);
  }
};

const changeCode = (value: string) => {
  questionSubmit.value.code = value;
};
</script>

<style>
#ViewQuestionsView {
  max-width: 1400px;
}

#ViewQuestionsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
