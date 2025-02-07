import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, "customers"); // Path to customers in Firebase
    
        onValue(dbRef, (snapshot) => {
          const firebaseData = snapshot.val();
          if (firebaseData) {
            // Convert Firebase object to an array & flatten it
            const formattedData = Object.keys(firebaseData).map((key, index) => ({
              id: index + 1,
              customerName: firebaseData[key].customerName || "",
              mobileNumber: firebaseData[key].mobileNumber || "",
              cardNumber: firebaseData[key].cardNumber || "",
              address: firebaseData[key].address || "",
              locationArea: firebaseData[key].locationArea || "",
              googleMapsLink: firebaseData[key].location?.googleMapsLink || "",
              latitude: firebaseData[key].location?.latitude || "",
              longitude: firebaseData[key].location?.longitude || "",
              createdBy: firebaseData[key].createdBy || "",
              createdAt: firebaseData[key].createdAt || "",
            }));
    
            setData(formattedData);
          }
        });
      }, []);
    
      const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    
        // Convert to binary and trigger download
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const excelFile = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    
        saveAs(excelFile, "Customers.xlsx");
      };
  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  )
}

export default ExportToExcel
