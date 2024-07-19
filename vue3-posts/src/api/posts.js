import { posts } from '.';

// axios로 json 조회
// 오름차순 순서로 데이터를 가지고 오기 위해 params 추가
export function getPosts(params) {
	return posts.get('/', { params });
}

export function getPostById(id) {
	return posts.get(id);
}

export function createPost(data) {
	return posts.post('', data);
}

export function updatePost(id, data) {
	return posts.put(id, data);
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
