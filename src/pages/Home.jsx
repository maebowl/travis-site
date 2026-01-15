import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBourbons } from '../context/BourbonContext';

function Home() {
  const { bourbons, loading } = useBourbons();

  const stats = useMemo(() => {
    if (bourbons.length === 0) {
      return { total: 0, distilleries: 0, avgRating: '—' };
    }
    const favorites = bourbons.filter(b => b.favorite).length;
    const avgRating = (bourbons.reduce((sum, b) => sum + b.rating, 0) / bourbons.length).toFixed(1);
    const distilleries = new Set(bourbons.map(b => b.distillery)).size;
    return {
      total: bourbons.length,
      favorites,
      avgRating,
      distilleries
    };
  }, [bourbons]);

  return (
    <div className="home">
      <div className="home-content">
        <h1>Travis Richardson</h1>
        <p className="subtitle">Bourbon Collection</p>

        <div className="home-stats">
          <div className="home-stat">
            <div className="number">{loading ? '—' : stats.total}</div>
            <div className="label">Bottles</div>
          </div>
          <div className="home-stat">
            <div className="number">{loading ? '—' : stats.distilleries}</div>
            <div className="label">Distilleries</div>
          </div>
          <div className="home-stat">
            <div className="number">{loading ? '—' : stats.avgRating}</div>
            <div className="label">Avg Rating</div>
          </div>
        </div>

        <div className="home-buttons">
          <Link to="/collection" className="btn-primary">
            View Collection
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
