import CreateUserCont from "@/containers/createUser/CreateUserCont";
import { Container } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const CreateUser = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Link href={"/"}>
        <ArrowBackIcon sx={{ ":hover": { color: "red" } }} />
      </Link>
      <CreateUserCont />
    </Container>
  );
};

export default CreateUser;
