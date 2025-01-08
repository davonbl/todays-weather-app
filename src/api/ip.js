

const getIpData = async() => {
    try {
      const request = await fetch(`https://ipinfo.io/json?token=${process.env.IP_API_KEY}`)
      const jsonResponse = await request.json()
      return jsonResponse
    } catch (error) {
      console.error(error)
    }
  }

export default getIpData;