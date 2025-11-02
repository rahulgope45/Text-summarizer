import React, { useEffect, useState } from "react"
import axios from "axios"

function History() {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/history", {
          withCredentials: true,
        })
        setSummaries(res.data)
      } catch (error) {
        console.error("Error fetching summaries:", error.response?.data || error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSummaries()
  }, [])

 const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/history/${id}`, {
        withCredentials: true,
      });
      // Update UI instantly
      setSummaries((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting summary:", error);
      alert("Failed to delete summary");
    }
  };


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-black">
        <p className="text-xl uppercase font-bold">Loading...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">
      <div className="w-full max-w-3xl  p-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest border-b-4 border-black pb-2 mb-6 text-center">
          Your Summary History
        </h2>

        {summaries.length === 0 ? (
          <p className="text-center text-black uppercase font-bold">No summaries found yet.</p>
        ) : (
          <div className="space-y-6">
            {summaries.map((item) => (
              <div key={item._id} className="border-2 border-black p-4">
                <p className="text-xs uppercase font-bold mb-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="mb-2">
                  <span className="font-bold uppercase">Original:</span>{" "}
                  {item.orignalText.slice(0, 100)}...
                </p>
                <p>
                  <span className="font-bold uppercase">Summary:</span> {item.summarizedText}
                </p>
                <button 
                 className="text-red-600 hover:text-red-800 font-semibold"
                onClick={() => handleDelete(item._id)}>
                    Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History
