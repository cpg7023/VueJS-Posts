<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input
				v-focus
				v-color="'blue'"
				:value="title"
				@input="$emit('update:title', $event.target.value)"
				type="text"
				class="form-control"
				id="title"
				placeholder="제목을 입력하세요."
			/>
		</div>
		<div class="mb-3">
			<label for="contents" class="form-label">내용</label>
			<textarea
				:value="content"
				@input="$emit('update:content', $event.target.value)"
				class="form-control"
				id="contents"
				rows="3"
				placeholder="내용을 입력하세요."
			></textarea>
		</div>
		<div class="d-flex gap-2 mt-4">
			<slot name="actions"> </slot>
		</div>
	</form>
</template>

<script setup>
// v 프리픽스를 붙여서 커스텀 디렉티브를 선언하고 mounted 훅을 사용하여 el을 매개변수로 받는다
// 해당 엘리먼트를 포커스 시킨다
// const vFocus = {
// 	mounted: el => {
// 		el.focus();
// 	},
// };
defineProps({
	title: String,
	content: String,
});

defineEmits(['update:title', 'update:content']);
</script>

<style lang="scss" scoped></style>
