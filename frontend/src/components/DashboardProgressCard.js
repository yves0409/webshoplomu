import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

const DashboardProgressCard = ({
  currentMonth,
  monthlyTotal,
  currentProgress,
  lastMonth,
  finalResult,
  finaldecreaseResult,
  title,
  subTitle,
}) => {
  return (
    <>
      <Card className="m-3 rounded" bg="light">
        <Card.Header>Current month {currentMonth}</Card.Header>
        <Card.Body>
          <Card.Title>Monthly {title}</Card.Title>
          <Card.Text>
            {subTitle}
            <span style={{ fontSize: "20px" }}>{monthlyTotal}</span>
          </Card.Text>
          <ProgressBar className="m-2">
            <ProgressBar
              variant="info"
              animated
              now={currentProgress}
              key={1}
              label={`${currentProgress}%`}
            />
          </ProgressBar>
          {currentProgress > lastMonth ? (
            <Card.Text>
              <i className="fas fa-arrow-alt-circle-up fa-lg text-success"></i>{" "}
              by <span style={{ fontSize: "20px" }}>{finalResult}</span>%
              compared to last month
            </Card.Text>
          ) : (
            <Card.Text>
              <i className="fas fa-arrow-alt-circle-down fa-lg text-danger"></i>
              <span style={{ fontSize: "20px" }}>{finaldecreaseResult}</span>%
              compared to last month
            </Card.Text>
          )}

          <ProgressBar className="m-2">
            <ProgressBar
              variant="danger"
              now={lastMonth}
              key={1}
              label={`${lastMonth}%`}
            />
          </ProgressBar>
        </Card.Body>
      </Card>
    </>
  );
};

export default DashboardProgressCard;
