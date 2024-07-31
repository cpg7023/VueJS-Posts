<template>
	<div>
		<h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
		<hr class="my-4" />
		<AppError v-if="error" :message="error.message"></AppError>
		<PostForm
			v-if="visibleForm"
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-dark me-2"
					@click="goListPage"
				>
					목록
				</button>
				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span class="visually-hidden" role="status">Loading...</span>
					</template>
					<template v-else> 저장 </template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alerts';
import AppError from '@/components/app/AppError.vue';

// 컴포저블 함수에서 사용할 속성들 가져오기
const { vAlert, vSuccess } = useAlert();

const loading = ref(false);
const error = ref(null);

const router = useRouter();
const form = ref({
	title: null,
	content: null,
});

// 게시글 생성 데이터를 API를 통해 날린다
const save = async () => {
	try {
		loading.value = true;
		await createPost({
			...form.value,
			createdAt: Date.now(),
		});
		vSuccess('등록이 완료되었습니다.');
		router.push({ name: 'PostList' });
	} catch (err) {
		error.value = err;
		vAlert(err.message);
	} finally {
		loading.value = false;
	}
};

const goListPage = () => router.push({ name: 'PostList' });
const visibleForm = ref(false);
</script>

<style lang="scss" scoped></style>
