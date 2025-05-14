<template>
    <div class="container">
      <h1>🎵 Spotifyアーティスト検索</h1>
  
      <div class="search">
        <input
          v-model="artist"
          placeholder="アーティスト名を入力"
          @keyup.enter="search"
        />
        <button @click="search" :disabled="!artist">検索</button>
      </div>
  
      <div v-if="isLoading">🔄 検索中...</div>
  
      <div v-if="tracks.length">
        <h2>トップトラック</h2>
        <ul>
          <li v-for="track in tracks" :key="track.id">
            🎵 {{ track.name }} -
            <a
              :href="track.external_urls.spotify"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotifyで聴く
            </a>
          </li>
        </ul>
      </div>
  
      <div v-if="errorMessage" class="error">
        ⚠️ {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const artist = ref('')
  const tracks = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  
  const search = async () => {
  console.log('[UI] 検索開始:', artist.value)
  isLoading.value = true
  errorMessage.value = ''
  tracks.value = []

  try {
    const data = await $fetch('/api/search', {
      params: { artist: artist.value },
      baseURL: '',
    })

    console.log('[UI] トラック取得成功:', data)
    tracks.value = data
  } catch (error) {
    console.error('[UI] 通信エラー:', error)
    errorMessage.value = 'アーティストが見つかりませんでした。'
  } finally {
    isLoading.value = false
  }
}

  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: sans-serif;
  }
  .search {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    font-weight: bold;
    background-color: #1db954;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  