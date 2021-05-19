import React from "react";

import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const DasboardOverviewCard = ({ title, subTitle, total, week, icon, link }) => {
  return (
    <>
      <Card className="m-3 rounded" bg="light">
        <Card.Body>
          <Card.Title>
            {title}
            {total}
          </Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            <h5>
              {subTitle}
              {week}
            </h5>
          </Card.Subtitle>
          <Card.Text>{icon}</Card.Text>
        </Card.Body>
        <Link to={`/admin/${link}`}>
          <Tooltip title={`go to ${link}`}>
            {
              <MoreHorizOutlinedIcon
                style={{ cursor: "pointer" }}
                className="m-2"
              />
            }
          </Tooltip>
        </Link>
      </Card>
    </>
  );
};

export default DasboardOverviewCard;
