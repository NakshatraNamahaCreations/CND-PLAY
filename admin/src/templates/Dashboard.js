import React, { useEffect, useState } from "react";
import "./dashboard.css";
import http from "../http-common.function";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

export default function Dashboard() {
  const [contentData, setContentData] = useState([]);
  const [TopData, setTopData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [TotalPurchase, setTotalPurchase] = useState(0);
  const [TotalRevenue, setTotalRevenue] = useState(0);
  const [OrderData, setOrderData] = useState([]);
  const [TotalPlan, setTotalPlan] = useState(0);
  const [Plan, setPlan] = useState([]);
  const [LatesReleased, setLatesReleased] = useState([]);
  useEffect(() => {
    fetchContentsList();
    getAllUser();
    getAllPlan();
    getAllLatest();
    getOrderData();
  }, []);

  const getAllPlan = async () => {
    try {
      let res = await http.get(`/plans/getalldata`);
      if (res.status === 200) {
        setPlan(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching trending list:", error);
    }
  };
  const getOrderData = async () => {
    try {
      let res = await http.get("/getorder");
      if (res.status === 200) {
        let Total = res.data.reduce(
          (acc, current) => Number(acc) + Number(current.amount),
          0
        );
        setOrderData(res.data);
        setTotalRevenue(Total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchContentsList = async () => {
    try {
      const response = await http.get(`/contents/totaldata`);
      if (response.status === 200) {
        const contentData = response.data.data;
        setContentData(contentData);

        let countItemPurchased = 0;
        const data = contentData.filter((content) => {
          const isPurchased = UserData.some((user) =>
            user.purchasedcontent.some((purchase) => {
              if (purchase.content_id === content._id) {
                countItemPurchased++;
                return true;
              }
              return false;
            })
          );
          return isPurchased;
        });

        if (countItemPurchased > 1) {
          setTopData(data);
        }
      }
    } catch (error) {
      console.error("Error fetching data list:", error);
    }
  };

  // latestreleased

  const getAllLatest = async (id) => {
    try {
      const response = await http.get(
        `https://api.cndplay.com/api/contents/latestreleased`
      );
      if (response.status === 200) {
        setLatesReleased(response.data.content);
      }
    } catch (error) {
      // console.error("Error:", error.message);
      // Handle error (e.g., display to user)
    }
  };

  const getAllUser = async () => {
    try {
      const res = await http.get(`/authenticateRoute/getalluser`);
      if (res.status === 200) {
        const allUsers = res.data.alluser;
        setUserData(allUsers);

        const TotalPlan = allUsers.reduce(
          (acc, current) => acc + current?.plan?.length,
          0
        );
        let totalPurchaseCount = allUsers.reduce(
          (acc, current) => acc + current?.purchasedcontent?.length,
          0
        );
        setTotalPurchase(totalPurchaseCount);
        setTotalPlan(TotalPlan);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [selectedRange, setSelectedRange] = useState("allTime");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterDataByRange();
  }, [selectedRange]);

  const filterDataByRange = () => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth() - 1);

    const lastThreeMonths = new Date(currentDate);
    lastThreeMonths.setMonth(currentDate.getMonth() - 2);

    switch (selectedRange) {
      case "lastMonth":
        setFilteredData(
          UserData.filter((item) => new Date(item.createdAt) > lastMonth)
        );
        break;
      case "lastThreeMonths":
        setFilteredData(
          UserData.filter((item) => new Date(item.createdAt) > lastThreeMonths)
        );
        break;
      default:
        setFilteredData(UserData);
    }
  };

  const seriesData = [
    {
      name: "Users Joined",
      data: filteredData.map((item) => ({
        x: new Date(item.createdAt).getTime(),
        y: 1,
      })),
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // title: {
    //   text: "Number of Users Joined Over Time",
    //   align: "left",
    // },
    subtitle: {
      text: "Date",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Number of Users Joined",
      },
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Content Revenue",
        data: [],
      },
      {
        name: "Plans Revenue",
        data: [],
      },
      {
        name: "Total Revenue",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15px",
          endingShape: "rounded",
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: "Rs. Amount",
          style: {
            color: "black",
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return "Rs." + val;
          },
        },
      },
    },
  });

  useEffect(() => {
    const groupedData = OrderData.reduce((acc, order) => {
      const month = moment(order.pruchaseDate).format("MMM");
      if (!acc[month]) {
        acc[month] = { content: 0, plans: 0, revenue: 0 };
      }
      if (order.purchseType === "Content" || order.purchseType === "Club") {
        acc[month].content += parseFloat(order.amount);
      }
      if (order.purchseType === "Plan") {
        acc[month].plans += parseFloat(order.amount);
      }
      acc[month].revenue += parseFloat(order.amount);
      return acc;
    }, {});

    const months = Object.keys(groupedData);
    const contentRevenue = months.map((month) => groupedData[month].content);
    const plansRevenue = months.map((month) => groupedData[month].plans);
    const totalRevenue = months.map((month) => groupedData[month].revenue);

    setChartData((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Content Revenue",
          data: contentRevenue,
        },
        {
          name: "Plans Revenue",
          data: plansRevenue,
        },
        {
          name: "Total Revenue",
          data: totalRevenue,
        },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          categories: months,
        },
      },
    }));
  }, [OrderData]);

  const handleChange = (e) => {
    setSelectedRange(e.target.value);
  };

  return (
    <div className="row mt-5 p-2">
      {/* https://hotflix.volkovdesign.com/admin/index.html */}
      <div className="container-fluid">
        <div className="row row--grid">
          {/* <!-- main title --> */}
          <div className="col-12">
            <div className="main__title mt-5">
              <h2>Dashboard</h2>

              {/* <a href="add-item.html" className="main__title-link">
                add item
              </a> */}
            </div>
          </div>
          {/* <!-- end main title -->

				<!-- stats --> */}

          {/* <!-- end stats -->

				<!-- stats --> */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <div className="row mb-2">
                <span className="col-md-10 me-0">Total Contents</span>
                <span className="col-md-2 me-auto">{contentData.length}</span>
              </div>
              <div className="row ">
                <span className="col-md-6">
                  <div className="row ">
                    <p>Movies</p>
                    <span>
                      {
                        contentData.filter((item) => item.section === "movie")
                          ?.length
                      }
                    </span>
                  </div>
                </span>
                <span className="col-md-6">
                  <div className="row">
                    <p>Series</p>
                    <span>
                      {
                        contentData.filter((item) => item.section === "series")
                          ?.length
                      }
                    </span>
                  </div>
                </span>
              </div>

              <i className="fa-solid fa-film"></i>
            </div>
          </div>
          {/* <!-- end stats -->

				<!-- stats --> */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <span> Total Plan Purchased</span>

              <p>{TotalPlan}</p>
              <i class="fa-solid fa-money-bill"></i>
            </div>
          </div>
          {/* <!-- end stats -->

				<!-- stats --> */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <span>Total Content Purchased</span>
              <p>{TotalPurchase}</p>
              <i class="fa-solid fa-money-bill-1"></i>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <span>Total Revenue</span>
              <p>Rs. {TotalRevenue}</p>
              <i className="fa-solid fa-chart-simple"></i>
            </div>
          </div>
          {/* <!-- end stats -->

				<!-- dashbox --> */}
          <div className="col-12 col-xl-6">
            <div className="dashbox">
              <div className="dashbox__title">
                <h3>
                  <i className="fa-solid fa-trophy icons"></i> Top items
                </h3>

                <div className="dashbox__wrap">
                  <a className="dashbox__refresh" href="#">
                    <i className="icon ion-ios-refresh"></i>
                  </a>
                </div>
              </div>

              <div
                className="dashbox__table-wrap mCustomScrollbar _mCS_2"
                style={{ overflow: "visible" }}
              >
                <table className="main__table main__table--dash">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TITLE</th>
                      <th>CATEGORY</th>
                      {/* <th>RATING</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {TopData &&
                      TopData?.slice(0, 5)?.map((Ele, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="main__table-text">
                                {index + 1}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">{Ele.title}</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {Ele.section}
                              </div>
                            </td>
                            {/* <td>
                              <div className="main__table-text main__table-text--rate">
                                {stars}
                                <span>{averageRating}</span>
                              </div>
                            </td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <div
                  id="mCSB_2_scrollbar_horizontal"
                  className="mCSB_scrollTools mCSB_2_scrollbar mCS-custom-bar3 mCSB_scrollTools_horizontal"
                  style={{ display: "block" }}
                >
                  <div className="mCSB_draggerContainer">
                    <div
                      id="mCSB_2_dragger_horizontal"
                      className="mCSB_dragger"
                      style={{
                        position: "absolute",
                        minWidth: "30px",
                        display: "block",
                        width: "0px",
                        left: "0px",
                      }}
                    >
                      <div className="mCSB_dragger_bar"></div>
                      <div className="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end dashbox -->

				<!-- dashbox --> */}
          <div className="col-12 col-xl-6">
            <div className="dashbox">
              <div className="dashbox__title">
                <h3>
                  <i className="fa-solid fa-film"></i> Latest items
                </h3>

                <div className="dashbox__wrap">
                  <a className="dashbox__refresh" href="#">
                    <i className="icon ion-ios-refresh"></i>
                  </a>
                </div>
              </div>

              <div
                className="dashbox__table-wrap mCustomScrollbar _mCS_3"
                // style={{ overflow: "visible" }}
              >
                <table className="main__table main__table--dash">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TITLE</th>
                      <th>TYPE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LatesReleased?.slice(0, 10)?.map((Ele, index) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <div className="main__table-text">
                                {index + 1}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a>{Ele.title}</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {Ele.section}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--green text-white">
                                {Ele.active === true
                                  ? "Publish"
                                  : "not Publish "}
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <div
                  id="mCSB_3_scrollbar_horizontal"
                  className="mCSB_scrollTools mCSB_3_scrollbar mCS-custom-bar3 mCSB_scrollTools_horizontal"
                  style={{ display: "block" }}
                >
                  <div className="mCSB_draggerContainer">
                    <div
                      id="mCSB_3_dragger_horizontal"
                      className="mCSB_dragger"
                      style={{
                        position: "absolute",
                        minWidth: "30px",
                        display: "block",
                        width: "0px",
                        left: "0px",
                      }}
                    >
                      <div className="mCSB_dragger_bar"></div>
                      <div className="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end dashbox -->

				<!-- dashbox --> */}
          <div className="col-12 col-xl-6" style={{ color: "white" }}>
            <div className="dashbox">
              <div className="dashbox__title" style={{ color: "white" }}>
                <h3>
                  <i className="fa-solid fa-users"></i> Number Of users
                </h3>
                <div className="dashbox__wrap">
                  <div className="dropdown">
                    <select
                      id="timeRange"
                      value={selectedRange}
                      onChange={handleChange}
                    >
                      <option value="lastMonth">Last Month</option>
                      <option value="lastThreeMonths">Last 3 Months</option>
                      <option value="allTime">All Time</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div id="chart">
                  <ReactApexChart
                    options={options}
                    series={seriesData}
                    type="area"
                    height={350}
                  />
                </div>
                <div id="html-dist"></div>
              </div>
            </div>
          </div>
          {/* <!-- end dashbox -->

				<!-- dashbox --> */}
          <div className="col-12 col-xl-6" style={{ color: "white" }}>
            <div className="dashbox">
              <div className="dashbox__title" style={{ color: "white" }}>
                <h3>
                  <i className="fa-solid fa-users"></i> Total Revenue
                </h3>
                {/* <div className="dashbox__wrap">
                  <div className="dropdown">
                    <input
                      value={selectedRange}
                      onChange={handleChange}
                      type="date"
                      name="start"
                    />
                    <input
                      value={selectedRange}
                      onChange={handleChange}
                      type="date"
                      name="end"
                    />
                  </div>
                </div> */}
              </div>
              <div>
                <div id="chart">
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                  />
                </div>
                <div id="html-dist"></div>
              </div>
            </div>
          </div>
          {/* <!-- end dashbox --> */}
        </div>
      </div>
    </div>
  );
}
