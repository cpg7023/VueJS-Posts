<template>
	<nav class="mt-5" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item" :class="isPrevPage">
				<a
					class="page-link"
					href="#"
					aria-label="Previous"
					@click.prevent="$emit('page', currentPage - 1)"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="page-item"
				:class="{ active: currentPage === page }"
			>
				<a class="page-link" href="#" @click.prevent="$emit('page', page)">
					{{ page }}
				</a>
			</li>
			<li class="page-item" :class="isNextPage">
				<a
					class="page-link"
					href="#"
					aria-label="Next"
					@click.prevent="$emit('page', currentPage + 1)"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';
//부모 컴포넌트로부터 받아야할 props는 _page : 현재 페이지 와 pageCount : 페이지 개수 가 있다.
const props = defineProps({
	currentPage: {
		type: Number,
		required: true,
	},
	pageCount: {
		type: Number,
		required: true,
	},
});
defineEmits(['page']);
const isPrevPage = computed(() => {
	return { disabled: !(props.currentPage > 1) };
});
const isNextPage = computed(() => {
	return { disabled: !(props.currentPage < props.pageCount) };
});
</script>

<style lang="scss" scoped></style>
