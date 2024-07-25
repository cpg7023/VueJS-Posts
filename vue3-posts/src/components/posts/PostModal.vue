<template>
	<!-- props는 내부에서 변경을하면 안되기 때문에 show를 그냥 받을 수 없다 그래서 스크립트에 modelValue를 props로 선언해서 사용 -->
	<AppModal v-model="show" :show="show" title="게시글">
		<template #default>
			<div class="row g-3">
				<div class="col-3 text-muted">제목</div>
				<div class="col-9">{{ title }}</div>
				<div class="col-3 text-muted">내용</div>
				<div class="col-9">{{ content }}</div>
				<div class="col-3 text-muted">등록일</div>
				<div class="col-9">{{ createdAt }}</div>
			</div>
		</template>
		<template #actions>
			<button type="button" class="btn btn-secondary" @click="closeModal">
				닫기
			</button>
		</template>
	</AppModal>
</template>

<script setup>
import { computed } from 'vue';
import AppModal from '@/components/AppModal.vue';
// props는 내부에서 변경을하면 안되기
const props = defineProps({
	modelValue: Boolean,
	title: String,
	content: String,
	createdAt: [String, Number],
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
	get() {
		// 위 v-model 에서 show 값을 읽어갈때 props의 modelValue 값을 읽어 갈 수 있게 한다
		return props.modelValue;
	},
	set(value) {
		// show 값을 변경 시 emit으로 이벤트 전파를 통해 부모 컴포넌트에서 값을 변경하도록 한다
		emit('update:modelValue', value);
	},
});
const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
