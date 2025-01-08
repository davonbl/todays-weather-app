

const getIpData = async() => {
    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_IP_API_BASE_URL}?token=${process.env.IP_API_KEY}`)
      const jsonResponse = await request.json()
      return jsonResponse
    } catch (error) {
      console.error(error)
    }
  }

export default getIpData;