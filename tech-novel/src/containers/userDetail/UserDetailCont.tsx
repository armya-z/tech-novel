/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setUserData } from "@/service/user/UserSlice";
import { fetchUserDetail, updateUser } from "@/api/api";
import {
  Alert,
  Box,
  Button,
  Paper,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import placeHolder from "../../assets/placeholder.jpg";
import { colorPallete } from "@/theme/color";
interface IProps {
  id: string;
}

const UserDetailCont: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.singleUserData);

  const userData = {
    name: user?.first_name,
    lastName: user?.last_name,
    email: user?.email,
    avatar: user?.avatar,
  };
  console.log(userData);
  const [userDetailData, setUserDetailData] = useState<any>(userData);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [input, setInput] = useState<{
    name: string | null;
    job: string | null;
  }>({ name: null, job: "" });

  useEffect(() => {
    fetchUserData();
  }, [dispatch, id]);

  function fetchUserData() {
    setIsLoading(true);
    fetchUserDetail(id)
      .then((fetchedUsers) => dispatch(setUserData(fetchedUsers)))
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      )
      .then(() => setIsLoading(false))
      .catch((error) => console.error("Error fetching users:", error));
  }

  async function handleEditUser() {
    if (isEditable && input) {
      await updateUser(id, input).then((res) => {
        fetchUserData();
        setUserDetailData({ ...userDetailData, role: res?.job });
        setIsOpen(true);
      });

      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  }

  function handleCancelEdit() {
    setIsEditable(false);
  }
  console.log(input);

  function handleChangeRole(
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInput({ ...input, job: ev?.currentTarget.value });
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
        <Typography
          variant="h3"
          sx={{ textAlign: "center" }}
        >{`${user?.first_name} ${user?.last_name}`}</Typography>
        <Box
          sx={{
            width: "100%",
            height: 220,
            position: "relative",
            maxWidth: 500,
            minWidth: 220,
          }}
        >
          {userData?.avatar ? (
            <Image
              src={userData?.avatar ?? placeHolder}
              alt={userData?.name ?? ""}
              fill
              style={{ objectFit: "contain" }}
              quality={100}
            />
          ) : (
            <Skeleton height={"100%"} width={"100%"} variant="rounded" />
          )}
        </Box>
        <Typography
          sx={{
            bgcolor: colorPallete.textBG,
            px: 1,
            py: 1,
            borderRadius: 3,
            color: colorPallete.ButtonPrimary,
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {`Email: ${userData?.email}`}
        </Typography>
        <Box>
          {!isEditable ? (
            <Typography>{`Job: ${userDetailData?.job ?? "N/A"}`}</Typography>
          ) : (
            <TextField
              label="job"
              variant="outlined"
              value={input.job}
              onChange={handleChangeRole}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", columnGap: 1 }}>
          <Button
            onClick={handleEditUser}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: colorPallete.ButtonPrimary,
              color: colorPallete.ButtonSecondary,
              ":hover": {
                bgcolor: colorPallete.ButtonSecondary,
                color: colorPallete.ButtonPrimary,
              },
            }}
          >
            {isEditable ? "Submit" : "Edit"}
          </Button>

          {isEditable && (
            <Button
              onClick={handleCancelEdit}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "red",
                color: "white",
                ":hover": {
                  bgcolor: "rosybrown",
                },
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
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

export default UserDetailCont;
