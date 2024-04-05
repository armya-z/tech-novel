"use client";

import { Alert, Button, Paper, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import placeHolder from "@/assets/placeholder.jpg";
import Image from "next/image";
import { createUser } from "@/api/api";
import { useRouter } from "next/navigation";

const CreateUserCont = () => {
  const router = useRouter();

  const [inputData, setInputData] = useState({ name: "", job: "" });
  const [isOpen, setIsOpen] = useState(false);

  function handleChangeName(
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id } = ev?.currentTarget;
    if (id == "name") {
      setInputData({ ...inputData, name: ev?.currentTarget?.value });
    } else {
      setInputData({ ...inputData, job: ev?.currentTarget?.value });
    }
  }
  function handleCreateUser() {
    setIsOpen(true);
    createUser(inputData).then(() => {
      setTimeout(() => {
        router.replace("/");
      }, 2500);
    });
  }
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "fit-content",
          height: "100%",
          padding: 3,
          rowGap: 2,
          my: 5,
        }}
      >
        <Image src={placeHolder} width={250} height={250} alt="placeholder" />

        <TextField
          label="name"
          id="name"
          variant="outlined"
          value={inputData.name}
          onChange={handleChangeName}
          required
        />
        <TextField
          label="job"
          id="job"
          variant="outlined"
          value={inputData.job}
          onChange={handleChangeName}
          required
        />
        <Button onClick={handleCreateUser}>Create</Button>
      </Paper>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          onClose={() => setIsOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          user created
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateUserCont;
