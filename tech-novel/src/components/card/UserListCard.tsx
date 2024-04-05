import { colorPallete } from "@/theme/color";
import { UserTypes } from "@/types/User";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserListCard: React.FC<UserTypes.User> = ({
  avatar,
  email,
  first_name,
  id,
  last_name,
}) => {
  return (
    <Link href={`/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 250, width: "100%", minWidth: 200 }}>
        <Box sx={{ position: "relative", width: "100%", height: 180 }}>
          <Image
            src={avatar}
            alt={first_name}
            fill
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </Box>
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            sx={{ fontSize: 14, fontWeight: 500 }}
          >
            {`${first_name} ${last_name}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            id={id?.toString()}
            fullWidth
            variant="contained"
            size="small"
            sx={{
              bgcolor: colorPallete.ButtonPrimary,
              color: colorPallete.black600,
              ":hover": {
                bgcolor: colorPallete.ButtonSecondary,
                color: colorPallete.white,
              },
            }}
          >
            More
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default UserListCard;
