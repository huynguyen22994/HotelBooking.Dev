
import React from "react";
import $ from "jquery";
// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  ListGroup, 
  ListGroupItem,
  Container,
  Row,
  Col
} from "reactstrap";
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import { useStore, Actions } from '../../store'
import { fetchData } from '../../services/index'

import Spinner from '../Custom/Spinner'

export default function PageHeader({ searchCallback }) {
  const [store, setStore] = useStore();
  const [locations, setLocations] = React.useState([]);
  const [showListLocation, setShowListLocation] = React.useState(false);
  const [placeSpinner, setPlaceSpinner] = React.useState(false);
  const [place, setPlace] = React.useState(null);
  const [isSearching, setIsSeraching] = React.useState(false);
  const blockCall = React.useRef(false);
  const scopeData = React.useRef({ selectedLocation: null, dateRange: null, persons: null });
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateRangeTxt, setDateRangeTxt] = React.useState("Ngày nhận phòng - Ngày trả phòng");
  const [datePicker, setDatePicker] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
  const [persons, setPersons] = React.useState();

  React.useEffect(() => {
    if(showDatePicker) {
      // Hide dropdown menu on click outside
      $(document).on("click", function(event){
          if(!$(event.target).closest("#datePicketRangeWrap").length){
            scopeData.current.dateRange = datePicker[0];
            const startDateTxt = format(new Date(scopeData.current.dateRange.startDate), "EE, d LLLL yyyy")
            const endDateTxt = format(new Date(scopeData.current.dateRange.endDate), "EE, d LLLL yyyy")
            setDateRangeTxt(`${startDateTxt} - ${endDateTxt}`);
            setShowDatePicker(false);
          }
      });
    }
    //clean up
    return () => { 
      $(document).off("click")
    }
  }, [showDatePicker])

  React.useEffect(() => {
    const getData = setTimeout(() => {
      handeGetPlace();
    }, 1000)
    return () => {
      clearTimeout(getData);
    }
  }, [place])

  React.useEffect(() => {
    if(showListLocation) {
      $("#bobyPlace").show();
    } else {
      $("#bobyPlace").hide();
    }
  }, [showListLocation])

  const handeGetPlace = async () => {
    try {
      if(place && blockCall.current) {
        const data = await fetchData('https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete', 'GET', { params: {
          text: place,
          languagecode: 'en-us'
        }});
        setLocations(data);
        setPlaceSpinner(false);
        setShowListLocation(true);
      } else {
        setPlaceSpinner(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handeSelectLocation = (location) => {
    scopeData.current.selectedLocation = location;
    blockCall.current = false;
    setPlace(location.name);
    setShowListLocation(false);
  }
  
  const handleChangePersons = (e) => {
    const value = parseInt(e.target.value);
    scopeData.current.persons = value;
    setPersons(value);
  }

  const handleSearchHotels = async () => {
    if(scopeData.current.selectedLocation && scopeData.current.persons && scopeData.current.dateRange) {
      setIsSeraching(true);
      const data = await fetchData('https://apidojo-booking-v1.p.rapidapi.com/properties/list', 'GET', { 
        params: {
          offset: '0',
          arrival_date: format(scopeData.current.dateRange.startDate, "yyyy-MM-dd"),
          departure_date: format(scopeData.current.dateRange.endDate, "yyyy-MM-dd"),
          guest_qty: scopeData.current.persons,
          dest_ids: scopeData.current.selectedLocation.dest_id,
          room_qty: '1',
          search_type: scopeData.current.selectedLocation.dest_type,
          // children_qty: '2',
          // children_age: '5,7',
          // search_id: 'none',
          // price_filter_currencycode: 'USD',
          // order_by: 'popularity',
          // languagecode: 'en-us',
          // travel_purpose: 'leisure'
        }
      });
      if(data && data.result) {
        setIsSeraching(false);
        searchCallback && searchCallback({
          location: scopeData.current.selectedLocation,
          persons: scopeData.current.persons,
          dateRange: scopeData.current.dateRange,
          hotelResults: data.result
        })
      }
      setIsSeraching(false);
    } else {
      setIsSeraching(false);
    }
  }

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="text-default">Tìm khách sạn du lịch...</h1>
          <Form inline>
            <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
              <Input type="text" placeholder="Bạn muốn đến đâu ?"
                value={place}
                onChange={(e) => { blockCall.current = true; setPlaceSpinner(true); setPlace(e.target.value) }}
              />
              {
                place && <ListGroup className="headerListGroup" id="bobyPlace">
                  { placeSpinner && <ListGroupItem style={{ padding: 5, textAlign: "center" }}>
                    Đang tải...
                  </ListGroupItem> 
                  }
                  {
                    (Array.isArray(locations) && showListLocation) && locations.map((location, index) => {
                      return <ListGroupItem key={index} onClick={() => { handeSelectLocation(location) }}>
                        <Row>
                          <Col xs="9">
                            <p className="text-default">{ location.name }</p>
                            <span>{ location.label }</span>
                          </Col>
                          <Col xs="auto">
                            <img className="img-fluid" src={ location.image_url } />
                          </Col>
                        </Row> 
                      </ListGroupItem>
                    })
                  }
                </ListGroup>
              }
            </FormGroup>
            <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                <Button className="headButton"  
                  onClick={(event) => {event.stopPropagation(); setShowDatePicker(true)}}>{ dateRangeTxt }</Button>
                  {
                    showDatePicker && 
                    <div id="datePicketRangeWrap">
                      <DateRange
                        className="dateRange"
                        editableDateInputs={true}
                        onChange={item => {
                          console.log(item);
                          setDatePicker([item.selection])
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={datePicker}
                      />
                    </div>
                  }
            </FormGroup>
            <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
              <Input type="number" placeholder="Bao nhiêu người" 
                value={persons} onChange={handleChangePersons}/>
            </FormGroup>
            <Button onClick={handleSearchHotels}>
              Tìm 
              {
                isSearching && <Spinner className="ml-2"></Spinner>
              }
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}
