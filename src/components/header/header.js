import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import useForm from '../../hooks/useForm.js';
function If({ condition, children }) {
  return condition ? children : null;
}
function Header() {
  let context = useContext(AuthContext);
  let [values, handleInputChange, handleSubmit] = useForm(handleLogin);
  function handleLogin(userDetails) {
    context.login(userDetails.username, userDetails.password);
  }
  return (
    <header>
      <Navbar bg="primary justify-content-between" variant="dark">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Form inline onSubmit={handleSubmit}>
          <If condition={!context.token}>
            <InputGroup>
              <FormControl
                name="username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <FormControl name="password" type="text" placeholder="Password" className=" mr-sm-2" onChange={handleInputChange} />
            </InputGroup>
            <InputGroup>
              <Button type="submit" variant="dark">Login</Button>
            </InputGroup>
          </If>
          <If condition={context.token}>
            <InputGroup>
              <Button className="logoutbutton" type="submit" variant="danger" onClick={context.logout}>Log Out</Button>
            </InputGroup>
          </If>
        </Form>
      </Navbar>
    </header>
  );
}
export default Header;