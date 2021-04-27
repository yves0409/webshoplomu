import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const HoverRating = ({ value }) => {
  const [hover, setHover] = useState(-1);

  return (
    <div className="ratingStyle">
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box ml={2}>
          {
            <Chip
              label={labels[hover !== -1 ? hover : value]}
              /* variant="outlined" */
              className="bg-warning"
            />
          }
        </Box>
      )}
    </div>
  );
};

export default HoverRating;
