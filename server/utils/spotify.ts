// server/utils/spotify.ts
export const getSpotifyAccessToken = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  
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
      throw new Error('Failed to get Spotify access token')
    }
  
    const data = await res.json()
    return data.access_token
  }
  