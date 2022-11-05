import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux/auth/actions";
import { useDispatch } from 'react-redux'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    cPassword: "",
  })
  const {fName, lName, email, password, cPassword} = formData
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  function runSignUp(e){
    e.preventDefault()
      console.log(formData)
   if(fName && lName && email && password && cPassword) {
    let action = dispatch(signup(fName, lName, email, password, cPassword))
    if(action){
      setFormData({ email: '', password: '' }) 
      navigate("/"); 
    }
   }
  }

  useEffect(() => {
    document.title = "Register | Tutors Street"
  }, [])
  
  
  return (
    <Container size={"xs"}  my={72}>
      <Paper  withBorder shadow="md" p={30} mt={30} radius="md">
        <Title mb={48} align="center" weigth="700">
          Welcome to tutors street
        </Title>
        <form onSubmit={runSignUp} >

        <Group grow>
          <TextInput
            type={"text"}
            label="First name"
            placeholder="First Name"
            required
            value={fName}
            onChange={onChange}
            name="fName"
          />
          <TextInput
            type={"text"}
            label="Last name"
            placeholder="Last Name"
            required
            value={lName}
            onChange={onChange}
            name="lName"
          />
        </Group>
        <TextInput
          mt="md"
          type={"email"}
          label="Email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={onChange}
          name="email"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={onChange}
          name="password"
        />
        <PasswordInput
          label="Password Confirmations"
          placeholder="Your password confirmation"
          required
          mt="md"
          value={cPassword}
          onChange={onChange}
          name="cPassword"
        />

        <Button
          color={"indigo"}
          sx={{ background: "#3347B0" }}
          fullWidth
          mt="xl"
          type="submit"
        >
          Sign up
        </Button>
        </form>

        <Text color="dimmed" size="sm" align="center" mt={"md"}>
          Already have an account?{" "}
          <Anchor component={Link} to="/login" size="sm">
            Login
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
