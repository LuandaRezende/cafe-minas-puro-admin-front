import { useContext } from "react";
import AppContext from "../AppContext";

import { Container } from "react-bootstrap";
import PageMain from "../components/home";

export default function Home() {
  const value = useContext(AppContext);

  return (
    <>
      <PageMain />
      {/* <Container className="page">
        <h2>Pagina inicial</h2>
        <p>Home content</p>
      </Container> */}
    </>
  );
}