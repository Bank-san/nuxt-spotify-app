// server/api/token.ts
export default defineEventHandler(async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  
    if (!clientId || !clientSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Spotifyのクレデンシャルが設定されていません',
      })
    }
  
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })
  
    if (!res.ok) {
      throw createError({
        statusCode: res.status,
        statusMessage: 'Spotifyトークン取得に失敗しました',
      })
    }
  
    const data = await res.json()
    return { access_token: data.access_token }
  })
  