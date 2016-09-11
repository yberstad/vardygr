import React from 'react';
import Home from '../routes/Home';
import Details from '../routes/Details';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';
import RouteTracker from '../routes/RouteTracker';
import RouteSearch from '../routes/RouteSearch';

export const routes = {
  getRouteTrackerRoute(route, stop){
    return{
      renderScene(navigator) {
        return <RouteTracker navigator={navigator} route={route} stop={stop} />
      },
      
      showNavigationBar: false,
    }
  },
  getHomeRoute() {
    return {
      renderScene(navigator) {
        return <Home navigator={navigator} />;
      },

      getTitle() {
        return 'Home';
      },
    };
  },
  getDetailsRoute() {
    return {
      renderScene(navigator) {
        return <Details navigator={navigator} />;
      },

      getTitle() {
        return 'Details';
      },
    };
  },
  getRouteSearchRoute() {
    return {
      renderScene(navigator) {
        return <RouteSearch navigator={navigator} />;
      },
      
      getTitle() {
        return 'Search For Stops';
      },
    };
  },
  getProfileRoute() {
    return {
      renderScene(navigator) {
        return <Profile navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },
  getSignInRoute() {
    return {
      renderScene(navigator) {
        return <SignIn navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },
};

export default routes;
