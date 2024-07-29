<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import { useAlert } from '@/composables/alerts';
const { alerts } = useAlert();
</script>

<template>
	<TheHeader></TheHeader>

	<TheView> </TheView>

	<AppAlert :items="alerts" />
</template>

<style></style>
