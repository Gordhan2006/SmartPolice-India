import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  UserCheck, 
  ExternalLink, 
  Filter, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { POLICE_STATIONS, STATES_LIST } from '../../data/mockData';
import { PoliceStation } from '../../types';

interface StationDirectoryProps {
  onSelectStationForComplaint?: (stationName: string) => void;
}

export const StationDirectory: React.FC<StationDirectoryProps> = ({
  onSelectStationForComplaint
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStationModal, setSelectedStationModal] = useState<PoliceStation | null>(null);

  const stationTypes = [
    'All',
    'General Station',
    'Cyber Crime Cell',
    'Women Police Station',
    'Traffic HQ'
  ];

  const filteredStations = POLICE_STATIONS.filter((ps) => {
    const matchesSearch = 
      ps.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.pincode.includes(searchQuery) ||
      ps.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState = selectedState === 'All States' || ps.state.toLowerCase().includes(selectedState.toLowerCase());
    const matchesType = selectedType === 'All' || ps.type === selectedType;

    return matchesSearch && matchesState && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Title & Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>National Police Jurisdiction Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Rajdhani'] text-white">
          All-India Police Station Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Locate jurisdictional police stations, cyber crime cells, and women safety desks across India with official contact coordinates and station in-charge officers.
        </p>
      </div>

      {/* Search & Filter Header */}
      <div className="rounded-2xl bg-[#0A192F] border border-blue-900/60 p-6 shadow-xl mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search station name, city, district, PIN code (e.g. Mandir Marg, Bandra, 110001)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All States">All States / UTs</option>
              {STATES_LIST.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Station Type */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {stationTypes.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Station Types' : t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">Quick Category:</span>
          {stationTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
          <span className="ml-auto text-slate-400 text-xs">
            Showing <strong>{filteredStations.length}</strong> verified stations
          </span>
        </div>
      </div>

      {/* Station Cards Grid */}
      {filteredStations.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-slate-950/40 rounded-2xl border border-slate-800 p-8">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white">No police stations found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, state, or category filter to discover jurisdictional centers.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedState('All States');
              setSelectedType('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="rounded-2xl bg-[#0A192F] border border-blue-900/40 hover:border-blue-600/60 p-6 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                    station.type === 'Cyber Crime Cell'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : station.type === 'Women Police Station'
                      ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  }`}>
                    {station.type}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {station.code}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors font-['Rajdhani']">
                  {station.name}
                </h3>

                <p className="text-xs text-slate-400 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{station.address}</span>
                </p>

                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>In-Charge:</span>
                    </span>
                    <span className="font-medium text-white">{station.inChargeOfficer}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Control Desk:</span>
                    </span>
                    <a href={`tel:${station.phone}`} className="font-mono text-blue-300 hover:underline">
                      {station.phone}
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hours:</span>
                    </span>
                    <span className="text-slate-300">{station.operatingHours}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(station.name + ', ' + station.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Map</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                {onSelectStationForComplaint && (
                  <button
                    onClick={() => onSelectStationForComplaint(station.name)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <span>File Here</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
