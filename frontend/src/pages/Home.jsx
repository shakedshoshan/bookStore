import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Home = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/leagues')
      .then((response) => {
        setLeagues(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>All Tables</h1>
        <div className='flex flex-row space-x-5'>
        <Link to='/home/leagues/create'>
          <div className='flex flex-row items-center space-x-2 p-2 rounded-lg bg-[#91dae7] hover:bg-[#52d5ec]'>
          <MdOutlineAddBox className='text-sky-800 text-2xl' />
          <h2 className='text-1xl text-sky-800'>Create League</h2>
          </div>
        </Link>
        <div className='flex flex-row items-center space-x-2 p-2 rounded-lg bg-[#91dae7] hover:bg-[#52d5ec]'>
        
          <MdOutlineAddBox className='text-sky-800 text-2xl' />
       
        <h2 className='text-1xl text-sky-800'>Join League</h2>
        </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <BooksCard leagues={leagues} />
      )}
    </div>
  );
};

export default Home;