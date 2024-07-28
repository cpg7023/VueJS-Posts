// 객체로 플러그인을 작성할 경우 객체안에 인스톨 메서드가 포함되어 있어야 한다.
const objPlugins = {
	install(app, options) {
		console.log('objPlugins app ', app);
		console.log('objPlugins options ', options);
		// app.component() 전역 컴포넌트 추가 방법
		// app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
		// app.directive 커스텀 디렉티브
		// app.provide 다양한 리소스를 자식 컴포에서 사용하도록 추가 가능
	},
};
export default objPlugins;

// 매개변수의 app 인스턴스는 main.js에서 선언한 어플리케이션 인스턴스라고 보면되며
// options는 사용자가 전달해주는 옵션이다.
