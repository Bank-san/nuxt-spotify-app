import { getSpotifyAccessToken } from '../utils/spotify'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const artist = query.artist as string

  console.log('[API] 検索開始: ', artist)

  const accessToken = await getSpotifyAccessToken()
  console.log('[API] アクセストークン取得成功')

  const searchRes = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artist)}&type=artist&limit=1`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const searchData = await searchRes.json()
  console.log('[API] アーティスト検索結果: ', JSON.stringify(searchData.artists.items[0], null, 2))

  const artistId = searchData.artists.items[0]?.id
  if (!artistId) {
    console.log('[API] アーティストが見つかりません')
    return { error: 'アーティストが見つかりません' }
  }

  const topTracksRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=JP`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const topTracks = await topTracksRes.json()
  console.log('[API] トップトラック取得成功')

  return topTracks.tracks
})
