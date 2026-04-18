import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";

import { REPO_URI } from "../../constants";
import { t9n } from "../../t9n/t9n";

export const ButtonToRepo = (props: { className?: string }) => {
  return (
    <IconButton
      className={props.className}
      target="_blank"
      href={REPO_URI}
      title={t9n.buttonToRepo.title}
    >
      <GitHubIcon />
    </IconButton>
  );
};
