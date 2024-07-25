<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>
		<hr class="my-4" />
		<AppGrid :items="posts">
			<template v-slot="{ item }">
				<PostItem
					:title="item.title"
					:content="item.content"
					:created-at="item.createdAt"
					@click="goPage(item.id)"
					@modal="openModal(item)"
				></PostItem>
			</template>
		</AppGrid>

		<AppPagenation
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		/>
		<!--모달을 띄우기 위해 포스트 리스트 템플릿에 포함-->
		<PostModal
			v-model="show"
			:title="modalTitle"
			:content="modalContent"
			:created-at="modalCreatedAt"
		/>

		<template v-if="posts && posts.length > 0">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="posts[0].id"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref, computed, watchEffect } from 'vue';
import { getPosts } from '@/api/posts.js';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagenation from '@/components/AppPagenation.vue';
import AppGrid from '@/components/AppGrid.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

const posts = ref([]);
const router = useRouter();
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 3,
	_page: 1,
	title_like: '',
});

// 아래는 pagination 관련
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
	try {
		const { data, headers } = await getPosts(params.value);
		// ({ data: posts.value } = await getPosts());
		posts.value = data;
		totalCount.value = headers['x-total-count'];
		// getPosts()
		// 	.then(response => {
		// 		console.log('response: ', response);
		// 	})
		// 	.catch(err => {
		// 		console.log('error: ', err);
		// 	});
	} catch (error) {
		console.error(error);
	}
};
// fetchPosts();
// 와치 이펙트 안에다 콜백 함수를 넣어주면 fetchPost 안의 반응형 데이터가 변경이 되었을때
// 다시 호출 할 수 있다.
watchEffect(fetchPosts);

// http://localhost:5173/posts/2?searchText=helloWorlds!
const goPage = id => {
	// router.push(`/posts/${id}`);
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
		// query: {
		// 	searchText: 'hello ',
		// },
		// hash: 'Worlds!',
	});
};

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

// 위에서 openModal 이벤트 emit에서 item을 파람으로 받은 것을 구조 분해 할당
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
