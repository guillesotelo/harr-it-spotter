import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobCard from "./JobCard";

export default function Home() {
  const [showModal, setShowModal] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("https://61435a41c5b553001717cf2f.mockapi.io/api/challenge/jobs")
      .then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
        <div className="header">
            <img className='logo' src='https://www.smarttalent.uy/innovaportal/file/6119/1/imagotipoconexio_rgb.png'/>
            <h1 className="title" >Conexio | Jobs</h1>
            <h1></h1>
        </div>
      <ToastContainer />
      {jobs.length ? (
        <div className="card-list">
          {jobs.map((card, i) => (
            <div key={i}>
              <JobCard card={card} setShowModal={setShowModal} />
            </div>
          ))}
        </div>
      ) : (
        <div className="div-none">
          <h1 className="no-offers">
            There's no Job Offers for you right now :(
          </h1>
          <Button
            className="reload-btn"
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      )}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="confirm-modal border-12"
        dialogClassName="border-radius-2"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to apply for the <b>{showModal && showModal.job}</b>{" "}
          position in {showModal && showModal.location}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              toast.success(`Your candidancy has been sent successfully`, {
                autoClose: 2000,
              });
              const newJobs = jobs.filter((el) => el.job !== showModal.job);
              setJobs(newJobs);
              setShowModal(null);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
