"use client";
import { fetchUsers } from "@/api/api";
import UserListCard from "@/components/card/UserListCard";
import { RootState } from "@/lib/store";
import { setUsers } from "@/service/user/UserSlice";
import {
  CircularProgress,
  Divider,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user);
  console.log(users);
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
          }}
        >
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
              <UserListCard
                avatar={user?.avatar}
                email={user?.avatar}
                first_name={user?.first_name}
                id={user?.id}
                last_name={user?.last_name}
                key={user?.id}
              />
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
