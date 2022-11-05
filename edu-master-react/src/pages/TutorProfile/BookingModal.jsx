import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker, TimeRangeInput } from "@mantine/dates";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNotification } from "../../redux/notification/actions";

export default function BookingModal({ close, opened, tutor_id }) {
  const now = dayjs(new Date()).add(30, "minutes").toDate();
  const then = dayjs(now).add(60, "minutes").toDate();
  const [value, setValue] = useState([now, then]);


  const initialData = {
    tutor: tutor_id,
    email: "",
    message: "",
    date: '',
    time: '',
  }
  const [formData, setFormData] = useState(initialData)

  const {email, message, date, time} = formData
  const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const dispatch = useDispatch()

  const onSubmit = async e => {
    e.preventDefault()
    console.log(formData
      )
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/trial-lessons/`,
          formData
        );
        close()
        dispatch(addNotification(`We have received your message. Thank you.`,));

        setFormData(initialData)
      } catch (error) {
        if (error.response) {
          for (const err in error.response.data) {
            dispatch(addNotification(`${err}: ${error.response.data[err]}`, "error"));

          }
        }
      }
  }
  
  
  return (
    <Modal title="Book a lesson" onClose={close} opened={opened}>
      <form onSubmit={onSubmit} >
        <Stack>
          
        <TextInput
            name="email"
            value={email}
            onChange={onChange}
            label="Your Email"
            placeholder="you@example.com"
          />
          
          <DatePicker
            required
            label="Choose lesson's day"
            placeholder="Pick a date"
            onChange={val => setFormData({...formData, date: val.toISOString().split("T")[0]})}
            value={date}
          /> 
          <div>
          </div>
            
          <label class="mantine-InputWrapper-label mantine-DatePicker-label mantine-ittua2" for="mantine-r13" id="mantine-r13-label">Choose lesson's time<span class="mantine-u5apz8 mantine-InputWrapper-required mantine-DatePicker-required" aria-hidden="true"> *</span></label>
          <input 
            label="Choose lesson's time"
            placeholder="Choose lesson's time"
            required
            type={"time"}
            value={time}
            onChange={onChange}
            name="time"
          />

          <Textarea
            minRows={3}
            label="Message"
            placeholder="Write your message"
            name="message"
            value={message}
            onChange={onChange}
          />
          <Button type="submit" sx={{ background: "#3347B0" }}>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  );
}
