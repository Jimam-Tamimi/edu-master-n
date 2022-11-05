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

export default function Curriculums({ color }) {
  const { addToast } = useToasts();
  const [filterQuery, setFilterQuery] = useState('')

  const [curriculums, setCurriculums] = useState([])


  const getCurriculums = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/curriculums/`)
      setCurriculums(res.data)


    } catch (error) {
      addToast('Failed to get curriculums', { appearance: 'error' });

    }
  }

  const addCurriculums = async curriculumName => {
    if (!curriculumName) {
      return
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/admin/curriculums/`, { curriculum: curriculumName.toUpperCase() })

      setCurriculums(prevD => ([res.data, ...prevD]))

      addToast('Curriculum added successfully', { appearance: 'success' });

    } catch (error) {
      addToast('Failed to add curriculum', { appearance: 'error' });

    }
  }
  const deleteCurriculums = async id => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}api/admin/curriculums/${id}/`)
      setCurriculums(prevD => prevD.filter(s => s.id != id))
      addToast('Curriculum removed successfully', { appearance: 'success' });

    } catch (error) {
      addToast('Failed to remove curriculum', { appearance: 'error' });

    }
  }

  useEffect(async () => {
    await getCurriculums()
  }, [])






  const filterTutors = async (e) => {
    e.preventDefault()
    //   try {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/tutors/?search=${filterQuery}`)
    //     setTutors(res.data)   

    //   } catch (error) {

    //   }


  }

  // const deleteMessage = async id => {
  //   try {
  //     const res = await axios.delete(
  //       `${process.env.REACT_APP_API_URL}api/admin/messages/${id}/`,
  //     );
  //     setMessages(prevState => prevState.filter(msg => msg.id != id))
  //     addToast('Message deleted', { appearance: 'success' });

  //   } catch (error) {
  //     addToast('Failed to delete message', { appearance: 'error' });

  //   }
  // }






  // const  filterHasReplied = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/messages/?has_replied=${hasReplied}`)
  //     console.log(res)
  //     let messages = res.data
  //     setMessages([])
  //     for (let i = 0; i < messages.length; i++) {
  //       const message = messages[i];
  //       if(message?.tutor != null){

  //         const res2 = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/tutors/${message?.tutor}/`)
  //         message["tutor"] = res2.data
  //         setMessages(prevData => ([...prevData, message]))
  //       } 
  //     }

  //     if (res?.data?.tutor) {
  //       setMessages(res.data)
  //     }

  //   } catch (error) {
  //     addToast('Failed to filter messages', { appearance: 'error' });

  //   }
  // }  


  return (
    <>




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
            <form onSubmit={filterTutors} className="md:flex flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch my-2">
                {/* <option value={"false"} >Not Replied</option> */}
                {/* <option value={"true"}>Replied</option> */}
                <Button onClick={e => { addCurriculums(window.prompt("Enter Subject Name")) }} >Add Curriculum</Button>
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
                  ID
                </th>
                <td
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  curriculums
                </td>
                <td
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>

              {
                curriculums?.map(curriculum => (
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light" ? "text-blueGray-600" : "text-white")
                        }
                      >
                        {curriculum?.id}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {curriculum?.curriculum}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <ShowMore onClick={(e) => window.confirm('Are you sure you want to remove this curriculum?') ? deleteCurriculums(curriculum.id) : ''}>
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

Curriculums.defaultProps = {
  color: "light",
};

Curriculums.propTypes = {
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