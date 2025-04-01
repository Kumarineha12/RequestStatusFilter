// import React, { useState, useEffect } from "react";
// import ConfirmationCard from "./ConfirmationCard"; // Import the ConfirmationCard component

// const AdminPanel = ({
//   cities,
//   builders,
//   communities,
//   onCityChange,
//   onBuilderChange,
//   records,
//   status,
//   rmfm,
//   requestsLoading,
//   onUpdateRecord,
// }) => {
//   const [updateRecords, setUpdateRecords] = useState({});
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [selectedCommunity, setSelectedCommunity] = useState("");
//   const [selectedRm, setSelectedRm] = useState("");
//   const [amountInputs, setAmountInputs] = useState({});
//   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation modal
//   const [selectedTransactionId, setSelectedTransactionId] = useState(null); // State for selected transaction ID
//   const [selectedBuilder, setSelectedBuilder] = useState(""); // Add selectedBuilder state
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   const applyFilters = (records, communityId, rmId,builderId) => {
//     let updatedRecords = [...records];

//     if (builderId) {
//       const builderCommunities = communities.filter(community => community.builder_id === parseInt(builderId));
//       const communityIds = builderCommunities.map(community => community.id);
//       updatedRecords = updatedRecords.filter(record => communityIds.includes(record.community_id));
//     }

//     if (communityId) {
//       updatedRecords = updatedRecords.filter(
//         (record) => record.community_id === parseInt(communityId)
//       );
//     }

//     if (rmId) {
//       updatedRecords = updatedRecords.filter(
//         (record) => String(record.rm_id) === String(rmId)
//       );
//     }
//     return updatedRecords;
//   };

//   useEffect(() => {
//     const filtered = applyFilters(records, selectedCommunity, selectedRm, selectedBuilder);
//     setFilteredRecords(filtered);
//   }, [records, selectedCommunity, selectedRm,selectedBuilder,communities]);
  

//   const handleCommunityChange = (communityId) => {
//     setSelectedCommunity(communityId);
//   };
//   const handleBuilderChange = (builderId) => {
//     setSelectedBuilder(builderId);
//     onBuilderChange(builderId); // Notify parent component
//   };

//  // Create a handler function to update the amountInputs state when the RM enters an amount.
//   const handleAmountChange = (transactionId, amount) => {
//     setAmountInputs((prev) => ({
//       ...prev,
//       [transactionId]: amount,
//     }));
//   };

//   const handleRmChange = (transactionId, rmId) => {
//     if (!rmId) return;

//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         updatedRm: rmId,
//       },
//     }));
//   };

//   const handleTopRmChange = (rmId) => {
//     setSelectedRm(rmId);
//   };

//   const handleFmChange = (transactionId, fmId) => {
//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         updatedFm: fmId,
//       },
//     }));
//   };

//   const handleStatusChange = (transactionId, statusId) => {
//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         currentStatus: parseInt(statusId), // Ensure statusId is a number
//       },
//     }));
//   };

//   const handleScheduleChange = (transactionId, key, value) => {
//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         [key]: value,
//       },
//     }));
//   };

//   const handleUpdateClick = (transactionId) => {
//     setSelectedTransactionId(transactionId); // Set the selected transaction ID
//     setIsConfirmationOpen(true); // Open the confirmation modal
//   };
//   const handleConfirmUpdate = () => {
//     setIsConfirmationOpen(false); // Close the modal
  
//     const updatedRecord = updateRecords[selectedTransactionId];
//     const amount = amountInputs[selectedTransactionId];
  
//     // Include the amount in the update payload if the status is "Pay-Requested"
//     if (updatedRecord?.currentStatus === 18 && amount) {
//       updatedRecord.Inv_Amount = amount;
//     }
  
//     onUpdateRecord(selectedTransactionId, updatedRecord || {}); // Call the update function
//   };
  
//   const handleCancelUpdate = () => {
//     setIsConfirmationOpen(false); // Close the modal without updating
//   };

//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
//   const startIndex = (currentPage - 1) * recordsPerPage;
//   const currentRecords = filteredRecords.slice(startIndex, startIndex + recordsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="px-6 pb-6">
//       <div className="shadow-sm w-full">
//         <div className="flex items-center gap-4 py-6 justify-between overflow-auto">
//           <h3 className="text-lg font-medium text-gray-900">Requests</h3>
//           <div className="flex ml-auto items-center space-x-5">
//             <select
//               value={selectedRm || ""}
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => handleTopRmChange(e.target.value)}
//             >
//               <option value="">Select RM</option>
//               {rmfm?.RMs?.map((item) => (
//                 <option key={item.user_id} value={item.user_id}>
//                   {item.user_name}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => onCityChange(e.target.value)}
//             >
//               <option value="">Select City</option>
//               {cities?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               // value={selectedCommunity || ""}
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => handleBuilderChange(e.target.value)}
//             >
//               <option value="">Select Builder</option>
//               {builders?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={selectedCommunity || ""}
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => handleCommunityChange(e.target.value)}
//             >
//               <option value="">Select Community</option>
//               {communities?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="w-full overflow-auto max-h-[calc(100vh-210px)] rounded-lg border">
//           {requestsLoading ? (
//             <div className="space-y-4">
//               {[...Array(6)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-14 w-full bg-gray-300 animate-pulse rounded"
//                 ></div>
//               ))}
//             </div>
//           ) : (
//             <table>
//               <thead className="sticky top-0 z-10">
//                 <tr className="border-b bg-gray-50">
//                   <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Request ID
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Community
//                   </th>
//                   <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Tenant Details
//                   </th>
//                   <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Owner Details
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     RM
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     FM
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Schedule
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentRecords.map((record) => (
//                   <tr key={record.transaction_id} className="hover:bg-gray-100">
//                     <td className="px-6 py-2 text-sm text-gray-900 text-center">
//                       {record.transaction_id}
//                     </td>
//                     <td className="px-6 py-2 text-sm text-gray-900">
//                       {record.community_name || "N/A"}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900">
//                         {record.tenant_name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {record.tenant_mobile}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900">
//                         {record.owner_name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {record.owner_mobile}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={
//                           updateRecords[record.transaction_id]?.currentStatus ||
//                           record.curr_stat_code_id
//                         }
//                         onChange={(e) =>
//                           handleStatusChange(record.transaction_id, e.target.value)
//                         }
//                         className="px-2 py-1 text-xs rounded border border-gray-300"
//                       >
//                         {status?.map((statusItem, index) => (
//                           <option key={`${statusItem.id}-${index}`} value={statusItem.id}>
//                             {statusItem.status_code}
//                           </option>
//                         ))}
//                       </select>
//                       {/* Render amount input if status is "Pay-Requested" */}
//                       {updateRecords[record.transaction_id]?.currentStatus === 18 && (
//                         <div className="mt-2">
//                           <input
//                             type="number"
//                             placeholder="Enter Amount"
//                             value={amountInputs[record.transaction_id] || ""}
//                             onChange={(e) =>
//                               handleAmountChange(record.transaction_id, e.target.value)
//                             }
//                             className="border text-sm rounded px-2 py-1 w-full"
//                           />
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={
//                           updateRecords[record.transaction_id]?.updatedRm ||
//                           record.rm_id
//                         }
//                         className="px-2 py-1 text-xs rounded border border-gray-300"
//                         onChange={(e) =>
//                           handleRmChange(record.transaction_id, e.target.value)
//                         }
//                       >
//                         {rmfm?.RMs?.map((rmItem) => (
//                           <option key={rmItem.user_id} value={rmItem.user_id}>
//                             {rmItem.user_name}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={
//                           updateRecords[record.transaction_id]?.updatedFm ||
//                           record.fm_id
//                         }
//                         className="px-2 py-1 text-xs rounded border border-gray-300"
//                         onChange={(e) =>
//                           handleFmChange(record.transaction_id, e.target.value)
//                         }
//                       >
//                         {rmfm?.FMs?.map((fmItem) => (
//                           <option key={fmItem.user_id} value={fmItem.user_id}>
//                             {fmItem.user_name}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-6 py-5 flex gap-1">
//                       <input
//                         type="date"
//                         defaultValue={record.schedule_date}
//                         onChange={(e) =>
//                           handleScheduleChange(
//                             record.transaction_id,
//                             "updatedScheduleDate",
//                             e.target.value
//                           )
//                         }
//                         className="border text-sm rounded px-2 py-1 w-full"
//                       />
//                       <input
//                         type="time"
//                         defaultValue={record.schedule_time}
//                         onChange={(e) =>
//                           handleScheduleChange(
//                             record.transaction_id,
//                             "updatedScheduleTime",
//                             e.target.value
//                           )
//                         }
//                         className="border text-sm rounded px-2 py-1 w-full"
//                       />
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <button
//                         className="text-green-600 hover:underline"
//                         onClick={() => handleUpdateClick(record.transaction_id)}
//                       >
//                         &#10004;
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {/* Pagination Section */}
//           <div className="flex justify-center mt-4 space-x-2">
//             <button
//               onClick={handlePreviousPage}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageClick(index + 1)}
//                 className={`px-3 py-2 rounded ${
//                   index + 1 === currentPage
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               onClick={handleNextPage}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       <ConfirmationCard
//       isOpen={isConfirmationOpen}
//       onClose={handleCancelUpdate}
//       onConfirm={handleConfirmUpdate}
//       message="Are you sure you want to update this record?"
//    />
//     </div>
//   );
// };

// export default AdminPanel;

//Previously used------
// import React, { useState } from "react";
// import ConfirmationCard from "./ConfirmationCard";

// const AdminPanel = ({
//   cities,
//   builders,
//   communities,
//   onCityChange,
//   onBuilderChange,
//   records,
//   status,
//   rmfm,
//   requestsLoading,
//   onUpdateRecord,
//   pagination,
//   onPageChange,
//   setSelectedRm, // Added for RM filter
//   setSelectedCommunity, // Added for community filter
// }) => {
//   const [updateRecords, setUpdateRecords] = useState({});
//   const [amountInputs, setAmountInputs] = useState({});
//   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
//   const [selectedTransactionId, setSelectedTransactionId] = useState(null);
//   const [selectedRmFilter, setSelectedRmFilter] = useState(""); // Local state for RM filter

//   const handleCommunityChange = (communityId) => {
//     setSelectedCommunity(communityId);
//     onPageChange(1); // Reset to page 1 on filter change
//   };

//   const handleBuilderChange = (builderId) => {
//     onBuilderChange(builderId);
//   };

//   const handleAmountChange = (transactionId, amount) => {
//     setAmountInputs((prev) => ({
//       ...prev,
//       [transactionId]: amount,
//     }));
//   };

//   const handleRmChange = (transactionId, rmId) => {
//     if (!rmId) return;
//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         updatedRm: rmId,
//       },
//     }));
//   };

//   // const handleTopRmChange = (rmId) => {
//   //   setSelectedRm(rmId);
//   //   onPageChange(1); // Reset to page 1 on filter change
//   // };

//   const handleTopRmChange = (rmId) => {
//     setSelectedRmFilter(rmId); // Update local state
//     setSelectedRm(rmId); // Update parent state
//     onPageChange(1); // Reset to page 1 on filter change
//   };

//   const handleFmChange = (transactionId, fmId) => {
//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         updatedFm: fmId,
//       },
//     }));
//   };

//   const handleStatusChange = (transactionId, statusId) => {
//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         currentStatus: parseInt(statusId),
//       },
//     }));
//   };

//   const handleScheduleChange = (transactionId, key, value) => {
//     setUpdateRecords((prev) => ({
//       ...prev,
//       [transactionId]: {
//         ...prev[transactionId],
//         [key]: value,
//       },
//     }));
//   };

//   const handleUpdateClick = (transactionId) => {
//     setSelectedTransactionId(transactionId);
//     setIsConfirmationOpen(true);
//   };

//   const handleConfirmUpdate = () => {
//     setIsConfirmationOpen(false);
//     const updatedRecord = updateRecords[selectedTransactionId];
//     const amount = amountInputs[selectedTransactionId];
//     if (updatedRecord?.currentStatus === 18 && amount) {
//       updatedRecord.Inv_Amount = amount;
//     }
//     onUpdateRecord(selectedTransactionId, updatedRecord || {});
//   };

//   const handleCancelUpdate = () => {
//     setIsConfirmationOpen(false);
//   };

//   const handleNextPage = () => {
//     if (pagination.currentPage < pagination.totalPages) {
//       onPageChange(pagination.currentPage + 1);
     
//     }
//   };

//   const handlePreviousPage = () => {
//     if (pagination.currentPage > 1) {
//       onPageChange(pagination.currentPage - 1);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     onPageChange(pageNumber);
//   };

//   return (
//     <div className="px-6 pb-6">
//       <div className="shadow-sm w-full">
//         <div className="flex items-center gap-4 py-6 justify-between overflow-auto">
//           <h3 className="text-lg font-medium text-gray-900">Requests</h3>
//           <div className="flex ml-auto items-center space-x-5">
//             <select
//              value={selectedRmFilter}
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => handleTopRmChange(e.target.value)}
//             >
//               <option value="">Select RM</option>
//               {rmfm?.RMs?.map((item) => (
//                 <option key={item.user_id} value={item.user_id}>
//                   {item.user_name}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => onCityChange(e.target.value)}
//             >
//               <option value="">Select City</option>
//               {cities?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => handleBuilderChange(e.target.value)}
//             >
//               <option value="">Select Builder</option>
//               {builders?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
//               onChange={(e) => handleCommunityChange(e.target.value)}
//             >
//               <option value="">Select Community</option>
//               {communities?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="w-full overflow-auto max-h-[calc(100vh-210px)] rounded-lg border">
//           {requestsLoading ? (
//             <div className="space-y-4">
//               {[...Array(6)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-14 w-full bg-gray-300 animate-pulse rounded"
//                 ></div>
//               ))}
//             </div>
//           ) : records.length === 0 ? (
//             <div className="text-gray-500 text-center p-4">
//               No records available
//             </div>
//           ) : (
//             <table>
//               <thead className="sticky top-0 z-10">
//                 <tr className="border-b bg-gray-50">
//                   <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Request ID
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Community
//                   </th>
//                   <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Tenant Details
//                   </th>
//                   <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Owner Details
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     RM
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     FM
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Schedule
//                   </th>
//                   <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {records.map((record) => (
//                   <tr key={record.transaction_id} className="hover:bg-gray-100">
//                     <td className="px-6 py-2 text-sm text-gray-900 text-center">
//                       {record.transaction_id}
//                     </td>
//                     <td className="px-6 py-2 text-sm text-gray-900">
//                       {record.community_name || "N/A"}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900">
//                         {record.tenant_name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {record.tenant_mobile}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900">
//                         {record.owner_name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {record.owner_mobile}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={
//                           updateRecords[record.transaction_id]?.currentStatus ||
//                           record.curr_stat_code_id
//                         }
//                         onChange={(e) =>
//                           handleStatusChange(record.transaction_id, e.target.value)
//                         }
//                         className="px-2 py-1 text-xs rounded border border-gray-300"
//                       >
//                         {status?.map((statusItem, index) => (
//                           <option key={`${statusItem.id}-${index}`} value={statusItem.id}>
//                             {statusItem.status_code}
//                           </option>
//                         ))}
//                       </select>
//                       {updateRecords[record.transaction_id]?.currentStatus === 18 && (
//                         <div className="mt-2">
//                           <input
//                             type="number"
//                             placeholder="Enter Amount"
//                             value={amountInputs[record.transaction_id] || ""}
//                             onChange={(e) =>
//                               handleAmountChange(record.transaction_id, e.target.value)
//                             }
//                             className="border text-sm rounded px-2 py-1 w-full"
//                           />
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={
//                           updateRecords[record.transaction_id]?.updatedRm ||
//                           record.rm_id
//                         }
//                         className="px-2 py-1 text-xs rounded border border-gray-300"
//                         onChange={(e) =>
//                           handleRmChange(record.transaction_id, e.target.value)
//                         }
//                       >
//                         {rmfm?.RMs?.map((rmItem) => (
//                           <option key={rmItem.user_id} value={rmItem.user_id}>
//                             {rmItem.user_name}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={
//                           updateRecords[record.transaction_id]?.updatedFm ||
//                           record.fm_id
//                         }
//                         className="px-2 py-1 text-xs rounded border border-gray-300"
//                         onChange={(e) =>
//                           handleFmChange(record.transaction_id, e.target.value)
//                         }
//                       >
//                         {rmfm?.FMs?.map((fmItem) => (
//                           <option key={fmItem.user_id} value={fmItem.user_id}>
//                             {fmItem.user_name}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-6 py-5 flex gap-1">
//                       <input
//                         type="date"
//                         defaultValue={record.schedule_date}
//                         onChange={(e) =>
//                           handleScheduleChange(
//                             record.transaction_id,
//                             "updatedScheduleDate",
//                             e.target.value
//                           )
//                         }
//                         className="border text-sm rounded px-2 py-1 w-full"
//                       />
//                       <input
//                         type="time"
//                         defaultValue={record.schedule_time}
//                         onChange={(e) =>
//                           handleScheduleChange(
//                             record.transaction_id,
//                             "updatedScheduleTime",
//                             e.target.value
//                           )
//                         }
//                         className="border text-sm rounded px-2 py-1 w-full"
//                       />
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <button
//                         className="text-green-600 hover:underline"
//                         onClick={() => handleUpdateClick(record.transaction_id)}
//                       >
//                         ✔
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {/* Pagination Section */}
//           <div className="flex justify-center mt-4 space-x-2">
//             <button
//               onClick={handlePreviousPage}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
//               disabled={pagination.currentPage === 1}
//             >
//               Previous
//             </button>
//             {[...Array(pagination.totalPages)].map((_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageClick(index + 1)}
//                 className={`px-3 py-2 rounded ${
//                   index + 1 === pagination.currentPage
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               onClick={handleNextPage}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
//               disabled={pagination.currentPage === pagination.totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       <ConfirmationCard
//         isOpen={isConfirmationOpen}
//         onClose={handleCancelUpdate}
//         onConfirm={handleConfirmUpdate}
//         message="Are you sure you want to update this record?"
//       />
//     </div>
//   );
// };

// export default AdminPanel;



import React, { useState } from "react";
import ConfirmationCard from "./ConfirmationCard";

const AdminPanel = ({
  cities,
  builders,
  communities,
  onCityChange,
  onBuilderChange,
  records,
  status,
  rmfm, // Added for RM filter dropdown
  comMapDetails, // For community mapping data
  requestsLoading,
  onUpdateRecord,
  pagination,
  onPageChange,
  setSelectedRm,
  setSelectedStatus,
  setSelectedCommunity,
}) => {
  const [updateRecords, setUpdateRecords] = useState({});
  const [amountInputs, setAmountInputs] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [selectedRmFilter, setSelectedRmFilter] = useState(""); // Local state for RM filter
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(""); // Local state for RM filter


  const handleCommunityChange = (communityId) => {
    setSelectedCommunity(communityId);
    onPageChange(1); // Reset to page 1 on filter change
  };

  const handleBuilderChange = (builderId) => {
    onBuilderChange(builderId);
  };

  const handleAmountChange = (transactionId, amount) => {
    setAmountInputs((prev) => ({
      ...prev,
      [transactionId]: amount,
    }));
  };

  const handleTopRmChange = (rmId) => {
    setSelectedRmFilter(rmId); // Update local state
    setSelectedRm(rmId); // Update parent state
    onPageChange(1); // Reset to page 1 on filter change
  };

  const handleTopStatusChange = (statusId) => {
    setSelectedStatusFilter(statusId); // Update local state
    setSelectedStatus(statusId); // Update parent state
    onPageChange(1); // Reset to page 1 on filter change
  };

  const handleStatusChange = (transactionId, statusId) => {
    setUpdateRecords((prev) => ({
      ...prev,
      [transactionId]: {
        ...prev[transactionId],
        currentStatus: parseInt(statusId),
      },
    }));
  };

  const handleScheduleChange = (transactionId, key, value) => {
    setUpdateRecords((prev) => ({
      ...prev,
      [transactionId]: {
        ...prev[transactionId],
        [key]: value,
      },
    }));
  };

  const handleUpdateClick = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setIsConfirmationOpen(true);
  };

  const handleConfirmUpdate = () => {
    setIsConfirmationOpen(false);
    const updatedRecord = updateRecords[selectedTransactionId];
    const amount = amountInputs[selectedTransactionId];
    if (updatedRecord?.currentStatus === 18 && amount) {
      updatedRecord.Inv_Amount = amount;
    }
    onUpdateRecord(selectedTransactionId, updatedRecord || {});
  };

  const handleCancelUpdate = () => {
    setIsConfirmationOpen(false);
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      onPageChange(pagination.currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      onPageChange(pagination.currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  // Helper function to get RM and FM names based on community_id
  const getRmFmForCommunity = (communityId) => {
    const mapping = comMapDetails.find((item) => item.community_id === communityId);
    return {
      rm_name: mapping ? mapping.rm_name : "N/A",
      fm_name: mapping ? mapping.fm_name : "N/A",
    };
  };

  return (
    <div className="px-6 pb-6">
      <div className="shadow-sm w-full">
        <div className="flex items-center gap-4 py-6 justify-between overflow-auto">
          <h3 className="text-lg font-medium text-gray-900">Requests</h3>
          <div className="flex ml-auto items-center space-x-5">
          <select
              value={selectedStatusFilter}
              className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
              onChange={(e) => handleTopStatusChange(e.target.value)}
            >
              <option value="">Select Status</option>
              {status?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.status_code}
                </option>
              ))}
            </select>
            <select
              value={selectedRmFilter}
              className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
              onChange={(e) => handleTopRmChange(e.target.value)}
            >
              <option value="">Select RM</option>
              {rmfm?.RMs?.map((item) => (
                <option key={item.user_id} value={item.user_id}>
                  {item.user_name}
                </option>
              ))}
            </select>
            <select
              className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
              onChange={(e) => onCityChange(e.target.value)}
            >
              <option value="">Select City</option>
              {cities?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
              onChange={(e) => handleBuilderChange(e.target.value)}
            >
              <option value="">Select Builder</option>
              {builders?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 border border-gray-300"
              onChange={(e) => handleCommunityChange(e.target.value)}
            >
              <option value="">Select Community</option>
              {communities?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full overflow-auto max-h-[calc(100vh-210px)] rounded-lg border">
          {requestsLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 w-full bg-gray-300 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="text-gray-500 text-center p-4">
              No records available
            </div>
          ) : (
            <table>
              <thead className="sticky top-0 z-10">
                <tr className="border-b bg-gray-50">
                  <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    Community
                  </th>
                  <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    Tenant Details
                  </th>
                  <th className="w-auto whitespace-nowrap px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    Owner Details
                  </th>
                  <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    RM
                  </th>
                  <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    FM
                  </th>
                  <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) => {
                  const { rm_name, fm_name } = getRmFmForCommunity(record.community_id);
                  return (
                    <tr key={record.transaction_id} className="hover:bg-gray-100">
                      <td className="px-6 py-2 text-sm text-gray-900 text-center">
                        {record.transaction_id}
                      </td>
                      <td className="px-6 py-2 text-sm text-gray-900">
                        {record.community_name || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {record.tenant_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.tenant_mobile}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {record.owner_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.owner_mobile}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={
                            updateRecords[record.transaction_id]?.currentStatus ||
                            record.curr_stat_code_id
                            // record.current_status


                          }
                          onChange={(e) =>
                            handleStatusChange(record.transaction_id, e.target.value)
                          }
                          className="px-2 py-1 text-xs rounded border border-gray-300"
                        >
                          {status?.map((statusItem, index) => (
                            <option key={`${statusItem.id}-${index}`} value={statusItem.id}>
                              {statusItem.status_code}
                            </option>
                          ))}
                        </select>
                        {updateRecords[record.transaction_id]?.currentStatus === 18 && (
                          <div className="mt-2">
                            <input
                              type="number"
                              placeholder="Enter Amount"
                              value={amountInputs[record.transaction_id] || ""}
                              onChange={(e) =>
                                handleAmountChange(record.transaction_id, e.target.value)
                              }
                              className="border text-sm rounded px-2 py-1 w-full"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-center">
                        {rm_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-center">
                        {fm_name}
                      </td>
                      <td className="px-6 py-5 flex gap-1">
                        <input
                          type="date"
                          defaultValue={record.schedule_date}
                          onChange={(e) =>
                            handleScheduleChange(
                              record.transaction_id,
                              "updatedScheduleDate",
                              e.target.value
                            )
                          }
                          className="border text-sm rounded px-2 py-1 w-full"
                        />
                        <input
                          type="time"
                          defaultValue={record.schedule_time}
                          onChange={(e) =>
                            handleScheduleChange(
                              record.transaction_id,
                              "updatedScheduleTime",
                              e.target.value
                            )
                          }
                          className="border text-sm rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="text-green-600 hover:underline"
                          onClick={() => handleUpdateClick(record.transaction_id)}
                        >
                          ✔
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {/* Pagination Section */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={handlePreviousPage}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
              disabled={pagination.currentPage === 1}
            >
              Previous
            </button>
            {[...Array(pagination.totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`px-3 py-2 rounded ${
                  index + 1 === pagination.currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ConfirmationCard
        isOpen={isConfirmationOpen}
        onClose={handleCancelUpdate}
        onConfirm={handleConfirmUpdate}
        message="Are you sure you want to update this record?"
      />
    </div>
  );
};

export default AdminPanel;