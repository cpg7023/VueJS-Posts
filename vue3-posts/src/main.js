import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import funcPlugins from './plugins/func';
import objPlugins from './plugins/obj';
import person from './plugins/person';

//라우터를 설치한것 처럼 플러그인도 app.use를 사용해서 설치하여 사용
const app = createApp(App);
app.use(person, { name: '홍길동' });
app.use(funcPlugins);
app.use(objPlugins, { name: '쿠쿠큐' });
app.use(router);
app.mount('#app');
import 'bootstrap/dist/js/bootstrap.js';

// app.component() 전역 컴포넌트 추가 방법
// app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
// app.directive 커스텀 디렉티브
// app.provide() 다양한 리소스를 자식 컴포에서 사용하도록 추가 가능
