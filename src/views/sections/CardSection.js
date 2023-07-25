import React from "react";
import classnames from "classnames";
// reactstrap components
import {
    TabContent,
    TabPane,
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    Badge, CardFooter, Button
} from "reactstrap";

export default function CardSection({ data }) {
    const [iconTabs, setIconsTabs] = React.useState(1);

    
    const formatCurrency = (number) => {
        return (number).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }

    return (
        <Card>
            <CardHeader>
                <span className="pull-right mt-2">
                    <Badge color="danger" style={{ marginRight: 3 }}>{ data.review_score_word }</Badge>
                    { data.review_score } 
                </span>
                <h3 className="text-white mb-1">{ data.hotel_name }
                    { !!data.class && (<span className="text-danger text-sm ml-2">{data.class} <i className="icon icon-sm tim-icons icon-satisfied" /></span>) }
                </h3>
                <a href={data.url} className="category text-white">{ data.address }, { data.district }, { data.city }</a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`} target="_blank" className="category text-info ml-2">Xem bản đồ</a>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md="2" sm="2">
                        <img width={100} alt={data.hotel_name} style={{ margin: "0.2rem" }} className="img-fluid rounded shadow" src={data.main_photo_url}/>
                    </Col>
                    <Col md="9" sm="9">
                        <Card>
                            <CardBody>
                                <p className="category">Cách trung tâm { data.distance_to_cc } km</p>
                                <p className="category">Đánh giá: { data.review_nr } lượt</p>
                                <p className="category">Checkin từ { data.checkin.from } và checkout đến { data.checkout.until }</p>
                                <p className="category text-success">
                                    { !!data.is_no_prepayment_block && '- Không thanh toán trước ' }
                                    { !!data.has_free_parking && '- Bãi đỗ xe miễn phí ' }
                                    { !!data.hotel_include_breakfast && '- Bao ăn sáng ' }
                                    { !!data.is_free_cancellable && '- Miễn phí hủy phòng ' }
                                </p>
                            </CardBody>
                        </Card>
                        <div className="pull-right" style={{ display: "flex" }}>
                            <h4 className="text-white mr-2 mt-3">{ data.currencycode } { formatCurrency(data.min_total_price) }</h4>
                            <Button className="btn-round btn-sm" color="primary" type="button">Xem chổ trống</Button>
                        </div>  
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}