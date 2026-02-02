import { useEffect, useState } from "react"

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetchFn()
        if (isMounted) {
          setData(result || [])
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch")
          setData([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, deps)

  return { data, loading, error, setData }
}

export default useFetch
