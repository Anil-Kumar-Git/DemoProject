import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Url } from "../Middleware/BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { setEdit } from "../Services/store/Slice";

const List = () => {
  const del = "false";
  const upd = "true";
  const [conform, setConform, getConform] = useState(false);
  const [search, setSearch] = useState([]);
  const [state, setState] = useState([]);
  const dispatch=useDispatch();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
   
    let responce = await fetch(`${Url}/user/alldata`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let result = await responce.json();
    if (result.success == true) {
      var data = result.data;
      setState(data);
    } else {
      alert(result.message);
    }
  };

  const oneUser = async (id, e) => {
    let responce = await fetch(`${Url}/user/getSingleUser/${id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await responce.json();
    if (e == del) {
      deleteHandle(id, result);
    } else if (e == upd) {
      editHandle(result.data);
      // console.log(id,result)
    }
  };

  function myConform() {
    var txt = `Are you sure for delete this user`;
    if (window.confirm(txt)) {
      var val = true;
      // setConform(true);
    } else {
      var val = false;
      // setConform(false);
    }
    setConform(val);
  }

  const deleteHandle = async (id, result) => {
    if (result.success == true) {
      myConform();

      setConform(async (state) => {
        // console.log(state)
        if (state === true) {
          const deletevalue = await fetch(`${Url}/user/deleteUser/${id}`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          getApi();
        } 
      });
    } else {
      alert(result.message);
    }
  };

  const editHandle = (data) => {
    dispatch(setEdit(data))
    // props.data(id);
    navigate("/edit-user");
  };

  useEffect(() => {
    searchHandler();
  }, [search]);

  const searchHandler = async () => {
    if (search) {
      let responce = await fetch(`${Url}/user/getUserBySearch/${search}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let result = await responce.json();
      if (result.success == true) {
        var data = result.data;
        setState(data);
      }
    } else {
      getApi();
    }
  };

  const pageDataHandle = async (id, result) => {
    const responce = await fetch(`${Url}/user/getUserWithpagination/1/`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newresult = await responce.json();
    console.log(newresult);
  };

  return (
    <div className="background-dark">
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Users List</h1>
        </div>
        {/* <button onClick={pageDataHandle}>get</button> */}
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  {/* Table with stripped rows */}
                  <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div className="dataTable-top">
                      <Link to="/add-user">
                        <button className="btn btn-primary rounded-pill">
                          Add User
                        </button>
                      </Link>

                      <div className="dataTable-search">
                        <input
                          className="dataTable-input"
                          placeholder="Search..."
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="dataTable-container">
                      <table className="table datatable dataTable-table">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "7.45161%" }}
                            >
                              <a className="dataTable-sorter">#</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "15.5269%" }}
                            >
                              <a className="dataTable-sorter">Name</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "15.914%" }}
                            >
                              <a className="dataTable-sorter">Email</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "15.7527%" }}
                            >
                              <a className="dataTable-sorter">PhoneNumber</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "19.3548%" }}
                            >
                              <a className="dataTable-sorter">Adddress</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "19.3548%" }}
                              colSpan={2}
                            >
                              <a className="dataTable-sorter">Action</a>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.map((item, index) => {
                            return (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNo}</td>
                                <td>{item.address}</td>
                                <td>
                                  <button
                                    className="btn btn-danger rounded-pill"
                                    onClick={() => oneUser(item._id, del)}
                                  >
                                    <i className="ri-delete-bin-5-line" />
                                  </button>{" "}
                                  <button
                                    className="btn btn-info rounded-pill"
                                    onClick={() => oneUser(item._id, upd)}
                                  >
                                    <i className="ri-edit-2-line" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="dataTable-bottom">
                      <div className="dataTable-dropdown">
                        <label>
                          <select className="dataTable-selector">
                            <option value={5}>5</option>
                            <option value={10} selected="">
                              10
                            </option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                          </select>{" "}
                          entries per page
                        </label>
                      </div>
                      <nav className="dataTable-pagination">
                        <ul className="dataTable-pagination-list" />
                      </nav>
                    </div>
                  </div>
                  {/* End Table with stripped rows */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default List;
