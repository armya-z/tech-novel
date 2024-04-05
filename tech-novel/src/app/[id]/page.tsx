import UserDetailCont from "@/containers/userDetail/UserDetailCont";
import { Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserDetail = ({ params }: { params: { id: string } }) => {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Link href={"/"}>
        <ArrowBackIcon sx={{ ":hover": { color: "red" } }} />
      </Link>
      <UserDetailCont id={params.id} />
    </Stack>
  );
};

export default UserDetail;
