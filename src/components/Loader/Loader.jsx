import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 52,
  textAlign: "center",
};

const Loader = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-50"></div>

          <div
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <span className="loading text-white loading-bars loading-lg"></span>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default Loader;
