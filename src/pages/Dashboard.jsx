import Sidebar from "../components/dashboard/Sidebar"
import Navbar from "../components/dashboard/Navbar"
import StatsCard from "../components/dashboard/StatsCard"
import WelcomeCard from "../components/dashboard/WelcomeCard"
import AssignmentCard from "../components/dashboard/AssignmentCard"

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        <WelcomeCard />

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

          <StatsCard
            title="Assignments"
            value="12"
          />

          <StatsCard
            title="Study Hours"
            value="24h"
          />

          <StatsCard
            title="Savings"
            value="Ksh 3,200"
          />

        </div>

        <AssignmentCard />

      </div>

    </div>
  )
}

export default Dashboard
