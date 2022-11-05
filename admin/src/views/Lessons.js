import React, { useEffect, useState } from 'react'

import PropTypes from "prop-types";
import axios from 'axios'
// components
import { useToasts } from 'react-toast-notifications';
import Moment from 'react-moment';

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ShowMoreText from 'components/Modals/ShowMoreText';
import SendMessage from 'components/Modals/SendMessage';
import ChangeStatusModal from 'components/Modals/ChangeStatusModal';
import { Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

export default function Lessons({ color }) {
  const { addToast } = useToasts();

  const [status, setStatus] = useState("REQUESTED")
  const [filterQuery, setFilterQuery] = useState('')

  const [lessons, setLessons] = useState([])

  const getLessons = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/lessons/?status=${status}&search=${filterQuery}`)
      setLessons([])
      let lessons = res.data
      for (let i = 0; i < lessons.length; i++) {
        const message = lessons[i];
        const res2 = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/tutors/${message?.tutor}/`)
        message["tutor"] = res2.data
        setLessons(prevData => ([...prevData, message]))
      }

      if (res?.data?.tutor) {
        setLessons(res.data)
      }

    } catch (error) {
      addToast('Failed to get lessons', { appearance: 'error' });

    }
  }

  useEffect(async () => {
    await getLessons()

  }, [filterQuery, status])






  const filterTutors = async (e) => {
    e.preventDefault()
    //   try {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/tutors/?search=${filterQuery}`)
    //     setTutors(res.data)   

    //   } catch (error) {

    //   }


  }

  const deleteMessage = async id => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}api/admin/lessons/${id}/`,
      );
      setLessons(prevState => prevState.filter(msg => msg.id != id))
      addToast('lesson deleted', { appearance: 'success' });

    } catch (error) {
      addToast('Failed to delete lesson', { appearance: 'error' });

    }
  }






  const [showLessonDetails, setShowLessonDetails] = useState(false)

  const initialData = {
    email: "",
    message: "",
    date: '',
    time: '',
  }
  const [formData, setFormData] = useState(initialData)

  const { email, message, date, time } = formData


  return (
    <>


      <Modal title="Lesson Details" onClose={e => setShowLessonDetails(false)} opened={showLessonDetails}>
        <form onSubmit={e => e.preventDefault()} >
          <Stack>

            <TextInput
              name="email"
              value={email}
              disabled
              label="Student's Email"
              placeholder="student@example.com"
            />

            <DatePicker
              required
              label="Choose lesson's day"
              placeholder="Pick a date"
              disabled
              value={new Date(date)}
            />
            <div>
            </div>

            <label class="mantine-InputWrapper-label mantine-DatePicker-label mantine-ittua2" for="mantine-r13" id="mantine-r13-label">Choose lesson's time<span class="mantine-u5apz8 mantine-InputWrapper-required mantine-DatePicker-required" aria-hidden="true"> *</span></label>
            <input
              label="Choose lesson's time"
              placeholder="Choose lesson's time"

              type={"time"}
              value={time}
              disabled

              name="time"
            />

            <Textarea
              minRows={3}
              label="Message"
              placeholder="Write your message"
              name="message"
              value={message}
              disabled

            />
          </Stack>
        </form>
      </Modal>




      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >


        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Card Tables
              </h3>
            </div>
            <form onSubmit={filterTutors} style={{ justifyContent: 'space-between' }} className="md:flex flex-row flex-wrap flex  lg:ml-auto mr-3">

              <div className="relative flex w-full flex-wrap items-stretch my-2">
                <select onChange={e => setStatus(e.target.value)} style={{ width: "100%", boxShadow: '0px 0px 9px 2px #0284c770', border: "none" }}>
                  <option value={"REQUESTED"} >Requested</option>
                  <option value={"IN_PROGRESS"}>In Progress</option>
                  <option value={"COMPLETED"}>Completed</option>
                </select>
              </div>
              <div className="relative flex w-full flex-wrap items-stretch my-2">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  style={{ boxShadow: '0px 0px 9px 2px #0284c770' }}
                  type="text"
                  placeholder="Search here..."
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                  value={filterQuery}
                  onChange={e => setFilterQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Tutor
                </th>
                {/* <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Name
                </th> */}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Message
                </th>
                {/* <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Number
                </th> */}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Time
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>

              {
                lessons?.map((message, i) => (
                  <tr key={i}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <Link className=' align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center' to={`/admin/tutors/${message?.tutor?.id}/`}>

                        <img
                          src={message?.tutor?.profile_picture}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>{" "}
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(color === "light" ? "text-blueGray-600" : "text-white")
                          }
                        >
                          {message?.tutor.fName} {message?.tutor?.lName}
                        </span>
                      </Link>

                    </th>
                    <td
                      onClick={e => {
                        setFormData({
                          email: message.email,
                          message: message.message,
                          date: message.date,
                          time: message.time,
                        })
                        setShowLessonDetails(true)
                      }}
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {/* <i className="fas fa-circle text-orange-500 mr-2"></i> pending */}
                      {message.email}
                    </td>
                    <td
                      onClick={e => {
                        setFormData({
                          email: message.email,
                          message: message.message,
                          date: message.date,
                          time: message.time,
                        })
                        setShowLessonDetails(true)
                      }}
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {/* <i className="fas fa-circle text-orange-500 mr-2"></i> pending */}
                      {message.message.split(' ').slice(0, 6).join(" ")}{message.message.split(' ').length > 6 ?
                        <>... <ShowMoreText message={message.message} >see more</ShowMoreText> </> : ''
                      }
                    </td>
                    <td
                      onClick={e => {
                        setFormData({
                          email: message.email,
                          message: message.message,
                          date: message.date,
                          time: message.time,
                        })
                        setShowLessonDetails(true)
                      }}
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                      <Moment format="DD/MM/YYYY hh:mm" >{message.timestamp}</Moment>

                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <SendMessage type="lessons" onComplete={e => ""} message={message} />
                      <ChangeStatusModal onComplete={e => getLessons()} message={message} />
                      <ShowMore onClick={(e) => window.confirm('Are you sure you want to delete') ? deleteMessage(message.id) : ''}>
                        Remove
                      </ShowMore>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Lessons.defaultProps = {
  color: "light",
};

Lessons.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

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
  
`

const ShowMore = styled.p`
  color: #228be6;
  font-weight: 500;
  &:hover{
    text-decoration: underline;
    color: #0089ff;
    cursor: pointer;     
  }
`
const TabWrapper = styled.div`
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
`