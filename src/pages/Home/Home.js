import React from "react";
import { 
  Button,
  Container,
  Row,
  Col,
  } from 'reactstrap'
import {useNavigate, createSearchParams} from 'react-router-dom'
import { format } from 'date-fns';
import classNames from 'classnames/bind';

// core components

import PageHeader from "components/PageHeader/PageHeader.js";
import CardSections from "components/Sections/Card";
// scss
import styles from "./home.module.scss";
// actions
import { useStore, Actions } from '../../store'

const cx = classNames.bind(styles);

export default function HomePage() {
  const [store, setStore] = useStore();
  const [resultData, setResultData] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const handleSearchHotel = (result) => {
    setResultData(result);
    document.querySelector('#card-main-elements').scrollIntoView({ behavior: 'smooth' })
  }

  const handleViewDetail = (data) => {
    console.log(data);
    navigate({
      pathname: '/hotel',
      search: `?${createSearchParams({ hotelid: data.hotel_id })}`,
    });
  }

  return (
    <>
      <div className="wrapper">
        <PageHeader searchCallback={ handleSearchHotel } />
        <div className="main"  id="card-main-elements">
          {
            resultData && 
            <div className="section section-basic pt-1">
              <Container>
                  <h2 className="text-default title">{ resultData.location && resultData.location.name }: Tìm thấy { resultData.hotelResults.length } chổ nghỉ</h2>
                  <p className="category text-default">{ resultData.dateRange && format(new Date(resultData.dateRange.startDate), 'EE, d LLLL yyyy')} - { resultData.dateRange && format(new Date(resultData.dateRange.endDate), 'EE, d LLLL yyyy') }, số lượng { resultData.persons } người</p>
                  <hr></hr>
                  <Row>
                      <Col md="12">
                        {
                          resultData.hotelResults.map((item, index) => {
                            return <CardSections key={index} data={item} handleViewDetail={handleViewDetail}/>
                          }) 
                        }
                      </Col>
                      <Col md="auto">

                      </Col>
                  </Row>
              </Container>
            </div>
          }
        </div>
      </div>
    </>
  );
}