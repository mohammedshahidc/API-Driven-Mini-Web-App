import './App.css';
import React from 'react';
import Header from './Components/Layout/Header.jsx';
import SearchBar from './Components/SearchBar.jsx';
import RepositoryList from './Components/RepositoryList.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[length:50px_50px] opacity-20"></div>
      <div className="relative z-10">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar />
          <RepositoryList />
        </div>
      </div>
    </div>
  );
};

export default App;
