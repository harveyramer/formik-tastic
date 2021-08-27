import _ from "lodash";
import React from "react";
import Element from "../Element";
import { joinNames } from "../utils";
import { HTMLTagProps } from "./types";

const HtmlTag = (
    props: HTMLTagProps,
  ) => {
    const {
        config: {
          name: containerName = "",
          as,
          elements,
          htmlClass,
          comment,
          commentClass = "text-muted d-block mb-3",
        }
     } = props;
  const TagName = as || "div";
  return React.createElement(
    TagName,
    { className: htmlClass },
    <>
      {" "}
      {comment && <small className={commentClass}>{comment}</small>}
      {_.map(elements, ({ name, ...rest }, key) => (
        <Element
          key={key}
          config={{ ...rest, name: joinNames(containerName, name) }}
        />
      ))}
    </>
  );
};

export default HtmlTag;
