import React from "react";
import LeftMenu from "./LeftMenu";

import DHeader from "./DHeader";
import AreaCharts from "./AreaCharts";
import CustomShapeBarCharts from "./CustomShapeBarCharts";
import SimpleBarCharts from "./SimpleBarCharts";
import PieChartWithCustomizedLabels from "./PieChartWithCustomizedLabels";

function DashboardIndex() {
  return (
    <>
      <div className="lg:grid  bg-[#F7F7F7]   pl-10 lg:grid-cols-5  justify-items-left p-[3rem] ">
        <LeftMenu />
        <DHeader />
        <div className=" grid-cols-1 pl-5 min-h-[70rem] lg:min-h-0   grid lg:grid-cols-2 lg:col-span-4  mr-10 mt-14">
          <PieChartWithCustomizedLabels />
          <CustomShapeBarCharts />
          <AreaCharts />
          <SimpleBarCharts />
        </div>
      </div>
    </>
  );
}

export default DashboardIndex;
