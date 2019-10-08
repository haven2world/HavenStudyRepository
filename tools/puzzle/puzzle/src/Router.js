import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './pages/game/App';

/**
 * 路由
 */

export default function () {
  return (
    <Router>
      <Route path={'/'} exact component={App} />
    </Router>
  )
}