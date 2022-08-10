import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container } from "react-bootstrap";
// import { SuccessMessage } from "../../components/Errormsg/errormsg";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import UserTopBar from "../UserTopbar/userTopBar"
import UserSidebar from '../UserSidebar/userSidebar'


function ViewApp() {
    const [app, setApp] = useState({});
    const [confirmation, setConfimration] = useState("");
    const id = JSON.parse(localStorage.getItem("appId"));
    console.log("id", id);
    const viewApplication = async () => {
        let appDetails = await axios.get(
            `http://localhost:4000/admin/viewApplication/${id[0]}`
        );
        console.log(appDetails);
        setApp(appDetails.data.data);
        console.log(app);
    };

    useEffect(() => {
        viewApplication();
    }, []);

    return (
        <>


            <div className="App">

                <UserTopBar />
                <div className="container">
                    <UserSidebar />
                    <div className='others'>
                        <div style={{ marginTop: "3%" }}>
                            <div className="d-flex justify-content-around">
                                <Container>
                                    <Card style={{ width: "100%", backgroundColor: "#f7f7f7" }}>
                                        <Card.Body>
                                            {/* <Card.Title>{app.name} Application</Card.Title> */}

                                            <dl class="row">
                                                <dt class="col-sm-3">Name</dt>
                                                <dd class="col-sm-9">: {app.name}</dd>
                                                <dt class="col-sm-3">Email</dt>
                                                <dd class="col-sm-9">: {app.email}</dd>
                                                <dt class="col-sm-3">Phone No</dt>
                                                <dd class="col-sm-9">: {app.phoneNo}</dd>

                                                <dt class="col-sm-3">Company Name</dt>
                                                <dd class="col-sm-9">: {app.companyName}</dd>
                                                <dt class="col-sm-3">Address</dt>
                                                <dd class="col-sm-9">: {app.address}</dd>
                                                <dt class="col-sm-3">City</dt>
                                                <dd class="col-sm-9">: {app.city}</dd>
                                                <dt class="col-sm-3">State</dt>
                                                <dd class="col-sm-9">: {app.state}</dd>
                                                <dt class="col-sm-3">Team and Backgorund</dt>
                                                <dd class="col-sm-9">: {app.team}</dd>
                                                <dt class="col-sm-3">Company and products</dt>
                                                <dd class="col-sm-9">: {app.product}</dd>
                                                <dt class="col-sm-3">Solution and uniqueness</dt>
                                                <dd class="col-sm-9">: {app.solution}</dd>
                                                <dt class="col-sm-3">Value Propostions</dt>
                                                <dd class="col-sm-9">: {app.proposition}</dd>
                                                <dt class="col-sm-3">Incubation Type</dt>
                                                <dd class="col-sm-9">: {app.type}</dd>
                                                <dt class="col-sm-3">Section</dt>
                                                <dd class="col-sm-9">: {app.section}</dd>
                                                <dt class="col-sm-3">Slot No</dt>
                                                <dd class="col-sm-9">: {app.slot_no}</dd>
                                            </dl>
                                        </Card.Body>
                                    </Card>
                                    {/* {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "} */}
                                </Container>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>




    )








}

export default ViewApp;
