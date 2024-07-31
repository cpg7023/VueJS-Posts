import axios from 'axios';
import { ref, unref, watchEffect, isRef } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

// get 요청을 많이 쓰니까 기본 디폴트로 설정하기
const defaultConfig = {
	method: 'get',
};

export const useAxios = (url, config = {}) => {
	// Error 와 Loading UI용 반응형 상태
	const response = ref(null);
	const error = ref(null);
	const loading = ref(false);
	const data = ref(null);

	const { params } = config;
	const execute = () => {
		data.value = null;
		error.value = null;
		loading.value = true;
		axios(url, {
			...defaultConfig,
			...config,
			// ref 객체이기 때문에 params 객체의 반응형 매핑을 풀어야 페이지네이션 동작
			params: unref(params),
		})
			.then(res => {
				// url로 요청 성공시 값 저장
				response.value = res;
				data.value = res.data;
			})
			.catch(err => {
				error.value = err;
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// 아래 반응형 데이터들은 나중에 변경시 자동으로 감지하여 반영이 되기 떄문에
	// async await을 넣을 필요가 없다
	if (isRef(params)) {
		watchEffect(execute);
	} else {
		execute();
	}

	return {
		response,
		data,
		error,
		loading,
	};
};
