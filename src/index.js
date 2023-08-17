import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDoList from './Apps/ToDoApp/ToDoList';
import Blog from './Apps/Blog';
import Reducer from './Apps/Reducer';
import Home from './Apps/Home';
import reportWebVitals from './reportWebVitals';
import IndexCallBack from './Apps/CallBack/IndexCallBack';
import TaskListWithTimers from './Apps/chatgptapp';
import WeatherApp from './Apps/WeatherApp/WeatherApp';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="todo" element={<ToDoList />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="reducer" element={<Reducer />} />
          <Route path="todocallback" element={<IndexCallBack />} />
          <Route path="apptodo" element={<TaskListWithTimers />} />
          <Route path="weather_app" element={<WeatherApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
