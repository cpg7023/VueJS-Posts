<template>
	<div>
		<h2>Home View</h2>
		<p>{{ $route }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
		<hr class="my-4" />
		<AppGrid :items="items" v-slot="{ item }" col-class="col-3">
			<AppCard>{{ item }}</AppCard>
		</AppGrid>
		<button class="btn btn-primary" @click="person.say">click person</button>
		<h2>{{ position }}</h2>
	</div>
</template>

<!-- 글로벌 app.config.globalProperties.$person = person;로 설정한 
 person 인스턴스는 셋업 라이프사이클에서 사용이 불가하므로
 created 라이프 사이클에서 사용한다-->
<!-- 만약 셋업 라이프 사이클 안에서 사용하고 싶다면 provide-inject를 사용하면 된다 -->
<script>
export default {
	created() {
		// console.log(this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import { ref, reactive, toRef, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
console.log(route.path);

const goAboutPage = () => {
	router.push('/About');
};

const items = ref(['사과', '딸기', '포도', '바나나']);

// const person = inject('person');
// console.log('person.name : ', person.name);

const position = reactive({
	x: 100,
	y: 1000,
});

// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
