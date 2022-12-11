import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";

type Props = {
  setOpen: (value: boolean) => void;
  open: boolean;
};

export default function Feedback(props: Props): JSX.Element {
  const { open, setOpen } = props;
  const [modalType, setModalType] = React.useState("Essay Feedback");
  const [essayFeedback, setEssayFeedback] = React.useState<number | null>(null);
  const [siteFeedback, setSiteFeedback] = React.useState<number | null>(null);

  
  const handleClose = () => {
    setOpen(false);
    setModalType("Essay Feedback");
    setEssayFeedback(null);
    setSiteFeedback(null);
  };

  const handleFeedback = () => {
    if (modalType === "Essay Feedback") {
      setModalType("Site Feedback");
    } else {
      if (siteFeedback === null) return;
      if (essayFeedback === 5 && siteFeedback === 5) {
        setModalType("Rate Us");
        // here we call an api to store when user click on the review button for trustpilot
      } else {
        handleClose();
      }
    }
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalType}
        </Typography>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Box sx={{ mt: 2 }}>
            {modalType === "Essay Feedback" ? (
              <Rating
                name="simple-controlled"
                value={essayFeedback}
                size="large"
                onChange={(event, newValue) => {
                  setEssayFeedback(newValue);
                }}
              />
            ) : null}
            {modalType === "Site Feedback" ? (
              <Rating
                name="simple-controlled"
                value={siteFeedback}
                size="large"
                onChange={(event, newValue) => {
                  setSiteFeedback(newValue);
                }}
              />
            ) : null}
            {modalType === "Rate Us" ? (
              <Box>How about rate us at TrustPilot?</Box>
            ) : null}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              disabled={essayFeedback === null}
              onClick={handleFeedback}
            >
              Rate
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
