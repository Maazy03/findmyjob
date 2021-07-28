import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
import AnalyticsDashboard1 from './Examples/Variation1';

export default class AnalyticsDashboard extends Component {

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
                        subheading="LYNX.SUPER ADMIN"
                        icon="pe-7s-graph2"
                    />
                    <AnalyticsDashboard1 />
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
