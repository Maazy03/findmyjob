import React, { Component, Fragment } from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import PerfectScrollbar from "react-perfect-scrollbar";

const ChatExample = (props) => {
  const { data } = props;

  return (
    <Fragment>
      <div className="scroll-area-sm">
        <PerfectScrollbar>
          <div className="p-3">
            <VerticalTimeline
              layout="1-column"
              className="vertical-without-time"
            >
              {data &&
                data.map((item, index) => {
                  return (
                    <VerticalTimelineElement
                      className="vertical-timeline-item"
                      icon={
                        <i className="badge badge-dot badge-dot-xl badge-success">
                          {" "}
                        </i>
                      }
                    >
                      <h4 className="timeline-title">{item.messages.event}</h4>
                      <p>{item.messages.messages}</p>
                    </VerticalTimelineElement>
                  );
                })}
            </VerticalTimeline>
          </div>
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
};

export default ChatExample;
