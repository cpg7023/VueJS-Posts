<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY-MM-DD- HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message"></AppError>
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
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span class="visually-hidden" role="status">Loading...</span>
					</template>
					<template v-else> 삭제 </template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { useAlert } from '@/composables/alerts';
import { useAxios } from '@/hooks/useAxios';

// 컴포저블 함수에서 사용할 속성들 가져오기
const { vAlert } = useAlert();

const props = defineProps({
	id: [Number, String],
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

// const post = ref({
// 	title: null,
// 	content: null,
// 	createdAt: null,
// });
// Error 와 Loading UI용 반응형 상태

const removeError = ref(null);
const removeLoading = ref(false);
const { error, loading, data: post } = useAxios(`/posts/${props.id}`);

// 데이터 상세 조회 API 콜
// const fetchPost = async () => {
// 	try {
// 		loading.value = true;
// 		const { data } = await getPostById(props.id);
// 		setPost(data);
// 	} catch (err) {
// 		error.value = err;
// 		vAlert(err.message);
// 	} finally {
// 		loading.value = false;
// 	}
// };
// const setPost = ({ title, content, createdAt }) => {
// 	post.value.title = title;
// 	post.value.content = content;
// 	post.value.createdAt = createdAt;
// };

// fetchPost();

// 데이터 상세 삭제 API 콜
const remove = async () => {
	try {
		removeLoading.value = true;
		if (confirm('삭제하시겠습니까?')) {
			await deletePost(props.id);
			router.push({ name: 'PostList' });
		}
	} catch (err) {
		removeError.value = err;
	} finally {
		removeLoading.value = false;
	}
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => {
	router.push({ name: 'PostEdit', params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
