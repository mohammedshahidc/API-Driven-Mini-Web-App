import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepositories, fetchAllRepositories } from '../Redux/slice';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, currentPage } = useSelector((state) => state.repo);
  const itemsPerPage = 6;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    dispatch(fetchRepositories({ query: keyword.trim(), page: 1, limit: itemsPerPage }))
      .unwrap()
      .then(() => {
        dispatch(fetchAllRepositories({ page: currentPage, limit: itemsPerPage }));
      });
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Explore
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> All Saved Repositories</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Search and save repositories, then view them all here
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative flex rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
            <div className="flex items-center pl-6">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search repositories to save (e.g., react, nodejs, python...)"
              className="flex-1 px-4 py-4 text-white placeholder-gray-400 bg-transparent border-none focus:outline-none text-lg"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !keyword.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Search & Save</span>
                  <Search className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
