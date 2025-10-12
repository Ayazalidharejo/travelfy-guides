// import React from 'react';
// import { Edit, Trash2, Eye, MapPin, Calendar, Users } from 'lucide-react';

// const TourCard = ({ tour, onEdit, onDelete, onView }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">{tour.title}</h3>
        
//         <div className="space-y-2 mb-4">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <MapPin size={16} />
//             <span>{tour.city || 'No location specified'}</span>
//           </div>
          
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Calendar size={16} />
//             <span>{tour.duration || 'No duration specified'}</span>
//           </div>
          
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Users size={16} />
//             <span>{tour.tourType || 'No type specified'}</span>
//           </div>
//         </div>

//         <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//           {tour.description || 'No description available'}
//         </p>

//         <div className="flex justify-between items-center">
//           <div className="flex gap-2">
//             <button
//               onClick={onView}
//               className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
//               title="View Details"
//             >
//               <Eye size={18} />
//             </button>
            
//             <button
//               onClick={onEdit}
//               className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
//               title="Edit Tour"
//             >
//               <Edit size={18} />
//             </button>
            
//             <button
//               onClick={onDelete}
//               className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
//               title="Delete Tour"
//             >
//               <Trash2 size={18} />
//             </button>
//           </div>
          
//           {tour.price && (
//             <div className="text-lg font-bold text-blue-600">
//               ${tour.price}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourCard;


import React from 'react';
import { Edit, Trash2, Eye, MapPin, Calendar, Users } from 'lucide-react';

const TourCard = ({ tour, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{tour.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{tour.city || 'No location specified'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{tour.duration || 'No duration specified'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} />
            <span>{tour.tourType || 'No type specified'}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.description || 'No description available'}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={onView}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="View Details"
            >
              <Eye size={18} />
            </button>
            
            <button
              onClick={onEdit}
              className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
              title="Edit Tour"
            >
              <Edit size={18} />
            </button>
            
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete Tour"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          {tour.price && (
            <div className="text-lg font-bold text-blue-600">
              ${tour.price}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourCard;