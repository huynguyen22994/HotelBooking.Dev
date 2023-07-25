import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from './Footer.module.css';
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cx("footer", styles.footer)}>
      <Container>
        <Row>
          <Col md="3">
            <h4 className="title">HotelBooking.dev</h4>
          </Col>
          <Col md="6"></Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink to="https://huynguyen22994.github.io/resume" tag={Link}>
                  By HUY NGUYỄN
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
