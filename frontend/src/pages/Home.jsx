import Reac,{useState} from 'react'
import axios from "axios";


function Home() {

const [text, setText] = useState("");
const [summary, setSummary] = useState("");
const [loading, setLoading] = useState(false);

const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text first!");
      return;
    }
  try {
      setLoading(true);

      const res = await axios.post("http://localhost:3002/api/summary", {
        text,
        wordLimit: 100, 
      });

      setSummary(res.data.summaryText);
    } catch (err) {
      console.error(err);
      alert("Failed to summarize");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="mt-5 ml-5 ">

      <h1 className='block text-sm font-bold uppercase mb-2'>Summarize Your Text under 100 words</h1>
      <div className="flex gap-2">
        <input
          placeholder="Enter your essay here..."
          type="text"
          className="border border-s-black p-2 rounded-[10px] w-[400px] min-h-[50px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleSummarize}
          className="border border-s-black p-2 bg-blue-500 hover:bg-blue-400 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Submit"}
        </button>
      </div>

      {summary && (
        <div className="mt-4">
          <p className=" block text-sm font-bold uppercase mb-2">Summarized Text:</p>
          <div className="border border-s-black p-2 w-[400px] min-h-[100px] rounded-[10px]">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home