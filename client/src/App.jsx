import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ListingForm from "./components/ListingForm";
import ListingBrowserWithRouter from "./components/ListingBrowser";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/addListing">Add Listing</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/browse" component={ListingBrowserWithRouter} />
          <Route path="/addListing" component={ListingForm} />
          <Route path="/">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// function Topics() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }

export default App;