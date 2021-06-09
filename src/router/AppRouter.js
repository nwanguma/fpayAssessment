import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Payout from "../features/payout/payout";
import NotFound from "../pages/notFound";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/payout" exact component={Payout} />
        <Route path="/" exact component={Payout} />
        <Route path="/*" exact component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
