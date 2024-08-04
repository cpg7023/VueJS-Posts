import axios from 'axios';
import { ref, unref, watchEffect, isRef } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

// get 요청을 많이 쓰니까 기본 디폴트로 설정하기
const defaultConfig = {
	method: 'get',
};

const defaultOptions = {
	immediate: true,
};

export const useAxios = (url, config = {}, options = {}) => {
	// Error 와 Loading UI용 반응형 상태
	const response = ref(null);
	const error = ref(null);
	const loading = ref(false);
	const data = ref(null);

	const { onSuccess, onError, immediate } = {
		//디폴트로 immediate가 true 였다가 options로 false가 넘어오면 immediate가 false가 된다
		...defaultOptions,
		...options,
	};

	const { params } = config;

	const execute = body => {
		data.value = null;
		error.value = null;
		loading.value = true;

		axios(unref(url), {
			...defaultConfig,
			...config,
			// ref 객체이기 때문에 params 객체의 반응형 매핑을 풀어야 페이지네이션 동작
			params: unref(params),
			// watchEffect는 첫번째인자로 콜백함수가 넘어온다 그래서 body가 object일때만 data에 넣어주고 아니면 빈값을 넣는다
			data: typeof body === 'object' ? body : {},
		})
			.then(res => {
				// url로 요청 성공시 값 저장
				response.value = res;
				data.value = res.data;
				if (onSuccess) {
					onSuccess(res);
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError(err);
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// 아래 반응형 데이터들은 나중에 변경시 자동으로 감지하여 반영이 되기 떄문에
	// async await을 넣을 필요가 없다
	if (isRef(params) || isRef(url)) {
		watchEffect(execute);
	} else {
		if (immediate) {
			execute();
		}
	}

	return {
		response,
		data,
		error,
		loading,
		//excute 호출을 외부에서 원할때 하도록 리턴
		execute,
	};
};
