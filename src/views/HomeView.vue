<script setup lang="ts">
import type { FeedController } from '@/api/routes/feeds';
import type { HelloController } from '@/api/routes/hello';
import { useCounterStore } from '@/stores/counter';
import { hc } from 'hono/client';
import { ref } from 'vue';

const helloData = ref('');
const getHello = async () => {
  const client = hc<HelloController>('/api');

  const response = await client.hello.$get({
    query: {
      name: 'John',
    },
  });

  const data = await response.json();
  helloData.value = data.message;
};

const feedsData = ref('');
const postFeeds = async () => {
  const client = hc<FeedController>('/api');

  const response = await client.getFeeds.$post({
    json: {
      firstname: 'Max',
      lastname: 'Chou',
    },
  });

  const data = await response.json();
  feedsData.value = data.message;
};

const counterStore = useCounterStore();
const addCount = () => {
  counterStore.increment();
};
const decrementCount = () => {
  counterStore.decrement();
};
</script>

<template>
  <main class="space-y-4">
    <div class="text-3xl font-bold underline">Hello world!</div>
    <div class="border">
      <button @click="getHello">Hello</button>
      <div>{{ helloData }}</div>
    </div>
    <div class="border">
      <button @click="postFeeds">Post Feeds</button>
      <div>{{ feedsData }}</div>
    </div>
    <div class="border">
      <div>Count:{{ counterStore.count }}</div>
      <button class="bg-blue-500 mr-4" @click="addCount">Add Count</button>
      <button class="bg-blue-500" @click="decrementCount">Decrement Count</button>
    </div>
  </main>
</template>
