<template>
	<div>
		<h2>About View</h2>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="$router.push('/')">
			Home으로 이동
		</button>
		<h2>Store</h2>
		<p>counter: {{ counter }}</p>
		<p>doubleCount: {{ doubleCount }}</p>
		<p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
		<button @click="store.increment()">클릭</button>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/store/counter.js';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log(route.path);

const store = useCounterStore();

const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
// increment는 실행하는 함수이기에 그냥 구조분해할당으로 가져오면 됨
const { increment } = store;
increment();
increment();
increment();
</script>
