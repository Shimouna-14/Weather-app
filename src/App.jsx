import Current from "./components/current"
import Daily from "./components/daily"
import Hourly from "./components/hourly"


function App() {

  return (
    <>
      <div className="relatif w-screen h-screen">
        <header className="w-full h-20 glasseffect mb-5"></header>
        <main className="h-full w-full border px-9">
          {/* Current Weather */}
          <div className=" w-full h-[40%] mb-6 flex m:flex-col justify-between">
            <Current />
          </div>

          {/* Hourly Weather */}
          <div className="glasseffect w-full h-[20%] mb-6 rounded-md">
            <Hourly />
          </div>

          {/* Tommorow Weather */}
          <div className="glasseffect w-full h-[30%] mb-6 rounded-md">
            <Daily />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
