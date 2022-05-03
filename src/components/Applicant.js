import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './shared/Footer';
import Header from './shared/Header';
import './Applicant.css';

export default function Applicant({ title }) {
  return (
    <div className='applicant'>
      <div className='applicant-header'>
        <Header>{title ?? 'Applicant'}</Header>
      </div>
      <div className='applicant-content'>
        <Outlet />
      </div>
      <div className='applicant-footer'>
        <Footer />
      </div>
    </div>
  );
}
