import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Url } from "../Middleware/BaseUrl/BaseUrl";

const ContactUsers = () => {
    const inputValue = {
        name: "",
        email: "",
        subject:"",
        message:""
      };
      const [value, setValue] = useState(inputValue);
      const [doneMessage, setDoneMessage] = useState("");
      const [notDoneMessage, setNotDoneMessage] = useState("");
    
      const { name, email,subject,message } = value;
    
  
    
      const onChangeH = (e) => {
        const { name, value } = e.target;
    
        setValue((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const sendMessage = async (e) => {
        e.preventDefault();
    
        let token = localStorage.getItem("token");
    
        let responce = await fetch(
          `${Url}/user/info`,
          {
            method: "post",
            body: JSON.stringify({ name, email, message,subject}),
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        let result = await responce.json();
        if (result.success) {
            setValue(" ")  
          setDoneMessage("Your message has been sent.")

        } else {
          setNotDoneMessage("message has been not sent")
        }
        setTimeout(() => {
            setDoneMessage(" ");
            setNotDoneMessage(" ");
        }, 3000);
       
      };

      useEffect(()=>{
        setValue(value)
      },[value])
    

  return (
    <div>
    <main id="main" className="main">
  <div className="pagetitle">
    <h1>Contact</h1>
  </div>
  {/* End Page Title */}
  <section className="section contact">
    <div className="row gy-4">
      <div className="col-xl-12">
        <div className="card p-4">
          <div
            action="forms/contact.php"
            method="post"
            className="php-email-form"
          >
            <div className="row gy-4">
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={onChangeH}
                />
              </div>
              <div className="col-md-6 ">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Your Email"
                  required=""
                  value={email}
                  onChange={onChangeH}
                />
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  placeholder="Subject"
                  required=""
                  value={subject}
                  onChange={onChangeH}
                />
              </div>
              <div className="col-md-12">
                <textarea
                  className="form-control"
                  name="message"
                  rows={6}
                  placeholder="Message"
                  required=""
                  defaultValue={""}
                  value={message}
                  onChange={onChangeH}
                />
              </div>
              <div className="feedback" style={{color:"green"}}>{doneMessage}</div>
              <div className="feedback error-red">{notDoneMessage}</div>
              <div className="col-md-12 text-center">
                <button type="submit" onClick={sendMessage}>Send Message</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</main>
    </div>
  );
};

export default ContactUsers;
