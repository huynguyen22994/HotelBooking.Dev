/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Button} from 'reactstrap'

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view
import Basics from "views/IndexSections/Basics.js";
import Navbars from "views/IndexSections/Navbars.js";
import Tabs from "views/IndexSections/Tabs.js";
import Pagination from "views/IndexSections/Pagination.js";
import Notifications from "views/IndexSections/Notifications.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import NucleoIcons from "views/IndexSections/NucleoIcons.js";
import Signup from "views/IndexSections/Signup.js";
import Examples from "views/IndexSections/Examples.js";
import Download from "views/IndexSections/Download.js";
import { useStore, Actions } from 'store'
const User = React.createContext();

export default function Components() {
  const [store, setStore] = useStore();
  const [userData, setUserDate] = React.useState({ name: 1, age: 29});
  let timer = React.useRef(null);
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    timer.current = setInterval(() => {
      setUserDate((state) => {
        return {
          name : state.name + 1,
          age: 29
        }
      });
    }, 1000)
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
      clearInterval(timer.current);
    };
  }, []);

  const handleClearTimer = () => {
    //console.log(Actions.updateHeadTitle("Huy Nguyen"))
    setStore(Actions.updateHeadTitle("Huy Nguyen"));
    clearInterval(timer.current);
  }

  return (
    <User.Provider value={userData}>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader />
        <Button className='btn btn-primary' onClick={handleClearTimer}>Clear Interval</Button>
        <div className="main">
          <Basics />
          <Navbars />
          <Tabs />
          <Pagination />
          <Notifications />
          <Typography />
          <JavaScript />
          <NucleoIcons />
          <Signup />
          <Examples />
          <Download />
        </div>
        <Footer />
      </div>
    </User.Provider>
  );
}

export { User };