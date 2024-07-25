<template>
	<AppCard>
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">
			{{ content }}
		</p>
		<p class="text-muted">
			{{ createdAt }}
		</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<!-- 그냥 모달 버튼을 누르면 포스트 상세페이지로 이동해버리니까 이벤트 버블링을 막기위해 stop 모디파이어 사용-->
				<button class="btn p-0" @click.stop="$emit('modal')">
					<i class="bi bi-arrow-up-square-fill"></i>
				</button>
			</div>
		</template>
	</AppCard>
</template>

<script setup>
import AppCard from '@/components/AppCard.vue';
defineProps({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	createdAt: {
		type: [String, Date, Number],
	},
});
defineEmits(['modal']);
</script>

<style lang="scss" scoped></style>
