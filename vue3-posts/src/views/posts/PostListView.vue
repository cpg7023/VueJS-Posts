<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>

		<hr class="my-4" />
		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
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

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			/>
		</template>

		<!--모달을 띄우기 위해 포스트 리스트 템플릿에 포함-->
		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:created-at="modalCreatedAt"
			/>
		</Teleport>

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
import { ref, computed } from 'vue';
import { getPosts } from '@/api/posts.js';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { useAxios } from '@/hooks/useAxios';

// Error 와 Loading UI용 반응형 상태
// const error = ref(null);
// const loading = ref(false);
// const posts = ref([]);

const router = useRouter();
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 3,
	_page: 1,
	title_like: '',
});

// Axios 컴포저블 함수 사용
const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { method: 'get', params });

// 아래는 pagination 관련
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// const fetchPosts = async () => {
// 	try {
// 		// 조회 시작 시 Loading True 설정
// 		loading.value = true;
// 		const { data, headers } = await getPosts(params.value);
// 		// ({ data: posts.value } = await getPosts());
// 		posts.value = data;
// 		totalCount.value = headers['x-total-count'];
// 		// getPosts()
// 		// 	.then(response => {
// 		// 		console.log('response: ', response);
// 		// 	})
// 		// 	.catch(err => {
// 		// 		console.log('error: ', err);
// 		// 	});
// 	} catch (err) {
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// };
// fetchPosts();
// 와치 이펙트 안에다 콜백 함수를 넣어주면 fetchPost 안의 반응형 데이터가 변경이 되었을때
// 다시 호출 할 수 있다.
// watchEffect(fetchPosts);

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
