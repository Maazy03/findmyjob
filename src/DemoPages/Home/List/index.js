import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import HomeCards from '../HomeCards';
import CardDetails from "../CardDetails"

// Examples
// import AnalyticsDashboard1 from './Examples/Variation1';

export default class List extends Component {

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="Analytics Dashboard"
                        subheading="AfricanArt.International."
                        icon="pe-7s-graph2"
                    />
                    {/* <AnalyticsDashboard1 /> */}
                  <HomeCards />
                  {/* <CardDetails /> */}
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
