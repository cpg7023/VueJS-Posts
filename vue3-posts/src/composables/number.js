import { computed, unref } from 'vue';

export const useNumber = number => {
	// number가 받은 값은 반응형이기 때문에 unRef 피료
	const isOdd = computed(() => unref(number) % 2 === 1);
	const isEven = computed(() => !isOdd.value);

	return {
		isOdd,
		isEven,
	};
};
