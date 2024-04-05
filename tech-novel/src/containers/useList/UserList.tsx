"use client";
import { deleteUser, fetchUsers } from "@/api/api";
import UserListCard from "@/components/card/UserListCard";
import { RootState } from "@/lib/store";
import { setUsers } from "@/service/user/UserSlice";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReplayIcon from "@mui/icons-material/Replay";
import { colorPallete } from "@/theme/color";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "next/link";

const UserList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user);

  const [pageNumber, setPageNumber] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers(pageNumber)
      .then((fetchedUsers) => dispatch(setUsers(fetchedUsers)))
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      )
      .catch((error) => console.error("Error fetching users:", error));
  }, [dispatch, pageNumber]);

  function handleChangePagination(
    event: React.ChangeEvent<unknown>,
    page: number
  ): void {
    setPageNumber(page);
  }

  function handleRefetch() {
    setIsLoading(true);
    fetchUsers(pageNumber)
      .then((fetchedUsers) => dispatch(setUsers(fetchedUsers)))
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      )
      .catch((error) => console.error("Error fetching users:", error));
  }

  async function handleDelete(ev: React.MouseEvent<HTMLButtonElement>) {
    await deleteUser(ev?.currentTarget?.id).then(() => handleRefetch());
  }

  return (
    <>
      {isLoading ? (
        <CircularProgress
          color="secondary"
          size={100}
          variant="indeterminate"
          sx={{ position: "absolute", top: "50%" }}
        />
      ) : (
        <Stack
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <IconButton
              onClick={handleRefetch}
              sx={{
                color: colorPallete.ButtonSecondary,
                bgcolor: colorPallete.ButtonPrimary,
                my: 1,
                ":hover": {
                  color: colorPallete.ButtonPrimary,
                  bgcolor: colorPallete.ButtonSecondary,
                },
              }}
            >
              <ReplayIcon />
            </IconButton>

            <Link href={"/create-user"}>
              <IconButton
                sx={{
                  color: colorPallete.ButtonSecondary,
                  my: 1,
                  ":hover": {
                    color: colorPallete.ButtonPrimary,
                    bgcolor: colorPallete.ButtonSecondary,
                  },
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Link>
          </Box>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              columnGap: 1,
              justifyContent: "center",
              flexShrink: 0,
              flexWrap: "wrap",
              rowGap: 2,
            }}
          >
            {users?.data?.map((user) => (
              <Box key={user?.id} position={"relative"}>
                <UserListCard
                  avatar={user?.avatar}
                  email={user?.avatar}
                  first_name={user?.first_name}
                  id={user?.id}
                  last_name={user?.last_name}
                />
                <IconButton
                  id={user?.id.toString()}
                  onClick={handleDelete}
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: "red",
                    ":hover": { bgcolor: "orange" },
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            ))}
          </Paper>
          <Divider variant="fullWidth" flexItem sx={{ my: 2 }} />

          <Pagination
            count={users?.total_pages}
            variant="outlined"
            defaultPage={1}
            onChange={handleChangePagination}
            sx={{ mb: 5, mt: 2 }}
          />
        </Stack>
      )}
    </>
  );
};

export default UserList;
