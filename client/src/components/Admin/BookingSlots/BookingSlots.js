import React, { useEffect, useState } from "react";
import "../BookingSlots/BookingSlot.css";
import { Button, Modal } from "react-bootstrap";

function BookingSlots() {
  let A, B, C, D, E;

  // let applicantId
  // var slotId,slotSection

  const [sectionA, setSectionA] = useState([]);
  const [sectionB, setSectionB] = useState([]);
  const [sectionC, setSectionC] = useState([]);
  const [sectionD, setSectionD] = useState([]);
  const [sectionE, setSectionE] = useState([]);

  const [slotId, setSlotId] = useState();
  const [slotSection, setSlotSection] = useState();

  const [applicantsList, setApplicantsList] = useState([]);

  // modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    displaySlots();
    applicants();
  }, [sectionA,sectionB,sectionC,sectionD]);

  const applicants = async () => {
    const req = await fetch("http://localhost:9000/admin/applicants/list");
    const response = await req.json();

    const records = response.data.filter((item) => {
      return !item.isBooked;
    });

    setApplicantsList(records);
    // console.log(applicantsList);
  };

  const displaySlots = async () => {
    const req = await fetch("http://localhost:9000/admin/slots");
    const response = await req.json();
    const slots = response.data;
    console.log(slots);

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
  const handleShow = (slot_id, slot_section) => {
    // slotId = slot_id
    setSlotId(slot_id);
    // slotSection=slot_section
    setSlotSection(slot_section);
    console.log(slotId, slotSection);

    setShow(true);
  };

  const slotBooking = async (id) => {
    let applicantId = id;
    console.log(applicantId, slotId, slotSection);
    const req = await fetch(
      `http://localhost:9000/admin/slot/update?applicantId=${applicantId}&slotId=${slotId}&slotSection=${slotSection}`
    );
  };

  return (
    <div className="container pt-5">
      <h2 className="text-center text-decoration-underline"> Slots </h2>
      <div className="row g-5 mt-3">
        <div className="col-3">
          <div className="row g-3">
            {sectionA &&
              sectionA.map((item, index) => {
                return (
                  <div className="col-6">
                    <div
                      style={{ height: "80px" }}
                      key={index}
                      className={`${
                        item.isBooked ? " bg-success" : "bg-secondary"
                      } `}
                      onClick={() => {
                        return item.isBooked
                          ? " "
                          : handleShow(item.slot, item.section);
                      }}
                    ></div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-3">
          <div className="row g-3">
            {sectionB &&
              sectionB.map((item, index) => {
                return (
                  <div className="col-6">
                    <div
                      style={{ height: "80px" }}
                      key={index}
                      className={`${
                        item.isBooked ? " bg-success" : "bg-secondary"
                      } `}
                      onClick={() => {
                        return item.isBooked
                          ? " "
                          : handleShow(item.slot, item.section);
                      }}
                    ></div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-3">
          <div className="row g-3">
            {sectionC &&
              sectionC.map((item, index) => {
                return (
                  <div className="col-6">
                    <div
                      style={{ height: "80px" }}
                      key={index}
                      className={`${
                        item.isBooked ? " bg-success" : "bg-secondary"
                      } `}
                      onClick={() => {
                        return item.isBooked
                          ? " "
                          : handleShow(item.slot, item.section);
                      }}
                    ></div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-3">
          <div className="row g-3">
            {sectionD &&
              sectionD.map((item, index) => {
                return (
                  <div className="col-6">
                    <div
                      style={{ height: "80px" }}
                      key={index}
                      className={`${
                        item.isBooked ? " bg-success" : "bg-secondary"
                      } `}
                      onClick={() => {
                        return item.isBooked
                          ? " "
                          : handleShow(item.slot, item.section);
                      }}
                    ></div>
                  </div>
                );
              })}
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select a Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                slotBooking(e.target.value);
              }}
            >
              <option selected>--select--</option>

              {applicantsList &&
                applicantsList.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {" "}
                      {item.companyName}
                    </option>
                  );
                })}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default BookingSlots;
