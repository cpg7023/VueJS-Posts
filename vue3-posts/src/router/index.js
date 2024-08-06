import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		// :세미 콜론이 들어간건 동적 라우팅으로
		// 여러개의 URL을 하나의 페이지에 매핑할 때 사용한다.
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		props: true,
		// props: route => ({ id: parseInt(route.params.id) }),
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		// 중첩된 라우드 구문 설정
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
	{
		path: '/my',
		name: 'MyPage',
		component: MyPage,
		// 아래 같이 메서드 배열로 정의하면 해쉬 제거 등 기능 추가 가능
		beforeEnter: [removeQueryString],
		// beforeEnter: (to, from) => {
		// 	// to는 이동할 페이지
		// 	console.log('to : ', to);
		// 	// from은 이동하기 전 페이지
		// 	console.log('from :', from);

		// 	/* url에 쿼리스트링을 제거하고 싶을 때 */
		// 	console.log(to.query);
		// 	// 아래와 같이 Object key 메서드로 query객체 안의 키를 배열로 반환
		// 	if (Object.keys(to.query).length > 0) {
		// 		// 쿼리가 있다면 리다이렉션을 통해 쿼리를 없애고 현재 페이지로 다시 이동
		// 		return { path: to.path, query: {} };
		// 	}
		// },
	},
];

function removeQueryString(to) {
	// 아래와 같이 Object key 메서드로 query객체 안의 키를 배열로 반환
	if (Object.keys(to.query).length > 0) {
		// 쿼리가 있다면 리다이렉션을 통해 쿼리를 없애고 현재 페이지로 다시 이동
		return { path: to.path, query: {} };
	}
}

const router = createRouter({
	history: createWebHistory('/'),
	// history: createWebHashHistory(),
	routes,
});

// router.beforeEach((to, from) => {
// 	// to는 이동할 페이지
// 	console.log('to : ', to);
// 	// from은 이동하기 전 페이지
// 	console.log('from :', from);

// 	if (to.name === 'MyPage') {
// 		// 다른 페이지로 리다이렉션
// 		// return false;
// 		return { name: 'Home' };
// 	}
// });

export default router;
