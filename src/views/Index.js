import React from "react";
import { 
  Button,
  Container,
  Row,
  Col,
  } from 'reactstrap'
import $ from 'jquery'  
import { format } from 'date-fns';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view
import CardSections from "views/sections/CardSection";
import { useStore, Actions } from '../store'
const User = React.createContext();

export default function Index() {
  const [store, setStore] = useStore();
  const [resultData, setResultData] = React.useState(null);
  //const CardSectionEle = React.useRef();

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

  return (
    <>
      <IndexNavbar />
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
                            return <CardSections key={index} data={item} />
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
        <Footer />
      </div>
    </>
  );
}