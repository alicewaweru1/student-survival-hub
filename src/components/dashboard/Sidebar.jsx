const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-black text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Student Hub
      </h1>

      <ul className="space-y-5">

        <li className="hover:text-yellow-400 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-yellow-400 cursor-pointer">
          Assignments
        </li>

        <li className="hover:text-yellow-400 cursor-pointer">
          Resources
        </li>

        <li className="hover:text-yellow-400 cursor-pointer">
          Timetable
        </li>

        <li className="hover:text-yellow-400 cursor-pointer">
          Budget
        </li>

      </ul>

    </div>
  )
}

export default Sidebar