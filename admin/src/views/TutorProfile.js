import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { NavLink, Route, useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

export default function TutorProfile() {
  const params = useParams();
  const { addToast } = useToasts();
  const history = useHistory()
  const showCertificate = (className) => {
    let certificate = document.getElementById(className);
    certificate.classList.toggle("show");
  };

  // getting the profile data
  const [tutorData, setTutorData] = useState(null);
  useEffect(async () => {
    history.replace(`/admin/tutors/${params.id}/about/`,)
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/admin/tutors/${params.id}/`
      );
      setTutorData(res.data);
      console.log(res.data);
    } catch (error) {
      addToast("Failed to get tutor data", { appearance: "error" });
    }
  }, []);



  const verifyRequest = async () => {
    if (!window.confirm("Are you sure you want to verify this tutor?")) {
      return
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/admin/tutors/${params.id}/verify/`
      );
      if (res.status == 202) {
        setTutorData(res.data);
        addToast("Tutor is verified", { appearance: "success" });
      }
    } catch (error) {
      addToast("Failed to verify tutor", { appearance: "error" });
    }
  }

  const rejectRequest = async () => {
    if (!window.confirm("Are you sure you want to reject this tutor?")) {
      return
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/admin/tutors/${params.id}/reject/`
      );
      setTutorData(res.data);
      addToast("Tutor is rejected", { appearance: "success" });
      history.goBack()

    } catch (error) {
      if (error.response.status == 406) {
        addToast(error.response.data.error, { appearance: "error" });
      }
      else {
        addToast("Failed to reject tutor", { appearance: "error" });
      }
    }
  }

  const unVerify = async () => {
    if (!window.confirm("Are you sure you want to un verify this tutor?")) {
      return
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/admin/tutors/${params.id}/unverify/`
      );
      if (res.status == 202) {
        setTutorData(res.data);
        addToast("Tutor is unverified", { appearance: "success" });
      }
    } catch (error) {
      addToast("Failed to unverify tutor", { appearance: "error" });
    }
  }




  return (
    tutorData && (
      <div style={{ marginTop: "139px" }}>
        <TopSection>
          <div className="profile">
            <div className="profile-image">
              <img style={{width: "100%", height: "100%", objectFit: "cover"}} src={tutorData.profile_picture} alt="Profile Image" />
            </div>
            <div className="profile-details">
              <div className="name">
                <h3>
                  {tutorData.fName} {tutorData.lName}
                </h3>
                {tutorData.is_verified ? (
                  <div>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      color="#00B628"
                      class="mantine-gnzaph mantine-Group-child"
                      height="22"
                      width="22"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "rgb(0, 182, 40)" }}>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                    </svg>
                    <h2>Verified</h2>
                  </div>
                ) : (
                  <div>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      color="#00B628"
                      class="mantine-gnzaph mantine-Group-child"
                      height="22"
                      width="22"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "rgb(255 0 0)", marginRight: '5px' }}>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                    </svg>
                    <h2>Not Verified</h2>
                  </div>
                )}
              </div>
              <div className="subjects">
                {tutorData.subjects.map((sub) => (
                  <span key={sub.id}>{sub.subject}</span>
                ))}
              </div>
              <div className="description">
                <p>{tutorData.profile_description}</p>
              </div>
            </div>
          </div>
          <div className="actions">
            {tutorData.is_verified ?
              <>
                <Button onClick={unVerify}>Un Verify Tutor</Button>
                <Button onClick={rejectRequest} transparent>Remove Tutor</Button>
              </> :
              <>
                <Button onClick={verifyRequest}>Verify Tutor</Button>
                <Button onClick={rejectRequest} transparent>Reject Tutor</Button>
              </>
            }
          </div>
        </TopSection>
        <BottomSection>
          <div className="tabs">
            <NavLink
              activeClassName="active"
              to={`/admin/tutors/${params.id}/about/`}>
              About
            </NavLink>
            <NavLink
              activeClassName="active"
              to={`/admin/tutors/${params.id}/degree/`}>
              Degree
            </NavLink>
          </div>
          <div className="tab-sections">
            <Route path={`/admin/tutors/${params.id}/about/`}>
              <div>
                <h3>About</h3>
                <p>
                  First Name: <b>{tutorData.fName}</b>
                </p>
                <p>
                  Last Name: <b>{tutorData.lName}</b>
                </p>
                <p>
                  Gender: <b>{tutorData.gender}</b>
                </p>
                <p>
                  Email: <b>{tutorData.email}</b>
                </p>
                <p>
                  Subjects:{" "}
                  <b>
                    {tutorData.subjects.map((sub) => (
                      <span key={sub.id}>{sub.subject}, </span>
                    ))}
                  </b>
                </p>
                <p>
                  Curriculum:{" "}
                  <b>
                    {tutorData.curriculum.map((curriculum) => (
                      <span key={curriculum.id}>{curriculum.curriculum}, </span>
                    ))}
                  </b>
                </p>
                <p>
                  Years of Experience: <b>{tutorData.years_of_experience}</b>
                </p>
                <p>
                  Location: <b>{tutorData.location_name}</b>
                </p>
                <p>
                  Timestamp:{" "}
                  <b>
                    <Moment format="DD/MM/YYYY hh:mm">
                      {tutorData.timestamp}
                    </Moment>
                  </b>
                </p>
              </div>
            </Route>
            <Route path={`/admin/tutors/${params.id}/degree/`}>
              <div>
                <h3>Degree</h3>
                {tutorData.degrees.map((deg) => (
                  <div className="degree" key={deg.id}>
                    <div className="years">
                      <Moment format="YYYY">{deg.start_year}</Moment> -{" "}
                      <Moment format="YYYY">{deg.end_year}</Moment>
                    </div>
                    <div className="details">
                      <h3>{deg.university_name}</h3>
                      <h4>{deg.degree_name}</h4>
                      <p
                        onClick={(e) =>
                          showCertificate(`certificate-${deg.id}`)
                        }
                        className="show-certificate">
                        Toggle Certificate
                      </p>
                      <img
                        onClick={(e) =>
                          showCertificate(`certificate-${deg.id}`)
                        }
                        id={`certificate-${deg.id}`}
                        className="certificate-img "
                        src={`${process.env.REACT_APP_API_URL
                          }${deg.certificate.slice(1)}`}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Route>
          </div>
        </BottomSection>
      </div>
    )
  );
}

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 550px) {
    flex-direction: column;
    align-items: baseline;
    justify-content: stretch;
  }

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: start;
    /* align-items: center; */
    .profile-image {
      max-width: 170px;
      width: 170px;
      height: 170px;
      max-height: 170px;
      margin-right: 15px;
      img {
        width: 100%;
      }
    }

    .profile-details .name {
      display: flex;
      flex-direction: row;
      align-items: center;
      h3 {
        font-size: 20px;
        line-height: 1.55;
        text-decoration: none;
        font-weight: bold;
        margin-right: 10px;
      }
      div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
    .profile-details .subjects span {
      font-size: 9px;
      height: 16px;
      line-height: 14px;
      text-decoration: none;
      padding: 0 6.666666666666667px;
      text-transform: uppercase;
      border-radius: 32px;
      font-weight: 700;
      letter-spacing: 0.25px;
      background: rgba(237, 242, 255, 1);
      color: #4c6ef5;
      border: 1px solid transparent;
      color: #3347b0;
    }
    .profile-details .description p {
      font-size: 12px;
      line-height: 1.55;
      text-decoration: none;
      font-weight: 500;
      margin-top: 10px;
    }
  }
  .actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 135px;
    @media screen and (max-width: 550px) {
      min-width: 100%;
      width: 100%;
      margin-top: 10px;
    }
    button {
      /* width: 100%; */
      text-align: center;
      margin: 5px 0px;
      font-size: 13px;
      
    }
  }
