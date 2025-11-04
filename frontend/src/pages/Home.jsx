import React, { useState } from 'react'
import axios from 'axios'
import { SUMMARY_BASE_URL } from '../Services/config'

function Home() {
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text first!")
      return
    }
    try {
      setLoading(true)
      const res = await axios.post(
        `${SUMMARY_BASE_URL}/summary`,
        { text, wordLimit: 100 },
        { withCredentials: true }
      )
      setSummary(res.data.summaryText)
    } catch (err) {
      console.error(err)
      alert("Failed to summarize")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono grid grid-cols-1 lg:grid-cols-2 border-t-2 border-black">
      {/* Left Section */}
      <div className="p-10 border-r-2 border-black flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold uppercase tracking-tight leading-tight mb-8 ">
          Text-Short<br /><span className='text-blue-900'>Summarizer</span>
        </h1>
        <p className="text-lg uppercase font-bold">
          Reduce your essay to under 100 words. No fluff. No polish. Just raw clarity.
        </p>
      </div>

      {/* Right Section */}
      <div className="p-10 flex flex-col justify-center border-l-2 border-black">
        <label className="block text-sm font-bold uppercase mb-2">Essay</label>
        <textarea
          placeholder="Enter your essay here..."
          className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white min-h-[120px] mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSummarize}
          className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-none"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Submit"}
        </button>

        {summary && (
          <div className="mt-6">
            <p className="text-sm font-bold uppercase mb-2">Summarized Text:</p>
            <div className="border-2 border-black p-2 bg-transparent text-black min-h-[100px]">
              {summary}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
