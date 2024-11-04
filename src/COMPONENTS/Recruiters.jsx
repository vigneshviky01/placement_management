import React from 'react';

const Recruiters = () => {
  // Dummy data for top recruiters with high packages
  const topRecruiters = [
    { name: '', package: '31 LPA', logo: '/Images/visa.png' },
    { name: '', package: '18 LPA', logo: '/Images/walmart.jpg' },
    { name: '', package: '16 LPA', logo: '/Images/deshaw.png' },
    { name: '', package: '15 LPA', logo: '/Images/ibm.jpg' },
    { name: '', package: '14 LPA', logo: '/Images/viasat.png' },
  ];

  // Dummy data for other recruiters (only names, no logos)
  const recruiters = [
    { name: 'Zoho' },
    { name: 'Accenture' },
    { name: 'TCS' },
    { name: 'Bosch' },
    { name: 'One Bill' },
    { name: 'Shoba Construction' },
    { name: 'Titan' },
    { name: 'Dtcc' },
    { name: 'Tafe' },
  ];

  return (
    <div className="p-5 bg-gray-100">
      {/* Empty space for navbar */}
      <div className="h-16"></div>

      {/* Top recruiters section with scrolling */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Top Recruiters with High Packages</h2>
        <div className="flex gap-5 animate-scroll">
          {topRecruiters.map((recruiter, index) => (
            <div
              key={index}
              className="inline-block bg-white border border-gray-300 rounded-lg p-5 text-center shadow-md w-56 h-72"
            >
              <img src={recruiter.logo} alt={recruiter.name} className="w-48 h-48 object-contain mb-4" />
              <div className="mt-4">
                <span className="block font-semibold text-lg text-gray-800">{recruiter.name}</span>
                <span className="block text-green-600 font-bold text-md mt-2">{recruiter.package}</span>
              </div>
            </div>
          ))}
        </div>
      </div> {/* <- Added closing div here */}

      {/* Recruiters section - only company names */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Recruiters</h2>
        <div className="flex flex-wrap justify-between gap-5">
          {recruiters.map((recruiter, index) => (
            <div
              key={index}
              className="bg-white p-4 flex-grow-0 basis-[calc(33.33%-1.25rem)] border border-gray-300 rounded-lg text-center shadow-md"
            >
              <span className="block font-semibold text-gray-800">{recruiter.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recruiters;
