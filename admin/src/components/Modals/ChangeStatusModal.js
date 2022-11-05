import axios from "axios";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

export default function ChangeStatusModal({ message, onComplete }) {
  const [showModal, setShowModal] = React.useState(false);
  const [status, setStatus] = useState("REQUESTED")

  const { addToast } = useToasts();

 

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/admin/lessons/${message.id}/change-status/`,
        {status: status}
      );
      onComplete()

      addToast("Status changed successfully", { appearance: "success" });
    } catch (error) {
      addToast("Failed to change status", { appearance: "error" });
    }
  };

  return (
    <>
      <ShowMore onClick={(e) => setShowModal((prev) => !prev)}>
        Change Status
      </ShowMore>
      <form onSubmit={onSubmit}>
        <Wrapper show={showModal}>
          <div
            id="open-first-modal-toggle"
            className={`modal-cont ${showModal ? "show" : ""}`}>
            <div className="modal animate__animated ">
              <div className="heading">
                <h3>Change Status</h3>
                <div
                  onClick={(e) => setShowModal(false)}
                  className="close-modal modal-close-btn">
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className="modal-content">
                <div   className=" my-2 send-message-inp">
 
                <div className="relative flex w-full flex-wrap items-stretch ">
                <select onChange={e => setStatus(e.target.value)} style={{width: "100%", marginTop: "15px",  }}>
                  <option value={"REQUESTED"} >Requested</option>
                  <option value={"IN_PROGRESS"}>In Progress</option>
                  <option value={"COMPLETED"}>Completed</option>
                </select>
              </div>
 
 

                </div>
              </div>
              <div className="actions">
                <button
                  style={{ background: "#6c757d" }}
                  onClick={(e) => setShowModal(false)}
                  type="button"
                  className="btn btn-sm modal-close-btn">
                  Close
                  
                </button>
                <button className="btn btn-sm" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>
    </>
  );
}

const ShowMore = styled.span`
  color: #228be6;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
    color: #0089ff;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  & > * {
    transition: all 0.2s ease-in-out;
  }

  ${({ show }) =>
    show
      ? `
visibility:visible;
opacity: 1;

`
      : `
visibility: hidden;
opacity: 0;

`}

  transition: all .2s  ease-in-out !important;
  width: 100vw;
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;

  bottom: 0;

 

  .send-message-inp {
    height: 100%;
    width: 100%;
    /* border: none; */
  }

  .btn-cont {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .btn {
    padding: 8px 18px;
    border: none;
    background: #0c43de;
    color: white;
    cursor: pointer;
    /* transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1); */
    transition: all 0.4s;
  }

  .btn-sm {
    padding: 5px 12px;
  }

  .btn:hover {
    background: #182ace;
    transform: scale(1.1);
  }

  .modal-cont {
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    top: 0;
    display: flex;
    justify-content: center;
    padding: 26px 0px;
    transition: all 0.3s;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
  }

  .modal-cont.show {
    background-color: #00000080;
    backdrop-filter: blur(6px);
  }

  .modal {
    width: 30vw;
    height: 200px;
    min-width: 300px;

    background: #ffffff;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 8px 1px #ffffff;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal .heading {
    display: flex;
    justify-content: space-between;
  }
  .modal .modal-content {
    border-top: 1px solid #0000003b;
    height: inherit;
    border-bottom: 1px solid #0000003b;
    margin: 12px 0px;
  }
  .modal .heading h3 {
    font-size: 22px;
  }
  .modal .actions {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .modal .actions .btn {
    margin-left: 10px;
  }

  .close-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    cursor: pointer;
    height: 20px;
    margin: auto 0;
    width: 20px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0;
  appearance: none;
  font-size: 12px;
  background-color: transparent;
  text-align: left;
  color: #000;
  text-decoration: none;
  box-sizing: border-box;
  padding: 8px 10px;
  display: inline-block;
  width: auto;
  border-radius: 4px;
  font-weight: 600;
  position: relative;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: #228be6;
  color: #fff;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #edf2ff;
    color: #3347b0;
    border: 1px solid #3347b0;
    cursor: pointer;
  }

  background: #3347b0;
  ${({ transparent }) =>
    transparent
      ? `
    background: #EDF2FF;
    color: #3347B0;
    border: 1px solid #3347B0;
        &:hover{
    background: #3347B0;
    color: #fff;
    border: 1px solid transparent;
            
        }

    `
      : ""}
`;
