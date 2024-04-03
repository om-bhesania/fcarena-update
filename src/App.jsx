import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Booking from "./pages/Booking";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Nav from "./components/navbar/Navbar";
import "./fonts/Chromate-Regular.otf";
import Footer from "./components/footer/Footer";
import Timings from "./pages/Timings";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/Utils/PrivateRoutes";
import ContactUs from "./pages/ContactUs";
import TimeSlotSelector from "./components/BookingPageSections/test";
import {
  addDefaultPrice,
  addDefaultPriceToFirestore,
} from "./components/Utils/Data";
import TermsConditions from "./pages/T&C";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CancellationRefund from "./pages/CancellationRefund";
import Superadmindashboard from "./pages/superadmindashboard";
import I18n from "./components/translations/i18n"; 

const i18n = new I18n();
async function exampleFunction() {
  const translatedString = i18n.trans("key");
  console.log(translatedString);

  const translatedPluralString = i18n.trans_choice("key", 2);
  console.log(translatedPluralString);
}
function App() {
  exampleFunction();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Chromate Serif"],
      },
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/timings" element={<Timings />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/terms-&-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/cancellation-&-refund"
            element={<CancellationRefund />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TimeSlotSelector />} />
          <Route
            path="/dashboard"
            element={<PrivateRoutes component={Dashboard} />}
          />
          <Route
            path="/superadmin"
            element={<PrivateRoutes component={Superadmindashboard} />}
          />
          ;
        </Routes>
        <Footer />
        {/* <Route path="/404" element={<Error404 />} /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
