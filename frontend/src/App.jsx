import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateLeague from './pages/CreateLeague';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import LeagueTable from './pages/LeagueTable';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div className='bg-sky-100 h-max mt-40'>
    <Routes >
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/home/leagues/create' element={<CreateLeague />} />
      <Route path='/home/league/details/:id' element={<LeagueTable />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
    </div>
  );
};

export default App;