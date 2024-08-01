<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message"></AppError>
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span class="visually-hidden" role="status">Loading...</span>
					</template>
					<template v-else> 수정 </template>
				</button>
			</template>
		</PostForm>
		<!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alerts';
import { useAxios } from '@/hooks/useAxios';

// 컴포저블 함수에서 사용할 속성들 가져오기
const { vAlert, vSuccess } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

// // Error 와 Loading UI용 반응형 상태
// const error = ref(null);
// const loading = ref(false);
// const editError = ref(null);
// const editLoading = ref(false);

// ***********************************************수정 화면에 데이터 get용
const { error, loading, data: form } = useAxios(`/posts/${id}`);
// ***********************************************수정 Post용
const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostDetail', params: { id } });
			vSuccess('수정이 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const edit = () => {
	execute({
		...form.value,
	});
};

// const form = ref({
// 	title: null,
// 	content: null,
// });

/* Axios 컴포저블 함수를 도입했기 때문에 필요 없는 구문***********************************************************/
// 수정하기 위해서 기존 데이터 get API 콜
// const fetchPost = async () => {
// 	try {
// 		loading.value = true;
// 		const { data } = await getPostById(id);
// 		setForm(data);
// 	} catch (err) {
// 		error.value = err;
// 		vAlert(err.message);
// 	} finally {
// 		loading.value = false;
// 	}
// };
// const setForm = ({ title, content }) => {
// 	form.value.title = title;
// 	form.value.content = content;
// 	form.value.createdAt = Date.now();
// };
/****************************************************************/
// fetchPost();

// const edit = async () => {
// 	try {
// 		editLoading.value = true;
// 		await updatePost(id, { ...form.value });
// 		router.push({ name: 'PostDetail', params: { id } });
// 		vSuccess('수정이 완료되었습니다.');
// 	} catch (err) {
// 		editError.value = err;
// 		vAlert(err.message);
// 	} finally {
// 		editLoading.value = false;
// 	}
// };

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

// alert 관련
// const showAlert = ref(false);
// const alertMessage = ref('');
// const alertType = ref('');
</script>

<style lang="scss" scoped></style>
