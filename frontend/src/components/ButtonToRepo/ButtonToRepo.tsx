import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";

import { REPO_URI } from "../../constants";

export const ButtonToRepo = (props: { className?: string }) => {
  return (
    <IconButton
      className={props.className}
      target="_blank"
      href={REPO_URI}
      title="Github repo"
    >
      <GitHubIcon />
    </IconButton>
  );
};