`;

const BottomSection = styled.div`
  margin: 50px 0px;
  .tabs {
    a {
      transition: all 0.3s ease-in-out;
      font-size: 16px;
      background-color: transparent;
      text-align: left;
      color: #000;
      padding: 10px 16px;
      font-size: 14px;
      line-height: 1;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      border-radius: 4px 4px 0 0;
      font-weight: bold;
      color: #666;
      &:hover {
        color: #000;
      }
    }
    a.active {
      border-bottom: 2px solid #3347b0;
    }
  }

  .tab-sections {
    margin-top: 60px;
    box-shadow: 0px 0px 5px 0px #3347b036;
    padding: 16px;
    .degree {
      padding-bottom: 10px;
      margin-bottom: 20px;
      box-shadow: 0px 2px 1px 0px #00000017;
    }
    div {
      h3 {
        line-height: 1.3;
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
      }
      p {
        margin: 5px 0px;
      }
    }
    .years {
      font-weight: 600;
      letter-spacing: 1px;
    }
    .details h3 {
      font-size: 19px;
      font-weight: 600;
    }
    .show-certificate {
      display: inline;
      color: #3347b0;
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
      &:hover {
        text-decoration: underline;
      }
    }
    .certificate-img {
      position: absolute;
      right: 0;
      left: 0;
      width: 100%;
      transform: scale(0);
      transition: all 0.3s ease-in-out;
    }
    .certificate-img.show {
      transform: scale(1);
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0;
  appearance: none;
  font-size: 16px;
  background-color: transparent;
  text-align: left;
  color: #000;
  text-decoration: none;
  box-sizing: border-box;
  /* height: 42px; */
  padding: 10px 10px;
  display: inline-block;
  width: 100%;
  border-radius: 4px;
  font-weight: 600;
  position: relative;
  line-height: 1;
  font-size: 16px;
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

  @media screen and (max-width: 980px) {
    padding-left: 14px;
    padding-right: 14px;
    font-size: 12px;
    font-weight: 600;
    height: 35px;
  }
`;
