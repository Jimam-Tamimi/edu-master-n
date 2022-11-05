import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/actions";
import { useDispatch } from 'react-redux'

export function Login() {


  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = loginFormData;
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const onLoginFormChange = (e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
  const loginSubmit = async e => {
    e.preventDefault();
    console.log(e)
    let action = await dispatch(login(email, password))
    if(action){
      setLoginFormData({ email: '', password: '' }) 
      navigate("/"); 
    }
  }
  
  useEffect(() => {
    document.title = "Login | Tutors Street"
  }, [])
  
  
  
  return (
    <Container size={"xs"} my={72}>
      <Paper  withBorder shadow="md" p={30} mt={30} radius="md">
        <Title align="center" mb={48} weight="700">
          Welcome back!
        </Title>
        <form onSubmit={loginSubmit}>
        <TextInput type={"email"} label="Email" placeholder="you@example.com" name="email" value={email} onChange={onLoginFormChange} />
        <PasswordInput label="Password" placeholder="Your password" mt="md" name="password" value={password} onChange={onLoginFormChange} />
        <Group position="apart" mt="md">
          {/* <Checkbox label="Remember me" /> */}
          {/* <Anchor
            sx={{ color: "#3347B0" }}
            component={Link}
            to="/password-recovery"
            size="sm"
          >
            Forgot password?
          </Anchor> */}
        </Group>
        <Button
          color={"indigo"}
          sx={{ background: "#3347B0" }}
          fullWidth
          mt="xl"
          type="submit"
        >
          Sign in
        </Button>
        </form>
        <Text color="dimmed" size="sm" align="center" mt={"md"}>
          Do not have an account yet?{" "}
          <Anchor component={Link} to="/signup" size="sm">
            Create account
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
