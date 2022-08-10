import React from 'react'
import "./Home.css"
import { Container, Tab, Table, Tabs, Button } from "react-bootstrap";
import { useEffect,useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import{ DropdownButton,Dropdown,Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import axios from "axios"


function Home() {

    const navigate = useNavigate()
    const [newdata, setnewdata] = useState([]);
    const [pending, setPending] = useState([]);
    const [alldata, setAlldata] = useState([]);
    const [status, setStatus] = useState("");
    const notify = (error) => toast(error);

    const manage = async () => {
        const AllApplication = await axios.get(
          "http://localhost:4000/admin/alldata"
        );
        if (AllApplication.status) {
          setAlldata(AllApplication.data.data);
          console.log(AllApplication);
        }
    
        const newApplications = await axios.get(
          "http://localhost:4000/admin/newdata"
        );
        if (newApplications.status) {
          setnewdata(newApplications.data.datas);
          // console.log(newApplications);
        }
        const pendingApplications = await axios.get(
          "http://localhost:4000/admin/pendingapplications"
        );
        if (pendingApplications.status) {
          setPending(pendingApplications.data.data);
          // console.log(pendingApplications);
        }
      };

      useEffect(() => {
        manage();
      }, []);

      async function ChangeStatus(status, id) {
        let obj = { status, id };
        if (status !== "Rejected") {
          try {
            await axios
              .post("http://localhost:4000/admin/changeStatus", obj)
              .then((res) => {
                manage();
                if (status === "Approved") {
                  notify(status);
                  setStatus(status);
                  setPending(
                    pending.filter((row) => {
                      console.log(row._id);
                      console.log(res.data.datas.id);
                      return row._id !== res.data.datas.id;
                    })
                  );
                }
                if (status === "Pending") {
                  console.log("rhuh");
    
                  notify("Application Added to Pending list");
                  setStatus(status);
                  console.log(res.data.data);
                  pending.push(res.data.data);
                  console.log(pending);
                  setnewdata(
                    newdata.filter((row) => {
                      console.log(row._id);
                      console.log(res.data.datas.id);
                      return row._id !== res.data.datas.id;
                    })
                  );
                }
    
                console.log(
                  "🚀 ~ file: DashBoard.js ~ line 91 ~ .then ~ res.data",
                  res.data
                );
              });
          } catch (error) {}
        } else if (status === "Rejected") {
          swal({
            title: "Are you sure?",
            text: "Once Rejected, you will not be able to recover this Application!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              swal("Poof! This Applicatiion  has been Rejected!", {
                icon: "success",
              }).then(async () => {
                try {
                  await axios
                    .post("http://localhost:4000/admin/changeStatus", obj)
                    .then((res) => {
                      if (status === "Rejected") {
                        manage();
                        setStatus(status);
                        // setPendingList(res.data)
                      }
    
                      console.log(
                        "🚀 ~ file: DashBoard.js ~ line 91 ~ .then ~ res.data",
                        res.data
                      );
                    });
                } catch (error) {}
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        }
      }

    return (
        <div className="m-5">
            <ToastContainer />
            <Container fluid>
                <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="All Data">
                        {alldata.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>Application ID</th>
                                        <th>Company Name</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alldata.map((obj, index) => {
                                        return (
                                            <tr key={obj._id}>
                                                <td>{index + 1}</td>
                                                <td>{obj._id}</td>
                                                <td>{obj.companyName}</td>
                                                <td style={{ color: "orange" }}>{obj.status}</td>
                                                {/* <td> </td> */}
                                                <td>
                                                    <p
                                                        className="view"
                                                        style={{
                                                            color: "turquoise",
                                                            textAlign: "center",
                                                        }}
                                                        onClick={() => {
                                                            navigate("/admin/viewapplication");
                                                            localStorage.setItem(
                                                                "appId",
                                                                JSON.stringify([obj._id, obj.userId])
                                                            );
                                                        }}
                                                    >
                                                        View Application
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <h3 style={{ color: "red" }}>
                                    No Application Under Processing
                                </h3>
                            </div>
                        )}
                    </Tab>
                    <Tab eventKey="profile" onClick={manage} title="New Data">
                        {newdata.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>Application ID</th>
                                        <th>Company Name</th>
                                        {/* <th>Status</th> */}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newdata.map((obj, index) => {
                                        return (
                                            <tr key={obj._id}>
                                                <td>{index + 1}</td>
                                                <td>{obj._id}</td>
                                                <td>{obj.companyName}</td>
                                                {/* <td style={{ color: "orange" }}>{obj.status}</td> */}
                                                <td style={{ textAlign: "center" }}>
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => {
                                                            setStatus("");
                                                            ChangeStatus("Pending", obj._id);
                                                        }}
                                                    >
                                                        Pending
                                                    </button>
                                                </td>
                                                <td>
                                                    <p
                                                        className="view"
                                                        style={{
                                                            color: "turquoise",
                                                            textAlign: "center",
                                                        }}
                                                        onClick={() => {
                                                            navigate("/admin/viewapplication");
                                                            localStorage.setItem(
                                                                "appId",
                                                                JSON.stringify([obj._id, obj.userId])
                                                            );
                                                        }}
                                                    >
                                                        View Application
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <h3 style={{ color: "red" }}>
                                    No Application Under Processing
                                </h3>
                            </div>
                        )}
                    </Tab>
                    <Tab eventKey="contact" title="Pending Data">
                        {pending.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>Application ID</th>
                                        <th>Company Name</th>
                                        {/* <th>Status</th> */}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pending.map((obj, index) => {
                                        return (
                                            <tr key={obj._id}>
                                                <td>{index + 1}</td>
                                                <td>{obj._id}</td>
                                                <td>{obj.companyName}</td>
                                                {/* <td style={{ color: "orange" }}>{obj.status}</td> */}
                                                <td style={{ textAlign: "center" }}>
                                                    <button
                                                        className="btn btn-info"
                                                        style={{
                                                            color: "white",
                                                            textAlign: "center",
                                                        }}
                                                        onClick={() => {
                                                            navigate("/viewApplication");
                                                            localStorage.setItem(
                                                                "appId",
                                                                JSON.stringify([obj._id, obj.userId])
                                                            );
                                                        }}
                                                    >
                                                        View Application
                                                    </button>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => {
                                                            setStatus("");
                                                            ChangeStatus("Approved", obj._id);
                                                        }}
                                                    >
                                                        Approved
                                                    </button>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            setStatus("");
                                                            ChangeStatus("Rejected", obj._id);
                                                        }}
                                                    >
                                                        Decline
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <h3 style={{ color: "red" }}>
                                    No Application Under Processing
                                </h3>
                            </div>
                        )}
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
}

export default Home

