<template>
	<div>
		<h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
		<hr class="my-4" />
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
				<button class="btn btn-primary">저장</button>
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

// 컴포저블 함수에서 사용할 속성들 가져오기
const { vAlert, vSuccess } = useAlert();

const router = useRouter();
const form = ref({
	title: null,
	content: null,
});

// 게시글 생성 데이터를 API를 통해 날린다
const save = async () => {
	try {
		await createPost({
			...form.value,
			createdAt: Date.now(),
		});
		vSuccess('등록이 완료되었습니다.');
		router.push({ name: 'PostList' });
	} catch (error) {
		console.error(error);
		vAlert(error.message);
	}
};

const goListPage = () => router.push({ name: 'PostList' });
const visibleForm = ref(false);
</script>

<style lang="scss" scoped></style>
