import React from "react";
import dashboardData from "../data/dashboard.data";
import ProfileNav from "../components/ProfileNav";
import DashboardItem from "../components/DashboardItem";

function Dashboard() {
  return (
    <div className="dashboard ">
      <div className=" m-auto max-w-screen-lg px-4">
        <ProfileNav />
        <div className="dashboard-body m-auto px-2 py-20">
          <div className="dashboard-body-content">
            <div className="option relative m-auto flex flex-col justify-center gap-8 md:flex-row">
              {dashboardData.map((item) => (
                <DashboardItem
                  key={item.title}
                  title={item.title}
                  details={item.details}
                  link={item.link}
                  linkName={item.linkName}
                  id={item.id}
                  version={item.version}
                  steps={item.test}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
