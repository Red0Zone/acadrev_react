import React from 'react';
import IconLink from './IconLink'; // Import the child component

// Sample data - replace or fetch later
const sampleNavLinks = [
  { id: 1, url: '/dashboard', en_name: 'dashboard', ar_name: 'لوحة التحكم' },
  { id: 2, url: '/profile', en_name: 'profile', ar_name: 'الملف الشخصي' },
  { id: 3, url: '/settings', en_name: 'settings', ar_name: 'الإعدادات' },
  { id: 4, url: '/messages', en_name: 'messages', ar_name: 'الرسائل' },
  { id: 5, url: '/users', en_name: 'users', ar_name: 'المستخدمون' },
  { id: 6, url: '/reports', en_name: 'reports', ar_name: 'التقارير' },
  // Add more links as needed...
];

// In a real app, you'd likely get 'userLevel' via props or context
function IconGrid({ userLevel = 1 /* Default or example level */ }) {

  // In the future, you'll fetch data based on userLevel here.
  // For now, we filter the sample data (simulating the PHP WHERE clause)
  const visibleNavLinks = sampleNavLinks.filter(link => {
    // This logic should eventually match your DB query logic (level_max >= '$level' AND level_max < 20)
    // We need a 'level_max' field in our sample data for this to work properly.
    // Let's assume sampleNavLinks has level_max, e.g.:
    // { id: 1, ..., level_max: 10 }
    // return link.level_max >= userLevel && link.level_max < 20;

    // --- TEMPORARY: Show all links for now ---
    return true;
    // --- END TEMPORARY ---
  });


  // TODO: Add loading and error states when fetching data later

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {visibleNavLinks.map((link) => (
        <IconLink
          key={link.id} // Essential for list rendering in React
          url={link.url}
          enName={link.en_name}
          arName={link.ar_name}
        />
      ))}
    </div>
  );
}

export default IconGrid;