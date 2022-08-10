// import React from 'react'
import React, { useEffect, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


function Slot() {
  const notify = (error) => toast(error);
  let A, B, C, D, E;
  const [sectionA, setSectionA] = useState([]);
  const [sectionB, setSectionB] = useState([]);
  const [sectionC, setSectionC] = useState([]);
  const [sectionD, setSectionD] = useState([]);
  const [sectionE, setSectionE] = useState([]);
  const [slotId, setSlotId] = useState("");
  const [slotnumber, setslot_no] = useState("");
  const [slotSection, setSlotSection] = useState("");
  const [applicantsList, setApplicantsList] = useState([]);
  const [applicantId, setApplicantId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    manage();
  }, []);
  const manage = async () => {
    // const allapplications=async()=>{
    const result = await axios.get("http://localhost:4000/admin/alldata");
    console.log(result.data.data);
    const applications = result.data.data;

    const data = applications.filter((item) => {
      return !item.bookingStatus && item.status === "Approved";
    });
    setApplicantsList(data);

    // }

    // const displaySlots=async()=>{
    const req = await fetch("http://localhost:4000/admin/allslots");
    const slots = await req.json();
    A = slots.filter((item) => {
      return item.section === "A";
    });
    setSectionA(A);
    B = slots.filter((item) => {
      return item.section === "B";
    });
    setSectionB(B);
    C = slots.filter((item) => {
      return item.section === "C";
    });
    setSectionC(C);
    D = slots.filter((item) => {
      return item.section === "D";
    });
    setSectionD(D);
    E = slots.filter((item) => {
      return item.section === "E";
    });
    setSectionE(E);
  };

  const handleShow = (slot_id, slot_section, slot_no) => {
    setSlotId(slot_id);
    setSlotSection(slot_section);
    setslot_no(slot_no);
    setShow(true);
  };
  const slotBooking = async (id) => {
    // alert(id)
    const appliId = id;
    setApplicantId(appliId);
    console.log(appliId, slotId, slotSection);
    const data = { appliId, slotId, slotSection, slotnumber };
    await axios
      .post("http://localhost:4000/admin/slotUpdate", data)
      .then((res) => {
        manage();
        notify("slot Booking success");

      });
  };
  console.log(applicantsList);

  return (
    <div>
        <ToastContainer />
    
      <div className=" p-5">
        <h2 className="">Book Slots </h2>
        <div className="row g-5 mt-3 d-flex justify-content-around">
          <div className=" row-12 ">
            <div className="row g-3 d-flex justify-content-around">
              {sectionA &&
                sectionA.map((item, index) => {
                  return (
                    <div className="col-1">
                      <div
                        style={{
                          height: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={index}
                        className={`${
                          item.selected ? " bg-success" : "bg-secondary"
                        } `}
                        onClick={() => {
                          return item.selected
                            ? " "
                            : handleShow(item._id, item.section, item.slot_no);
                        }}
                      >
                        {item.section}
                        {item.slot_no}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-3">
            <div className="row g-3 d-flex justify-content-around">
              {sectionB &&
                sectionB.map((item, index) => {
                  return (
                    <div className="col-6">
                      <div
                        style={{
                          height: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={index}
                        className={`${
                          item.selected ? " bg-success" : "bg-secondary"
                        } `}
                        onClick={() => {
                          return item.selected
                            ? " "
                            : handleShow(item._id, item.section, item.slot_no);
                        }}
                      >
                        {item.section}
                        {item.slot_no}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-3">
            <div className="row g-3 d-flex justify-content-around">
              {sectionC &&
                sectionC.map((item, index) => {
                  return (
                    <div className="col-6">
                      <div
                        style={{
                          height: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={index}
                        className={`${
                          item.selected ? " bg-success" : "bg-secondary"
                        } `}
                        onClick={() => {
                          return item.selected
                            ? " "
                            : handleShow(item._id, item.section, item.slot_no);
                        }}
                      >
                        {item.section}
                        {item.slot_no}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-3">
            <div className="row g-3 d-flex justify-content-around">
              {sectionD &&
                sectionD.map((item, index) => {
                  return (
                    <div className="col-6">
                      <div
                        style={{
                          height: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={index}
                        className={`${
                          item.selected ? " bg-success" : "bg-secondary"
                        } `}
                        onClick={() => {
                          return item.selected
                            ? " "
                            : handleShow(item._id, item.section, item.slot_no);
                        }}
                      >
                        {item.section}
                        {item.slot_no}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-3">
            <div className="row g-3 d-flex justify-content-around">
              {sectionD &&
                sectionD.map((item, index) => {
                  return (
                    <div className="col-6">
                      <div
                        style={{
                          height: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={index}
                        className={`${
                          item.selected ? " bg-success" : "bg-secondary"
                        } `}
                        onClick={() => {
                          return item.selected
                            ? " "
                            : handleShow(item._id, item.section, item.slot_no);
                        }}
                      >
                        {item.section}
                        {item.slot_no}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Company Names</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {applicantsList.length > 0 ? (
                <table>
                  {applicantsList.map((list) => (
                    <tr>
                      <th>{list.companyName}</th>

                      <td>
                        <button
                          className="btn btn-primary m-3"
                          onClick={() =>
                            slotBooking(list._id, list.companyName)
                          }
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </table>
              ) : (
                <div>No Approved Companys</div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* <Button variant="primary" onChange={(e) => {
            slotBooking(e.target.value);
          }}>OK</Button> */}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Slot;
