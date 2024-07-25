<template>
	<!-- <Transition name="slide">
		<div v-if="show" class="app-alert alert" :class="typeStyle" role="alert">
			{{ message }}
		</div>
	</Transition> -->

	<div class="app-alert">
		<TransitionGroup name="slide">
			<div
				v-for="({ message, type }, index) in items"
				:key="index"
				class="alert"
				:class="typeStyle(type)"
				role="alert"
			>
				{{ message }}
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup>
// import { computed } from 'vue';

defineProps({
	items: Array,
});
const typeStyle = type => (type === 'error' ? 'alert-danger' : 'alert-primary');
// const props = defineProps({
// 	show: {
// 		type: Boolean,
// 		default: false,
// 	},
// 	message: {
// 		type: String,
// 		required: true,
// 	},
// 	type: {
// 		type: String,
// 		default: 'error',
// 		validator: value => ['success', 'error'].includes(value),
// 	},
// });

// const typeStyle = computed(() =>
// 	props.type === 'error' ? 'alert-danger' : 'alert-primary',
// );
</script>

<style scoped>
.app-alert {
	position: fixed;
	top: 10px;
	right: 10px;
}
.slide-leave-to,
.slide-enter-from {
	opacity: 0;
	transform: translateX(30px);
}
.slide-leave-active,
.slide-enter-active {
	transition: all 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
	opacity: 1;
	transform: translateX(0px);
}
</style>
