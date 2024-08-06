import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
	state: () => ({
		alerts: [],
	}),
	actions: {
		vAlert(message, type = 'error') {
			// alerts 스테이트에 접근하기 위해 this로 접근
			this.alerts.push({ message, type });
			setTimeout(() => {
				this.alerts.shift(); //  맨앞 항목부터 dequeue
			}, 2000);
		},
		vSuccess(message) {
			// 아래 액션에 접근하기 위해 store 인스턴스로 접근
			this.vAlert(message, 'success');
		},
	},
});
