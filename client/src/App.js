import "./App.css";
// import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/HeaderPage";
import Footer from "./components/FooterPage";
import Home from "./containers/HomePage";
import KycForm from "./containers/KycFormPage";
import EPharma from "./containers/E-PharmaPage";
import HomeCare from "./containers/HomeCarePage";
import DoctorsOnCall from "./containers/DoctorsOnCallPage";
import CompanyProfilePage from "./containers/AboutPage/CompanyProfilePage";
import VisionMission from "./containers/AboutPage/VisionMissionPage";
import CompanyProgressSatuts from "./containers/AboutPage/CompanyStatusProgressPage";
import SwasthyaSamridiInNepal from "./containers/AboutPage/SwasthaySamridiInNepalPage";
import Team from "./containers/AboutPage/TeamPage/Team";
import RoadMap from "./containers/RoadMapPage";
import Features from "./containers/FeaturesPage";
import OurPatners from "./containers/OurPartnerspage";
import Contact from "./containers/ContactPage";
import SignUp from "./containers/SignUpPage";
import SignIn from "./containers/SignInPage";
import FindHospitals from "./containers/FindHospitalsPage";
import FindDoctors from "./containers/FindDoctorsPage";
import FindLabs from "./containers/FindLabsPage";
import FindPharmacy from "./containers/FindPharmacyPage";
import NotFoundPage from "./containers/NotFoundPage";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/e-pharma" component={EPharma} />
        <Route path="/home-care" component={HomeCare} />
        <Route path="/doctors-on-call" component={DoctorsOnCall} />
        <Route path="/kyc-form" component={KycForm} />

        <Route path="/about/company-profile" component={CompanyProfilePage} />
        <Route path="/about/vision-mission" component={VisionMission} />
        <Route
          path="/about/company-status-progress"
          component={CompanyProgressSatuts}
        />
        <Route
          path="/about/swasthay-samridi-in-nepal"
          component={SwasthyaSamridiInNepal}
        />
        <Route path="/team" component={Team} />
        <Route path="/road-maps" component={RoadMap} />

        <Route path="/features" component={Features} />
        <Route path="/our-partner" component={OurPatners} />
        <Route path="/contact" component={Contact} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/find-hospitals" component={FindHospitals} />
        <Route path="/find-doctors" component={FindDoctors} />
        <Route path="/find-labs" component={FindLabs} />
        <Route path="/find-pharmacy" component={FindPharmacy} />
        <Route exact path="/" component={Home} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
