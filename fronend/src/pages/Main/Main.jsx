"use client"
import IconGrid from "../../components/Dashboard"
import "./Main.css"
function Main() {
  // Example user level - In a real app, you might get this from context, auth state, or an API
  const currentUserLevel = 1

  return (
    <div className="main-container">

      <main className="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            <div className="dashboard-card-container">
              <IconGrid userLevel={currentUserLevel} />
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

export default Main

