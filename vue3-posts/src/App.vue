<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
// import { useAlert } from '@/composables/alerts';
</script>

<template>
	<TheHeader></TheHeader>

	<TheView> </TheView>

	<!-- 여기서 alert를 선언하게 되면 각 컴포넌트들 마다 alert 객체가 생겨버린다-->
	<!-- <AppAlert :items="alerts" /> -->
	<AppAlert />
</template>

<style></style>
