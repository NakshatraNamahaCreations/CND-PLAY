import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ContentsPageService from "../contents/service/contentspage.service";
import GenresPageService from "../general/service/genrespage.service";

const Dashboard = () => {
  const [ContentData, setContentData] = useState([]);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2,
        },
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8,
        },
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          enabled: true,
          style: [
            "verticalLines",
            "squares",
            "horizontalLines",
            "circles",
            "slantedLines",
          ],
        },
      },
      states: {
        hover: {
          filter: "none",
        },
      },
      theme: {
        palette: "palette2",
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
              color: "white",
            },
          },
        },
      ],
      labels: [
        "indie's Movie",
        "Upcoming Movie",
        "Trending Movie",
        "indie's Series",
        "Upcoming Series",
        "Trending Series",
      ],
    },
  });
  const [LikedData, setLikedData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2,
        },
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8,
        },
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          enabled: true,
          style: [
            "verticalLines",
            "squares",
            "horizontalLines",
            "circles",
            "slantedLines",
          ],
        },
      },
      states: {
        hover: {
          filter: "none",
        },
      },
      theme: {
        palette: "palette2",
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
              color: "white",
            },
          },
        },
      ],
      labels: [
        "indie's Movie",
        "Upcoming Movie",
        "Trending Movie",
        "indie's Series",
        "Upcoming Series",
        "Trending Series",
      ],
    },
  });
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const indieMovieViews = ContentData?.filter(
      (item) => item.typeOfMovie === "indie's Movie"
    )?.reduce((total, item) => total + item.views, 0);
    const upcomingmovieViews = ContentData?.filter(
      (item) => item.typeOfMovie === "Upcoming Movie"
    )?.reduce((total, item) => total + item.views, 0);
    const trendingmovieViews = ContentData?.filter(
      (item) => item.typeOfMovie === "Trending Movie"
    ).reduce((total, item) => total + item.views, 0);
    const indieSeriesViews = ContentData?.filter(
      (item) => item.typeOfMovie === "indie's Series"
    )?.reduce((total, item) => total + item.views, 0);
    const upcomingSeriesViews = ContentData?.filter(
      (item) => item.typeOfMovie === "Upcoming Series"
    )?.reduce((total, item) => total + item.views, 0);
    const trendingSeriesViews = ContentData?.filter(
      (item) => item.typeOfMovie === "Trending Series"
    )?.reduce((total, item) => total + item.views, 0);
    const indieMovieLiked = ContentData?.filter(
      (item) => item.typeOfMovie === "indie's Movie"
    )?.reduce((total, item) => total + item.likes, 0);
    const upcomingmovieLiked = ContentData?.filter(
      (item) => item.typeOfMovie === "Upcoming Movie"
    )?.reduce((total, item) => total + item.likes, 0);
    const trendingmovieLiked = ContentData?.filter(
      (item) => item.typeOfMovie === "Trending Movie"
    )?.reduce((total, item) => total + item.likes, 0);

    const indieSeriesLiked = ContentData?.filter(
      (item) => item.typeOfMovie === "indie's Series"
    )?.reduce((total, item) => total + item.likes, 0);
    const upcomingSeriesLiked = ContentData?.filter(
      (item) => item.typeOfMovie === "Upcoming Series"
    )?.reduce((total, item) => total + item.likes, 0);
    const trendingSeriesLiked = ContentData?.filter(
      (item) => item.typeOfMovie === "Trending Series"
    )?.reduce((total, item) => total + item.likes, 0);

    setLikedData((prevChartData) => ({
      ...prevChartData,
      series: [
        indieMovieLiked,
        upcomingmovieLiked,
        trendingmovieLiked,
        indieSeriesLiked,
        upcomingSeriesLiked,
        trendingSeriesLiked,
      ],
    }));
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [
        indieMovieViews,
        upcomingmovieViews,
        trendingmovieViews,
        indieSeriesViews,
        upcomingSeriesViews,
        trendingSeriesViews,
      ],
    }));
  }, [ContentData]);

  const fetchData = async () => {
    const data = await ContentsPageService.fetchContentsAllList();
    setContentData(data);
  };

  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#D10CE8",
  ];

  const options = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ["John", "Doe"],
        ["Joe", "Smith"],
        ["Jake", "Williams"],
        "Amber",
        ["Peter", "Brown"],
        ["Mary", "Evans"],
        ["David", "Wilson"],
        ["Lily", "Roberts"],
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
  };

  const series = [
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30],
    },
  ];

  return (
    <div className="row m-auto">
      {/* <div className="col-md-6 m-auto">
        <p className="text-white mt-5 text-center">Total Views</p>
        <div id="chart" className="row mt-5">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            width={380}
          />
        </div>
      </div>
      <div className="col-md-6 m-auto">
        <p className="text-white mt-5 text-center">Total Likes</p>
        <div id="chart" className="row mt-5">
          <ReactApexChart
            options={LikedData.options}
            series={LikedData.series}
            type="donut"
            width={380}
          />
        </div>
      </div>
      <div>
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div> */}
    </div>
  );
};

export default Dashboard;
