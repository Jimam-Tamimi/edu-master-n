import React, { useEffect, useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import axios from "axios";

export default function HeaderStats() {
  const [statsData, setStatsData] = useState({
    verifiedTutorsCount: '', 
    loggedInStudentCount: '', 
    lessonsCompletedCount: ''
})
  useEffect( async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/admin-stats/`)
      setStatsData(res.data)

    } catch (error) {

    }
  }, [])
  
  
  
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Verified Tutors Count"
                  statTitle={`${statsData?.verifiedTutorsCount}`}
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Logged In Student Count"
                  statTitle={`${statsData?.loggedInStudentCount}`}
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Total Lessons Completed "
                  statTitle={`${statsData?.lessonsCompletedCount}`}
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
