<template>
  <div class="app-container">
    <h1>AI Rap Battle</h1>
    <input
      v-model="theme"
      type="text"
      placeholder="Enter a theme for the rap battle..."
      class="theme-input"
    />
    <button @click="startBattle" class="start-button">Start Rap Battle</button>

    <div v-if="loading" class="loader">...</div>

    <div class="rap-lines">
      <div
        v-for="(line, index) in rapLines"
        :key="index"
        class="rap-line"
        v-html="line"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const theme = ref("");
const rapLines = ref<string[]>([]);
const loading = ref(false);

const startBattle = async () => {
  rapLines.value = [];
  loading.value = true;

  try {
    const response = await fetch(
      `${apiUrl}/rap-battle/stream?theme=${theme.value}`
    );
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let accumulatedText = "";

    if (reader) {
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        accumulatedText += decoder.decode(value, { stream: true });

        const cleanedText = accumulatedText
          .replace(/\s+\n/g, " ")
          .replace(/\n+/g, "\n")
          .trim();

        if (
          cleanedText.endsWith(".") ||
          cleanedText.endsWith("?") ||
          cleanedText.endsWith("!")
        ) {
          rapLines.value.push(cleanedText);
          accumulatedText = "";
        }
      }
    }
  } catch (error) {
    console.error("Error fetching rap battle:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.app-container {
  text-align: center;
  margin: 20px;
}

h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.theme-input {
  padding: 10px;
  font-size: 1.2em;
  width: 300px;
  margin-bottom: 20px;
}

.start-button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.start-button:hover {
  background-color: #45a049;
}

.rap-lines {
  font-size: 1.2em;
  white-space: pre-wrap;
  text-align: left;
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.rap-line {
  margin-bottom: 40px;
}

.loader {
  font-size: 1.5em;
  margin-top: 20px;
  color: #888;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
