const fetcher = async (url) => {
    try {
        const request = await fetch(url)
        const jsonResponse = await request.json()
        return jsonResponse
      } catch (error) {
        console.error(error)
      }
}

export default fetcher