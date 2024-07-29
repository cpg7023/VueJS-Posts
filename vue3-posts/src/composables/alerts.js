// 컴포저블 함수를 정의할때는 use라는 키워드를 써서 카멜케이스로 만드는 것이 관례이다
import { ref } from 'vue';

const alerts = ref([]);
export function useAlert() {
	// Alert
	const vAlert = (message, type = 'error') => {
		alerts.value.push({ message, type });
		setTimeout(() => {
			alerts.value.shift(); // 맨앞 항목부터 dequeue
		}, 2000);
	};
	const vSuccess = message => {
		vAlert(message, 'success');
	};
	return { alerts, vAlert, vSuccess };
}
