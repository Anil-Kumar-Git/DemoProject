import React,{useEffect} from "react";
import { Link } from "react-router-dom";

const Error = () => {
    
  return (
    <div className="background-dark main">
      <br/>
      <br/>
      <br/>
      <main >
        <div className="container">
          <section className="section error-404  min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <h1>404</h1>
            <h2 style={{color:"red"}}>The page you are looking for doesn't exist.</h2>
            <Link className="btn" to="/">
              Back to home
            </Link>
            <img
              src="/assets/img/not-found.svg"
              className="img-fluid py-5"
              alt="Page Not Found"
            />
          </section>
        </div>
      </main>
      </div>
  );
};

export default Error;
