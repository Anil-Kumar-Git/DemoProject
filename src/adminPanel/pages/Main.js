import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="background-dark">
      {/* main start */}
      <main id="main" className="main">
        {/*Dashboard icon start*/}
        <div className="pagetitle">
          <h1>Dashboard</h1>
        </div>
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Wel-Come
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        {/* Dashboard icon end  */}

        {/* fully page cover */}

        {/*end fully page cover */}
      </main>
      {/* main end */}
    </div>
  );
};

export default Dashboard;
