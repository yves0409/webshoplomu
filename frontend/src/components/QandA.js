import React from "react";

const QandA = (props) => {
  const faqs = props.faq;

  if (faqs) {
    console.log(faqs);
  }

  return (
    <>
      {faqs
        ? faqs.map((q, i) => (
            <ul key={i}>
              <li>{q.q}</li>
              <li>{q.a}</li>
            </ul>
          ))
        : null}
    </>
  );
};

export default QandA;
