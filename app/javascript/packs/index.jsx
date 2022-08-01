// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('applicationRoot');
  const root = createRoot(container);
  root.render(<App />);
},{ once: true })
