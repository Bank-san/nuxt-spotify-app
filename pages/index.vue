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
  
      <div v-if="isLoading" class="loading">🔄 検索中...</div>
  
      <div v-if="tracks.length">
        <h2>トップトラック</h2>
        <div class="track-list">
          <div v-for="track in tracks" :key="track.id" class="track-card">
            <img :src="track.album.images[0]?.url" alt="Album Art" class="cover" />
            <div class="info">
              <h3>{{ track.name }}</h3>
              <p>{{ track.artists.map(a => a.name).join(', ') }}</p>
              <audio
                v-if="track.preview_url"
                :src="track.preview_url"
                controls
                class="player"
              />
              <p v-else class="no-preview">プレビュー非対応</p>
              <a
                :href="track.external_urls.spotify"
                target="_blank"
                rel="noopener noreferrer"
                class="spotify-link"
              >
                Spotifyで開く →
              </a>
            </div>
          </div>
        </div>
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
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: 'Segoe UI', sans-serif;
    color: #222;
  }
  .search {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  input {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  button {
    padding: 0.75rem 1.5rem;
    font-weight: bold;
    background-color: #1db954;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  button:not(:disabled):hover {
    background-color: #18ac4d;
  }
  .loading {
    margin: 1rem 0;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .track-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .track-card {
    background: #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s;
  }
  .track-card:hover {
    transform: translateY(-3px);
  }
  .cover {
    width: 100%;
    height: 280px;
    object-fit: cover;
  }
  .info {
    padding: 1rem;
  }
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  .player {
    width: 100%;
    margin: 0.5rem 0;
  }
  .no-preview {
    color: #888;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }
  .spotify-link {
    color: #1db954;
    font-weight: bold;
    text-decoration: none;
  }
  .spotify-link:hover {
    text-decoration: underline;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  