// 컴포저블 함수를 정의할때는 use라는 키워드를 써서 카멜케이스로 만드는 것이 관례이다
// import { ref } from 'vue';
// 스토어를 사용하자
import { useAlertStore } from '@/store/alert';
import { storeToRefs } from 'pinia';

export function useAlert() {
	// 상태를 구조분해 할당으로 가져오기 위해 storeToRefs 함수 사용
	const { alerts } = storeToRefs(useAlertStore());
	// 메서드(action)를 가져오기위해서는 그냥 구조분해 할당 가능
	const { vAlert, vSuccess } = useAlertStore();

	return { alerts, vAlert, vSuccess };
}
