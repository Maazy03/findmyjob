import React, { Fragment, useEffect, useState } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { useSelector, useDispatch, connect } from "react-redux";

import {
    Row, Col,
    Card, CardBody, DropdownToggle, DropdownItem, UncontrolledButtonDropdown, DropdownMenu
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
// import ReactTable from 'react-table';
import { getSchoolPaymentHistory } from "../../../store/actions/schoolActions"
import moment from "moment";


function DataTableBasic(props) {
    console.log("BASIC", props.schoolid)
    const [data, setData] = useState([]);

    const defaultSorted = [
        {
            dataField: "name",
            order: "asc",
        },
    ]

    useEffect(() => {
        const payment = async () => {
            console.log("KUYEE", props.schoolid)
            const school = { schoolId: props.schoolid }
            const res = await props.getSchoolPaymentHistory(school);

            console.log("response SCHOOL PAYMENT", res);

            var array = [];
            let count = 0
            res.map((ans) => {
                console.log("TABLE NAME :", ans.date)

                array.push({
                    count:count++,
                    date: moment(ans.date).format("Do  MMMM, YYYY"),
                    PackageName: ans.currentPackageName,
                    slots: ans.slots,
                    amount: ans.amount
                    //    amount


                });

            });
            setData(array);
            console.log("RESaaaaaaaaaaPONSR REV:", data);

        };

        payment();
    }, [])

    const columns = [
        {
            dataField: "count",
            text: "S.No",
            sort: true,
        },
        {
            dataField: "date",
            text: "date",
            sort: true,
        },
        {
            dataField: "PackageName",
            text: "Package Name",
            sort: true,
            // align: "center",
        },
        {
            dataField: "slots",
            text: "Slots",
            sort: true,
            // align: "center",
        }, {
            dataField: "amount",
            text: "Amount Paid",
            sort: true,
            // align: "center",
        },
  
    ];



    // const driverColumns = [
    //     {
    //         Header: "S.No",

    //     },
    //     {
    //         Header: "Billing Date",

    //     },
    //     {
    //         Header:"Package"

    //     },
    //     {
    //         Header:"Slots"

    //     },
    //     {
    //         Header:"Amount Paid"

    //     }


    // ];
    const structureData = () => {
        // const remappedDrivers = drivers.map((driver) => {
        //   return {
        //     id: driver.driverNo,
        //     name: driver.name,
        //     email: driver.email,
        //     contact: driver.contact,
        //     busNo: driver.busId ? driver.busId.busNo : "---",
        //     _id: driver._id,
        //   };
        // });
        // setdriverArray(remappedDrivers);
    }

    return (
        <Fragment>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>

                <Row>
                    <Col md="12">
                        {/* <Card className="main-card mb-3">
                            <CardBody> */}
                        <div className="table-responsive">
                            <BootstrapTable
                                bootstrap4
                                keyField="id"
                                data={data}
                                columns={columns}
                                filter={filterFactory()}
                                defaultSorted={defaultSorted}
                            />
                        </div>
                        {/* </CardBody>
                        </Card> */}
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    )
}
const mapStateToProps = (state, ownProps) => {
    // console.log("ALL SKOOL :", ownProps);
    return {
        //   schoolId: ownProps.match.params.id,
        //   school: state.school.allSchools,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSchoolPaymentHistory: (schoolId) => dispatch(getSchoolPaymentHistory(schoolId)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataTableBasic);
