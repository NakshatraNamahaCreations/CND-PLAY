
// https://www.bezkoder.com/react-crud-web-api/          For Class Components
// https://www.bezkoder.com/react-hooks-redux-crud/      For Functional Components

import React, { Component } from "react";
import HomepageService from "./service/homepage.class.service";
import { Link } from "react-router-dom";





export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.retrieveAllUnknownTopicData = this.retrieveAllUnknownTopicData.bind(this);
    this.changeStatusAllUnknownTopic = this.changeStatusAllUnknownTopic.bind(this);
    this.state = {
      all_unknown_topic: [],
      currentAllUnknownTopic: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.retrieveAllUnknownTopicData();
  }

  retrieveAllUnknownTopicData() {
    let data = {
        "condition_array": [{
            business_id: 1,
            parent_id: 0,
        }],
    };
    HomepageService.getAll(data)
      .then(response => {
        this.setState({
          all_unknown_topic: response.data
        });
        // console.log(response.data);
      })
      .catch(e => {
       //  console.log(e);
      });
  }
  changeStatusAllUnknownTopic(toChangeStatus, index) {
    let data = {
        "data_array": [{
            status: toChangeStatus
        }],
        "condition_array": [{
            business_id: 1,
            sl_m_category: this.state.all_unknown_topic[index].sl_m_category
        }],
        "order_array": [{
            business_id: 1,
            parent_id: 0,
        }],
    };
    
    HomepageService.changeStatus(data)
    .then(response => {
      // console.log(response)
      this.retrieveAllUnknownTopicData();
    })
    .catch(e => {
     //  console.log(e);
    });
  }


  render() {
    const { searchTitle, all_unknown_topic, currentAllUnknownTopic, currentIndex } = this.state;
    return (
      <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-default'>
            <div className='card-header'>
              <div className="container-fluid p2">
                <div className="row">
                  <div className="col-md-6 text-left">
                    <input className='form-control' id="search" name="search" />
                  </div>
                  <div className="col-md-6 text-right">
                    <button className='btn btn-sm btn-primary fa fa-circle'>Add</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <table className='table table-responsive table-striped'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {
                (all_unknown_topic.length > 0)?
                    all_unknown_topic.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{(index+1)}</td>
                            <td>{value.title}</td>
                            <td>{value.type}</td>
                            <td><button className={`btn btn-sm btn-success fa fa-circle`}  onClick={() => this.changeStatusAllUnknownTopic(((value.status == 1)?0:1), index)}>{(value.status == 1)?'Active':'Inactive'}</button></td>
                            <td>
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-md-6 text-center">
                                    <button className='btn btn-sm btn-warning fa fa-circle'>Edit</button>
                                  </div>
                                  <div className="col-md-6 text-center">
                                    <button className='btn btn-sm btn-warning fa fa-circle' style={{marginRight: "0"}}>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td><button className='btn btn-sm btn-primary' type='button'>Action</button></td>
                          </tr>
                        );
                    })
                :
                  <tr>
                    <td colSpan={6} style={{textAlign: 'center'}}>No Data Found</td>
                  </tr>
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}