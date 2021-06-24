import './App.css'
import { useState, createRef } from "react"

function App() {

  const inputRef = createRef()

  // state variables
  const [result, setResult] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleOnChange = async (event) => {
    event.preventDefault()
    const input = inputRef.current.value
    const res = await fetch("https://url-shortener-service.p.rapidapi.com/shorten", {
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-key": "f1b9bd376cmsh69b2dc6b5de82c5p1c2104jsncdd9d77b848c",
        "x-rapidapi-host": "url-shortener-service.p.rapidapi.com"
      },
      "body": "url=" + input
    })

    const data = await res.json()
    setResult(data)
    setShowResults(true)
  }

  const Results = () => (
    <div>
      <h6>Here's your short & pretty URL 🙃</h6>
      <h5><a href={result.result_url}>{result.result_url}</a></h5>
    </div>
  )

  return (
    <div className="App container">
      <div className="row justify-content-md-center">
        <h1><b>URL Shortner</b></h1>
        <form className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
          <div className="form-group">
            <input type="text" class="form-control" id="inputUrl" placeholder="Paste the ugly long link here!" onChange={handleOnChange} ref={inputRef} />
          </div>
        </form>
        {showResults ? <Results /> : null}
        <h6>Made with ❤️ by <a href={"https://www.linkedin.com/in/iamvkm"} target=" ">Vivek Mishra</a>.</h6>
      </div>
    </div>
  )
}

export default App
