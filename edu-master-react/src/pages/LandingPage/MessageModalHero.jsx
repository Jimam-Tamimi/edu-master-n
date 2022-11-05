import { Button, Modal, Stack, Text, Textarea, TextInput } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNotification } from "../../redux/notification/actions";

export default function MessageModal({ close, opened, tutor_id }) {
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    tutor: tutor_id
  });
  const {title, name, email, number, message } = formData; 

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/messages/`,
        formData
      );
      close()
      dispatch(addNotification(`We have received your message. Thank you.`));
      
    } catch (error) {
      if (error.response) {
        dispatch(addNotification(`Failed to send message, plz try again later.`));
      }
    }
  };
  return (
    <Modal
      title={<Text weight={700}>Get in touch</Text>}
      opened={opened}
      onClose={close}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            name="title"
            value={title}
            onChange={onChange}
            label="Title"
            required
            placeholder="Teach me "
          />
          <TextInput
            name="name"
            value={name}
            onChange={onChange}
            label="Name"
            required
            placeholder="Your Name"
          />
          <TextInput
            name="email"
            value={email}
            onChange={onChange}
            label="Your Email"
            placeholder="you@example.com"
            required
          />
          <TextInput
            name="number"
            value={number}
            onChange={onChange}
            required
            label="Your Number"
            placeholder="Number"
          />
          <Textarea
            minRows={3}
            label="Message"
            placeholder="Write your message"
            required
            name="message"
            value={message}
            onChange={onChange}
          />
          <Button type="submit" sx={{ background: "#3347B0" }}>
            Send
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
