import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
const Home = () => {
    return (
      <Container>
        <nav className="py-5">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">
              <Link to="/todo">ToDo App</Link>
            </li>
            <li className="list-group-item">
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className="list-group-item">
              <Link to="/reducer">Reducers</Link>
            </li>
            <li className="list-group-item">
              <Link to="/todocallback">useCallBack</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </Container>
    )
  };
  
  export default Home;