const AssignmentCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow mt-6">

      <h2 className="text-xl font-bold mb-4">
        Upcoming Assignments
      </h2>

      <div className="space-y-3">

        <div className="bg-gray-100 p-3 rounded-lg">
          React Dashboard - Friday
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          Database CAT - Monday
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          Networking Notes - Tuesday
        </div>

      </div>

    </div>
  )
}

export default AssignmentCard