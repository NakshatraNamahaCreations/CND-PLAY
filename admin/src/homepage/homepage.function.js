

// https://www.bezkoder.com/react-crud-web-api/          For Class Components
// https://www.bezkoder.com/react-hooks-redux-crud/      For Functional Components



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveAllUnknownTopics,
} from "./actions/index";
const Homepage = () => {
  const unknown_topics = useSelector(state => state.HomepageReducer);
  //   console.log(unknown_topics);
  const dispatch = useDispatch();
  useEffect(() => {

    let data = {
      "condition_array": [{
        business_id: 1,
        parent_id: 0,
      }],
    };
    dispatch(retrieveAllUnknownTopics(data));
  }, []);
  //   const onChangeSearchTitle = e => {
  //     const searchTitle = e.target.value;
  //     setSearchTitle(searchTitle);
  //   };
  //   const setActiveUnknownTopic = (unknown_topic, index) => {
  //     setCurrentUnknownTopic(unknown_topic);
  //     setCurrentIndex(index);
  //   };
  //   const removeAllUnknownTopics = () => {
  //     dispatch(deleteAllAllUnknownTopics())
  //       .then(response => {
  //         console.log(response);
  //         refreshData();
  //       })
  //       .catch(e => {
  //        //  console.log(e);
  //       });
  //   };
  //   const findByTitle = () => {
  //     refreshData();
  //     dispatch(findAllUnknownTopicsByTitle(searchTitle));
  //   };

  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div>
            {/* <div class="proBanner">
              <div>
                <span class="d-flex align-items-center purchase-popup">
                  <p>Get tons of UI components, Plugins, multiple layouts, 20+ sample pages, and more!</p>
                  <a href="https://www.bootstrapdash.com/product/corona-react/?utm_source=organic&amp;utm_medium=banner&amp;utm_campaign=free-preview" rel="noopener noreferrer" target="_blank" class="btn btn-sm purchase-button ml-auto">Check Pro Version</a><i class="mdi mdi-close bannerClose"></i>
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 grid-margin stretch-card">
                <div class="card corona-gradient-card">
                  <div class="card-body py-0 px-0 px-sm-3">
                    <div class="row align-items-center">
                      <div class="col-4 col-sm-3 col-xl-2">
                      </div>
                      <div class="col-5 col-sm-7 col-xl-8 p-0">
                        <h4 class="mb-1 mb-sm-0">New refreshing look</h4>
                        <p class="mb-0 font-weight-normal d-none d-sm-block">Corona admin template now with a new facelift for enhanced legibility and aesthetics!</p>
                      </div>
                      <div class="col-3 col-sm-2 col-xl-2 pl-0 text-center"><button class="btn btn-outline-light btn-rounded get-started-btn">Get Started</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div class="row">
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$12.34</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success "><span class="mdi mdi-arrow-top-right icon-item"></span></div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Potential growth</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$17.34</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+11%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success"><span class="mdi mdi-arrow-top-right icon-item"></span></div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Revenue current</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$12.34</h3>
                          <p class="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-danger"><span class="mdi mdi-arrow-bottom-left icon-item"></span></div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Daily Income</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$31.53</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success "><span class="mdi mdi-arrow-top-right icon-item"></span></div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Expense current</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              {/* <div class="col-md-4 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Transaction History</h4>
                    <div class="aligner-wrapper">
                      <div class="chartjs-size-monitor">
                        <div class="chartjs-size-monitor-expand">
                          <div class=""></div>
                        </div>
                        <div class="chartjs-size-monitor-shrink">
                          <div class=""></div>
                        </div>
                      </div>
                      <canvas height="233" width="467" style="display: block; width: 467px; height: 233px;" class="chartjs-render-monitor"></canvas>
                      <div class="absolute center-content">
                        <h5 class="font-weight-normal text-whiite text-center mb-2 text-white">1200</h5>
                        <p class="text-small text-muted text-center mb-0">Total</p>
                      </div>
                    </div>
                    <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                      <div class="text-md-center text-xl-left">
                        <h6 class="mb-1">Transfer to Paypal</h6>
                        <p class="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                      </div>
                      <div class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                        <h6 class="font-weight-bold mb-0">$236</h6>
                      </div>
                    </div>
                    <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                      <div class="text-md-center text-xl-left">
                        <h6 class="mb-1">Tranfer to Stripe</h6>
                        <p class="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                      </div>
                      <div class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                        <h6 class="font-weight-bold mb-0">$593</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div class="col-md-6 col-xl-4 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-row justify-content-between">
                      <h4 class="card-title">Messages</h4>
                      <p class="text-muted mb-1 small">View all</p>
                    </div>
                    <div class="preview-list">
                      <div class="preview-item border-bottom">
                        <div class="preview-thumbnail"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face6.07adc9a9.jpg" alt="face" class="rounded-circle" /></div>
                        <div class="preview-item-content d-flex flex-grow">
                          <div class="flex-grow">
                            <div class="d-flex d-md-block d-xl-flex justify-content-between">
                              <h6 class="preview-subject">Leonard</h6>
                              <p class="text-muted text-small">5 minutes ago</p>
                            </div>
                            <p class="text-muted">Well, it seems to be working now.</p>
                          </div>
                        </div>
                      </div>
                      <div class="preview-item border-bottom">
                        <div class="preview-thumbnail"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face8.83f317fa.jpg" alt="face" class="rounded-circle" /></div>
                        <div class="preview-item-content d-flex flex-grow">
                          <div class="flex-grow">
                            <div class="d-flex d-md-block d-xl-flex justify-content-between">
                              <h6 class="preview-subject">Luella Mills</h6>
                              <p class="text-muted text-small">10 Minutes Ago</p>
                            </div>
                            <p class="text-muted">Well, it seems to be working now.</p>
                          </div>
                        </div>
                      </div>
                      <div class="preview-item border-bottom">
                        <div class="preview-thumbnail"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face9.37ede861.jpg" alt="face" class="rounded-circle" /></div>
                        <div class="preview-item-content d-flex flex-grow">
                          <div class="flex-grow">
                            <div class="d-flex d-md-block d-xl-flex justify-content-between">
                              <h6 class="preview-subject">Ethel Kelly</h6>
                              <p class="text-muted text-small">2 Hours Ago</p>
                            </div>
                            <p class="text-muted">Please review the tickets</p>
                          </div>
                        </div>
                      </div>
                      <div class="preview-item border-bottom">
                        <div class="preview-thumbnail"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face11.5839877e.jpg" alt="face" class="rounded-circle" /></div>
                        <div class="preview-item-content d-flex flex-grow">
                          <div class="flex-grow">
                            <div class="d-flex d-md-block d-xl-flex justify-content-between">
                              <h6 class="preview-subject">Herman May</h6>
                              <p class="text-muted text-small">4 Hours Ago</p>
                            </div>
                            <p class="text-muted">Thanks a lot. It was easy to fix it .</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-row justify-content-between">
                      <h4 class="card-title mb-1">Open Projects</h4>
                      <p class="text-muted mb-1">Your data status</p>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="preview-list">
                          <div class="preview-item border-bottom">
                            <div class="preview-thumbnail">
                              <div class="preview-icon bg-primary"><i class="mdi mdi-file-document"></i></div>
                            </div>
                            <div class="preview-item-content d-sm-flex flex-grow">
                              <div class="flex-grow">
                                <h6 class="preview-subject">Admin dashboard design</h6>
                                <p class="text-muted mb-0">Broadcast web app mockup</p>
                              </div>
                              <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p class="text-muted">15 minutes ago</p>
                                <p class="text-muted mb-0">30 tasks, 5 issues </p>
                              </div>
                            </div>
                          </div>
                          <div class="preview-item border-bottom">
                            <div class="preview-thumbnail">
                              <div class="preview-icon bg-success"><i class="mdi mdi-cloud-download"></i></div>
                            </div>
                            <div class="preview-item-content d-sm-flex flex-grow">
                              <div class="flex-grow">
                                <h6 class="preview-subject">Wordpress Development</h6>
                                <p class="text-muted mb-0">Upload new design</p>
                              </div>
                              <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p class="text-muted">1 hour ago</p>
                                <p class="text-muted mb-0">23 tasks, 5 issues </p>
                              </div>
                            </div>
                          </div>
                          <div class="preview-item border-bottom">
                            <div class="preview-thumbnail">
                              <div class="preview-icon bg-info"><i class="mdi mdi-clock"></i></div>
                            </div>
                            <div class="preview-item-content d-sm-flex flex-grow">
                              <div class="flex-grow">
                                <h6 class="preview-subject">Project meeting</h6>
                                <p class="text-muted mb-0">New project discussion</p>
                              </div>
                              <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p class="text-muted">35 minutes ago</p>
                                <p class="text-muted mb-0">15 tasks, 2 issues</p>
                              </div>
                            </div>
                          </div>
                          <div class="preview-item border-bottom">
                            <div class="preview-thumbnail">
                              <div class="preview-icon bg-danger"><i class="mdi mdi-email-open"></i></div>
                            </div>
                            <div class="preview-item-content d-sm-flex flex-grow">
                              <div class="flex-grow">
                                <h6 class="preview-subject">Broadcast Mail</h6>
                                <p class="text-muted mb-0">Sent release details to team</p>
                              </div>
                              <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p class="text-muted">55 minutes ago</p>
                                <p class="text-muted mb-0">35 tasks, 7 issues </p>
                              </div>
                            </div>
                          </div>
                          <div class="preview-item">
                            <div class="preview-thumbnail">
                              <div class="preview-icon bg-warning"><i class="mdi mdi-chart-pie"></i></div>
                            </div>
                            <div class="preview-item-content d-sm-flex flex-grow">
                              <div class="flex-grow">
                                <h6 class="preview-subject">UI Design</h6>
                                <p class="text-muted mb-0">New application planning</p>
                              </div>
                              <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p class="text-muted">50 minutes ago</p>
                                <p class="text-muted mb-0">27 tasks, 4 issues </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Revenue</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 class="mb-0">$32123</h2>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                        </div>
                        <h6 class="text-muted font-weight-normal">11.38% Since last month</h6>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right"><i class="icon-lg mdi mdi-codepen text-primary ml-auto"></i></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Sales</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 class="mb-0">$45850</h2>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
                        </div>
                        <h6 class="text-muted font-weight-normal"> 9.61% Since last month</h6>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right"><i class="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Purchase</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 class="mb-0">$2039</h2>
                          <p class="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
                        </div>
                        <h6 class="text-muted font-weight-normal">2.27% Since last month</h6>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right"><i class="icon-lg mdi mdi-monitor text-success ml-auto"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Order Status</h4>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>
                              <div class="form-check form-check-muted m-0"><label class="form-check-label"><input type="checkbox" class="form-check-input" /><i class="input-helper"></i></label></div>
                            </th>
                            <th> Client Name </th>
                            <th> Order No </th>
                            <th> Product Cost </th>
                            <th> Project </th>
                            <th> Payment Mode </th>
                            <th> Start Date </th>
                            <th> Payment Status </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div class="form-check form-check-muted m-0"><label class="form-check-label"><input type="checkbox" class="form-check-input" /><i class="input-helper"></i></label></div>
                            </td>
                            <td>
                              <div class="d-flex"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face1.42d41e61.jpg" alt="face" /><span class="pl-2">Henry Klein</span></div>
                            </td>
                            <td> 02312 </td>
                            <td> $14,500 </td>
                            <td> Dashboard </td>
                            <td> Credit card </td>
                            <td> 04 Dec 2019 </td>
                            <td>
                              <div class="badge badge-outline-success">Approved</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check form-check-muted m-0"><label class="form-check-label"><input type="checkbox" class="form-check-input" /><i class="input-helper"></i></label></div>
                            </td>
                            <td>
                              <div class="d-flex"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face2.7e0e382d.jpg" alt="face" /><span class="pl-2">Estella Bryan</span></div>
                            </td>
                            <td> 02312 </td>
                            <td> $14,500 </td>
                            <td> Website </td>
                            <td> Cash on delivered </td>
                            <td> 04 Dec 2019 </td>
                            <td>
                              <div class="badge badge-outline-warning">Pending</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check form-check-muted m-0"><label class="form-check-label"><input type="checkbox" class="form-check-input" /><i class="input-helper"></i></label></div>
                            </td>
                            <td>
                              <div class="d-flex"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face5.d2417284.jpg" alt="face" /><span class="pl-2">Lucy Abbott</span></div>
                            </td>
                            <td> 02312 </td>
                            <td> $14,500 </td>
                            <td> App design </td>
                            <td> Credit card </td>
                            <td> 04 Dec 2019 </td>
                            <td>
                              <div class="badge badge-outline-danger">Rejected</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check form-check-muted m-0"><label class="form-check-label"><input type="checkbox" class="form-check-input" /><i class="input-helper"></i></label></div>
                            </td>
                            <td>
                              <div class="d-flex"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face3.16c67435.jpg" alt="face" /><span class="pl-2">Peter Gill</span></div>
                            </td>
                            <td> 02312 </td>
                            <td> $14,500 </td>
                            <td> Development </td>
                            <td> Online Payment </td>
                            <td> 04 Dec 2019 </td>
                            <td>
                              <div class="badge badge-outline-success">Approved</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check form-check-muted m-0"><label class="form-check-label">
                                <input type="checkbox" class="form-check-input" /><i class="input-helper"></i></label></div>
                            </td>
                            <td>
                              <div class="d-flex"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face4.d5afaa66.jpg" alt="face" /><span class="pl-2">Sallie Reyes</span></div>
                            </td>
                            <td> 02312 </td>
                            <td> $14,500 </td>
                            <td> Website </td>
                            <td> Credit card </td>
                            <td> 04 Dec 2019 </td>
                            <td>
                              <div class="badge badge-outline-success">Approved</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              {/* <div class="col-md-6 col-xl-4 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Portfolio Slide</h4>
                    <div class="slick-slider portfolio-slider slick-initialized" dir="ltr">
                      <button type="button" data-role="none" class="slick-arrow slick-prev" style="display: block;"> Previous</button>
                      <div class="slick-list">
                        <div class="slick-track" style="width: 3269px; opacity: 1; transform: translate3d(-467px, 0px, 0px);">
                          <div data-index="-1" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true" style="width: 467px;">
                            <div>
                              <div class="item" tabindex="-1" style="width: 100%; display: inline-block;"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/img_6.fd76a180.jpg" alt="carousel-item" /></div>
                            </div>
                          </div>
                          <div data-index="0" class="slick-slide slick-active slick-current" tabindex="-1" aria-hidden="false" style="outline: none; width: 467px;">
                            <div>
                              <div class="item" tabindex="-1" style="width: 100%; display: inline-block;"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/Rectangle.e8706637.jpg" alt="carousel-item" /></div>
                            </div>
                          </div>
                          <div data-index="1" class="slick-slide" tabindex="-1" aria-hidden="true" style="outline: none; width: 467px;">
                            <div>
                              <div class="item" tabindex="-1" style="width: 100%; display: inline-block;"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/Img_5.f54d958b.jpg" alt="carousel-item" /></div>
                            </div>
                          </div>
                          <div data-index="2" class="slick-slide" tabindex="-1" aria-hidden="true" style="outline: none; width: 467px;">
                            <div>
                              <div class="item" tabindex="-1" style="width: 100%; display: inline-block;"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/img_6.fd76a180.jpg" alt="carousel-item" /></div>
                            </div>
                          </div>
                          <div data-index="3" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true" style="width: 467px;">
                            <div>
                              <div class="item" tabindex="-1" style="width: 100%; display: inline-block;"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/Rectangle.e8706637.jpg" alt="carousel-item" /></div>
                            </div>
                          </div>
                          <div data-index="4" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true" style="width: 467px;">
                            <div>
                              <div class="item" tabindex="-1" style="width: 100%; display: inline-block;"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/Img_5.f54d958b.jpg" alt="carousel-item" /></div>
                            </div>
                          </div>
                          <div data-index="5" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true" style="width: 467px;">
                            <div>
                              <div class="item" tabindex="-1" style="width: 100%; display: inline-block;"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/img_6.fd76a180.jpg" alt="carousel-item" /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="button" data-role="none" class="slick-arrow slick-next" style="display: block;"> Next</button>
                    </div>
                    <div class="d-flex py-4">
                      <div class="preview-list w-100">
                        <div class="preview-item p-0">
                          <div class="preview-thumbnail"><img src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face12.711b1a92.jpg" class="rounded-circle" alt="face" /></div>
                          <div class="preview-item-content d-flex flex-grow">
                            <div class="flex-grow">
                              <div class="d-flex d-md-block d-xl-flex justify-content-between">
                                <h6 class="preview-subject">CeeCee Bass</h6>
                                <p class="text-muted text-small">4 Hours Ago</p>
                              </div>
                              <p class="text-muted">Well, it seems to be working now.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="text-muted">Well, it seems to be working now. </p>
                    <div class="progress progress-md portfolio-progress">
                      <div class="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div class="col-md-12 col-xl-4 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">To do list</h4>
                    <form class="add-items d-flex">
                      <input type="text" class="form-control h-auto" placeholder="What do you need to do today?" required="" value="" />
                      <button type="submit" class="btn btn-primary">Add</button>
                    </form>
                    <div class="list-wrapper">
                      <ul class="d-flex flex-column todo-list">
                        <li>
                          <div class="form-check"><label for="" class="form-check-label"><input class="checkbox" type="checkbox" /> 
                          Pick up kids from school 
                          <i class="input-helper"></i></label></div>
                          <i class="remove mdi mdi-close-box"></i>
                        </li>
                        <li class="completed">
                          <div class="form-check"><label for="" class="form-check-label"><input class="checkbox" type="checkbox" checked="" /> 
                          Prepare for presentation 
                          <i class="input-helper"></i></label></div>
                          <i class="remove mdi mdi-close-box"></i>
                        </li>
                        <li>
                          <div class="form-check"><label for="" class="form-check-label"><input class="checkbox" type="checkbox" /> 
                          Print Statements 
                          <i class="input-helper"></i></label></div>
                          <i class="remove mdi mdi-close-box"></i>
                        </li>
                        <li>
                          <div class="form-check"><label for="" class="form-check-label"><input class="checkbox" type="checkbox" /> 
                          Create invoice 
                          <i class="input-helper"></i></label></div>
                          <i class="remove mdi mdi-close-box"></i>
                        </li>
                        <li class="completed">
                          <div class="form-check"><label for="" class="form-check-label"><input class="checkbox" type="checkbox" checked="" /> 
                          Call John 
                          <i class="input-helper"></i></label></div>
                          <i class="remove mdi mdi-close-box"></i>
                        </li>
                        <li>
                          <div class="form-check"><label for="" class="form-check-label"><input class="checkbox" type="checkbox" /> 
                          Meeting with Alisa 
                          <i class="input-helper"></i></label></div>
                          <i class="remove mdi mdi-close-box"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Visitors by Countries</h4>
                    <div class="row">
                      <div class="col-md-5">
                        <div class="table-responsive">
                          <table class="table">
                            <tbody>
                              <tr>
                                <td><i class="flag-icon flag-icon-us"></i></td>
                                <td>USA</td>
                                <td class="text-right"> 1500 </td>
                                <td class="text-right font-weight-medium"> 56.35% </td>
                              </tr>
                              <tr>
                                <td><i class="flag-icon flag-icon-de"></i></td>
                                <td>Germany</td>
                                <td class="text-right"> 800 </td>
                                <td class="text-right font-weight-medium"> 33.25% </td>
                              </tr>
                              <tr>
                                <td><i class="flag-icon flag-icon-au"></i></td>
                                <td>Australia</td>
                                <td class="text-right"> 760 </td>
                                <td class="text-right font-weight-medium"> 15.45% </td>
                              </tr>
                              <tr>
                                <td><i class="flag-icon flag-icon-gb"></i></td>
                                <td>United Kingdom</td>
                                <td class="text-right"> 450 </td>
                                <td class="text-right font-weight-medium"> 25.00% </td>
                              </tr>
                              <tr>
                                <td><i class="flag-icon flag-icon-ro"></i></td>
                                <td>Romania</td>
                                <td class="text-right"> 620 </td>
                                <td class="text-right font-weight-medium"> 10.25% </td>
                              </tr>
                              <tr>
                                <td><i class="flag-icon flag-icon-br"></i></td>
                                <td>Brasil</td>
                                <td class="text-right"> 230 </td>
                                <td class="text-right font-weight-medium"> 75.00% </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <div class="d-sm-flex justify-content-center justify-content-sm-between py-2 w-100">
              <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 
                <a href="https://www.bootstrapdash.com/" target="_blank" rel="noopener noreferrer">
                  bootstrapdash.com 
                </a>
                2020
              </span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Free 
                <a href="https://www.bootstrapdash.com/react-admin-templates/" target="_blank" rel="noopener noreferrer"> 
                react admin 
                </a> 
                templates from BootstrapDash.com.  
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Homepage;