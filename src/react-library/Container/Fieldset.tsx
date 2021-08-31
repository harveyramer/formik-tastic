import _ from "lodash";
import Element from "../Element";
import { getName } from "../utils";
import { SyntheticEvent, useState } from "react";
import PropTypes from "prop-types";
import { FieldsetProps } from "./types";

const Fieldset = ({
  config: {
    name: containerName = "",
    title,
    elements,
    collapsible = true,
    collapsed = false,
    hasHeaderIcon = true,
    comment,
    commentClass = "text-muted d-block mb-3",
    headerIconClass = "",
    cardClass = "card",
    cardHeaderClass = "card-header",
    cardHeaderIconCollapsedClass = "fas fa-angle-down",
    cardHeaderIconDisclosedClass = "fas fa-angle-up",
    cardHeaderActionsClass = "float-end card-header-actions",
    cardBodyClass = "card-body",
  },
}: FieldsetProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsible && collapsed);
  const toggle = (event: SyntheticEvent) => {
    if (false === collapsible) {
      event.preventDefault();
      return;
    }
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div className={cardClass}>
      {!!title && (
        <div className={cardHeaderClass} onClick={toggle}>
          {hasHeaderIcon && <i className={headerIconClass}></i>}
          {title}
          {collapsible && (
            <div className={cardHeaderActionsClass}>
              <a className="btn btn-sm py-0">
                <i
                  className={
                    isCollapsed
                      ? cardHeaderIconCollapsedClass
                      : cardHeaderIconDisclosedClass
                  }
                ></i>
              </a>
            </div>
          )}
        </div>
      )}
      <div className={"collapse " + (!isCollapsed ? "show" : "")}>
        <div className={cardBodyClass}>
          {comment && <small className={commentClass}>{comment}</small>}
          {_.map(elements, ({ name, ...config }, key) => (
            <Element
              key={key}
              update={!isCollapsed}
              config={{
                ...config,
                name: getName(config.type, name, containerName),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Fieldset.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    elements: PropTypes.object.isRequired,
    cardClass: PropTypes.string,
    cardHeaderClass: PropTypes.string,
    cardHeaderActionsClass: PropTypes.string,
    cardBodyClass: PropTypes.string,
  }),
};

export default Fieldset;
