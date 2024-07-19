<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>
		<hr class="my-4" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';

const props = defineProps({
	id: String,
});

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
/**
 * 반응형 객체 선언시 ref() 를 사용할 경우 {...data} 객체 복사를 하게되면 반응형을 그대로 가지고 복사가 이뤄진다 => 즉 한꺼번에 객체할당을 하기 위해 사용한다
 * 반응형 객체 선언시 reactive() 를 사용할 경우 {...data} 객체 복사를 하게되면 반응형을 잃기 때문에 프로퍼티 하나씩 일일이 할당을 해줘야한다
 *
 * ref (레퍼런스 타입, 프리미티브 타입 할당 가능)
 * 장점) 객체 할당 가능, 일관성 유지 가능
 * 단점) form.value.title, form.value.content 이런식으로 사용해야함
 *
 * reactive (레퍼런스 타입만 할당)
 * 장점) form.title, form.content 이런식으로 접근 가능
 * 단점) 객체 할당 불가능
 */

const post = ref({});

// 데이터 상세 조회 API 콜
const fetchPost = async () => {
	try {
		const { data } = await getPostById(props.id);
		setPost(data);
	} catch (error) {
		console.log(error);
	}
};
const setPost = ({ title, content, createdAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createdAt = createdAt;
};

fetchPost();

// 데이터 상세 삭제 API 콜
const remove = async () => {
	try {
		if (confirm('삭제하시겠습니까?')) {
			await deletePost(props.id);
			router.push({ name: 'PostList' });
		}
	} catch (error) {
		console.error(error);
	}
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => {
	router.push({ name: 'PostEdit', params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
