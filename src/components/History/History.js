import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import AuthContext from "../../contexts/AuthContext"

const History = () => {
  const { state } = useContext(AuthContext)

  const [histories, setHistories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    console.log(state)
    axios
      .get(`/api/users/${state.userId}/`, {
        headers: {
          Authorization: `Token ${state.token}`,
        },
      })
      .then((res) => {
        setHistories(res.data.histories)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  console.log("histories", histories)

  return isLoading ? (
    <div className="text-center">
      <div className="text-primary" role="status">
        <span>Loading Histories</span>
      </div>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <ul>
      {histories.map((history, index) => (
        <li key={index}>{history}</li>
      ))}
    </ul>
  )
}

export default History
