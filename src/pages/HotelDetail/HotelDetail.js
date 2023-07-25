
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  Badge,
  Label
} from "reactstrap";
import { useSearchParams } from 'react-router-dom'
import { toDate, format } from 'date-fns';
import classNames from 'classnames';
import ReactLoading from 'react-loading';

import styles from './HotelDetail.module.scss'
import { fetchData } from '../../services/index'
import { formatCurrency } from '../../services/util'
// core components
import Spinner from "components/Custom/Spinner";

const cx = classNames.bind(styles);

export default function RegisterPage() {
  const [hotel, setHotel] = React.useState();
  const [desriptions, setDescriptions] = React.useState();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const params = {
        hotel_id: searchParams.get('hotel_id'),
        search_id: searchParams.get('search_id'),
        departure_date: format(toDate(parseInt(searchParams.get('departure_date'))), 'yyyy-MM-dd'),
        arrival_date: format(toDate(parseInt(searchParams.get('arrival_date'))), 'yyyy-MM-dd'),
        rec_guest_qty: searchParams.get('rec_guest_qty'),
        rec_room_qty: searchParams.get('rec_room_qty'),
        dest_ids: searchParams.get('dest_ids'),
        recommend_for: searchParams.get('recommend_for'),
        languagecode: searchParams.get('languagecode'),
        currency_code: searchParams.get('currency_code'),
        units: searchParams.get('units')
    }
    fetchData("https://apidojo-booking-v1.p.rapidapi.com/properties/detail", "GET", {
        params
    }).then((result) => {
      setHotel(result[0]);
    })
    fetchData("https://apidojo-booking-v1.p.rapidapi.com/properties/get-description", "GET", {
      params: {
        hotel_ids: params.hotel_id,
        check_out: params.departure_date,
        check_in: params.arrival_date,
        languagecode: 'vi'
        
      }
    }).then((result) => {
      setDescriptions(result);
    })


    document.body.classList.toggle("register-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className={cx("page-header", styles.pageHeader)} >
          <div className="page-header-image" />
          <div className="content">
            <Container>
                {
                  hotel && <Row>
                    <Col className="" lg="12" md="12">
                        <div
                        className="square square-7"
                        id="square7"/>
                        <div
                        className="square square-8"
                        id="square8"/>
                        <Card className="card-register">
                        <CardHeader className="ml-3 mt-3">
                            <h1 className="text-default text-white  mb-0">{ hotel.hotel_name }</h1>
                            <label> { hotel.address } </label>
                        </CardHeader>
                        <CardBody>
                          <Row>
                            <Col mb="12" lg="8">
                              {
                                (hotel.rooms && Object.values(hotel.rooms)[0] && Object.values(hotel.rooms)[0].photos ) && 
                                <img alt={hotel.hotel_name} className="img-fluid rounded shadow" src={Object.values(hotel.rooms)[0].photos[0].url_640x200}/>
                              }
                            </Col>
                            <Col md="12" lg="4">
                              {
                                (hotel.rooms && Object.values(hotel.rooms)[0] && Object.values(hotel.rooms)[0].photos ) && Object.values(hotel.rooms)[0].photos.map((h, index) => {
                                  return <img width={80} alt={hotel.hotel_name} className="img-fluid rounded shadow m-1" src={h["url_max300"]}/>
                                })
                              }
                            </Col>
                          </Row>
                          <hr className="text-white"></hr>
                          <Row>
                            <Col md="12">
                              <h4 className="category">Tiện ích</h4>
                              {
                                hotel.property_highlight_strip && hotel.property_highlight_strip.map((h, index) => {
                                  return (
                                    <Badge key={index} className="badge-neutral">{ h.name }</Badge>
                                  )
                                })
                              }
                            </Col>
                          </Row>
                          <hr className="text-white"></hr>
                          <Row>
                            <Col md="12">
                              <h4 className="text-white">Còn { hotel.available_rooms } phòng trống</h4>
                              <hr></hr>
                              <h5 className="text-danger">{ hotel.composite_price_breakdown.strikethrough_price.currency }<del> { formatCurrency(hotel.composite_price_breakdown.strikethrough_price.value) }</del></h5>
                              <h4 className="text-white">{ hotel.composite_price_breakdown.discounted_amount.currency } { formatCurrency(hotel.composite_price_breakdown.discounted_amount.value) }</h4>
                              {
                                hotel.composite_price_breakdown.items && hotel.composite_price_breakdown.items.map((i, index) => {
                                  return (
                                    <Badge key={index} className="badge-primary">{ i.name }</Badge>
                                  )
                                })
                              }
                            </Col>
                          </Row>
                          <hr className="text-white"></hr>
                          <Row>
                            <Col md="12">
                              {
                                desriptions && desriptions.map((des, index) => {
                                  return (
                                    <p className="category text-white" key={index}>{ des.description }</p>
                                  )
                                })
                              }
                            </Col>
                          </Row>    
                        </CardBody>
                        <CardFooter>
                            <a href={hotel.url} className="btn btn-sm btn-round btn-primary">
                              Đặt Ngay
                            </a>
                        </CardFooter>
                        </Card>
                    </Col>
                    </Row>
                }
                {
                  !hotel && <ReactLoading type="cubes" color="#e14eca" className={styles.spinner} height={'10%'} width={'10%'} />
                }
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
              />
              <div
                className="square square-2"
                id="square2"
              />
              <div
                className="square square-3"
                id="square3"
              />
              <div
                className="square square-4"
                id="square4"
              />
              <div
                className="square square-5"
                id="square5"
              />
              <div
                className="square square-6"
                id="square6"
              />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
