<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<form @submit.prevent="save">
			<div class="mb-3">
				<label for="title" class="form-label">제목</label>
				<input
					v-model="form.title"
					type="text"
					class="form-control"
					id="title"
					placeholder="제목을 입력하세요."
				/>
			</div>
			<div class="mb-3">
				<label for="contents" class="form-label">내용</label>
				<textarea
					v-model="form.content"
					class="form-control"
					id="contents"
					rows="3"
					placeholder="내용을 입력하세요."
				></textarea>
			</div>
			<div class="pt-4">
				<button
					type="button"
					class="btn btn-outline-dark me-2"
					@click="goListPage"
				>
					목록
				</button>
				<button class="btn btn-primary">저장</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';

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
		router.push({ name: 'PostList' });
	} catch (error) {
		console.error(error);
	}
};

const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
