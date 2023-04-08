import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { useDispatch } from "react-redux";

type Props = {
  connectionId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
};

const Conenctions = ({
  connectionId,
  name,
  subtitle,
  userPicturePath,
}: Props) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { _id, token, connections } = useSelector((state: ReduxState) => {
    return {
      _id: state.user?._id,
      token: state.token,
      connections: state.user?.connections,
    };
  });

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  console.log("CONNECTIONS: ", connections);

  const isConnection = connections?.find(
    (connection) => connection === connectionId
  );

  console.log("ISCONNECTION: ", isConnection);

  return (
    <>
      <h1>_id: </h1>
      <p>{_id}</p>
      <h1>Token: </h1>
      <span>{token}</span>
      <h1>Connections: </h1>
      <p>{connections ? connections : "No Connections."}</p>
      {/* <p>{connectionId}</p> */}
    </>
  );
};

export default Conenctions;
