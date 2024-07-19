import axios from 'axios';

function create(baseURL, options) {
	// 아래와 같이 넣어도 되고
	// const instance = axios.create({
	// 	baseURL: baseURL,
	// 	...options,
	// });

	const instance = axios.create(Object.assign({ baseURL }, options));
	return instance;
}

export const posts = create('http://localhost:5000/posts');

console.log('MODE: ', import.meta.env.MODE);
console.log('BASE_URL: ', import.meta.env.BASE_URL);
console.log('PROD: ', import.meta.env.PROD);
console.log('DEV: ', import.meta.env.DEV);
console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL);
// vite config 파일에서 설정 가능
