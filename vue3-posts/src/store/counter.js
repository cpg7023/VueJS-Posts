import { defineStore } from 'pinia';

//store도 컴포저블 함수마냥 use를 앞에 붙이는것이 관례이다

export const useCounterStore = defineStore('counter', {
	// 컴포넌트의 상태
	state: () => ({
		counter: 1,
	}),
	// 컴포넌트의 computed
	getters: {
		doubleCount: state => state.counter * 2,
	},
	// 컴포넌트의 메서드
	actions: {
		increment() {
			this.counter++;
		},
	},
});
