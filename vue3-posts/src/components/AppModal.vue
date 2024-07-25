<template>
	<!-- Modal -->
	<div v-if="modelValue">
		<div class="modal-backdrop fade show"></div>
		<div
			class="modal fade show d-block"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<slot name="header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">
								{{ title }}
							</h1>
							<!-- 버튼을 클릭 시 모달을 닫기 위해 close 이벤트 전파 -->
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								@click="$emit('update:modelValue', false)"
							></button>
						</slot>
					</div>
					<div class="modal-body">
						<slot></slot>
					</div>
					<div class="modal-footer">
						<slot name="actions"></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 컴포넌트에서 커스텀 모델을 구현하려면 modelValue를 props로 받고 update:modelValue를 전파한데이
defineProps({
	modelValue: Boolean,
	title: String,
});
defineEmits(['close', 'update:modelValue']);
</script>

<style lang="scss" scoped></style>
