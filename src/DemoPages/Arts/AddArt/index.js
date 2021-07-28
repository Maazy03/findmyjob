import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FormsDefault from './addProductForm';

function AddProduct(props) {
    return (
        <Fragment>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <FormsDefault location={props.location} />
            </ReactCSSTransitionGroup>
        </Fragment>
    )
}

export default AddProduct;