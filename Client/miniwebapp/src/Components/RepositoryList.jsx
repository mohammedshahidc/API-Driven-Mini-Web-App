import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllRepositories,
  setCurrentPage
} from '../Redux/slice';
import {
  Code,
  TrendingUp,
  Users,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Github,
  AlertCircle,
  Loader2
} from 'lucide-react';

const RepositoryList = () => {
  const dispatch = useDispatch();
  const { repos, isLoading, error, totalCount, currentPage } = useSelector((state) => state.repo);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    dispatch(fetchAllRepositories({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };



  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 text-purple-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Loading repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-16">
        <Github className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No repositories found</h3>
        <p className="text-gray-400">Try adding repositories by searching above</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Code className="h-6 w-6 text-blue-400" />
            <p className="text-2xl font-bold text-white">{repos.length}</p>
            <span className="text-sm text-gray-400">Repositories</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-purple-400" />
            <p className="text-2xl font-bold text-white">
              {repos.reduce((sum, item) => sum + (item.stars || 0), 0)}
            </p>
            <span className="text-sm text-gray-400">Total Stars</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-green-400" />
            <p className="text-2xl font-bold text-white">
              {repos.reduce((sum, item) => sum + (item.forks || 0), 0)}
            </p>
            <span className="text-sm text-gray-400">Total Forks</span>
          </div>
        </div>
      </div>

      {/* Repo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((item) => (
          <div key={item._id} className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.full_name}</p>
              </div>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
            </div>
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">{item.description}</p>
            <div className="flex justify-between text-gray-400 text-sm">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400" />{item.stars}</span>
              <span className="flex items-center gap-1"><GitFork className="h-4 w-4" />{item.forks}</span>
              {item.language && (
                <span className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${getLanguageColor(item.language)}`}></div>
                  {item.language}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center text-gray-400 text-xs">
              <Calendar className="h-4 w-4 mr-1" /> Updated {formatDate(item.updatedAt)}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-white">{currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RepositoryList;
