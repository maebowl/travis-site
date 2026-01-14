import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBourbons } from '../context/BourbonContext';
import BourbonCard from '../components/BourbonCard';
import BourbonModal from '../components/BourbonModal';
import SearchFilters from '../components/SearchFilters';

function Collection() {
  const { bourbons, getDistilleries, getTypes, getProofRanges } = useBourbons();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistillery, setSelectedDistillery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedProofRange, setSelectedProofRange] = useState(0);
  const [selectedBourbon, setSelectedBourbon] = useState(null);

  const distilleries = useMemo(() => getDistilleries(), [bourbons]);
  const types = useMemo(() => getTypes(), [bourbons]);
  const proofRanges = useMemo(() => getProofRanges(), []);

  const filteredBourbons = useMemo(() => {
    return bourbons.filter((bourbon) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        bourbon.name.toLowerCase().includes(searchLower) ||
        bourbon.distillery.toLowerCase().includes(searchLower) ||
        bourbon.tastingNotes.some(note => note.toLowerCase().includes(searchLower)) ||
        bourbon.review.toLowerCase().includes(searchLower);

      const matchesDistillery =
        !selectedDistillery || bourbon.distillery === selectedDistillery;

      const matchesType = !selectedType || bourbon.type === selectedType;

      const proofRange = proofRanges[selectedProofRange];
      const matchesProof =
        bourbon.proof >= proofRange.min && bourbon.proof <= proofRange.max;

      return matchesSearch && matchesDistillery && matchesType && matchesProof;
    });
  }, [bourbons, searchTerm, selectedDistillery, selectedType, selectedProofRange, proofRanges]);

  return (
    <div className="collection-page">
      <header className="collection-header">
        <Link to="/" className="logo">Travis Richardson</Link>
        <nav className="collection-nav">
          <Link to="/manage" className="nav-link">Manage</Link>
          <Link to="/" className="back-link">← Home</Link>
        </nav>
      </header>

      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDistillery={selectedDistillery}
        onDistilleryChange={setSelectedDistillery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedProofRange={selectedProofRange}
        onProofRangeChange={setSelectedProofRange}
        distilleries={distilleries}
        types={types}
        proofRanges={proofRanges}
      />

      <main className="collection-content">
        {filteredBourbons.length > 0 ? (
          <div className="gallery">
            {filteredBourbons.map((bourbon) => (
              <BourbonCard
                key={bourbon.id}
                bourbon={bourbon}
                onClick={() => setSelectedBourbon(bourbon)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No bourbons found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {selectedBourbon && (
        <BourbonModal
          bourbon={selectedBourbon}
          onClose={() => setSelectedBourbon(null)}
        />
      )}
    </div>
  );
}

export default Collection;
