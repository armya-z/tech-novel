import UserList from "@/containers/useList/UserList";
import { Container, Divider, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h2" sx={{ py: 2 }}>
          User List
        </Typography>
        <Divider variant="fullWidth" flexItem sx={{ my: 2 }} />
        <UserList />
      </Container>
    </main>
  );
}
