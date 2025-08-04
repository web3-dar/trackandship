const trackingId = localStorage.getItem("trackingId");

// Replace with your JSONBin bin ID and secret key
const BIN_URL = "https://api.jsonbin.io/v3/b/67f3bd3c8a456b7966841134/latest";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB."; // Optional if bin is public

if (!trackingId) {
  document.getElementById("shipmentDetails").textContent = "No tracking ID provided.";
} else {
  fetch(BIN_URL, {
    headers: {
      "X-Master-Key": API_KEY // Only needed for private bins
    }
  })
    .then(response => response.json())
    .then(responseData => {
      const data = responseData.record; // JSONBin returns your data inside `.record`
      const packageData = data.find(item => item.trackingId === trackingId);

      if (packageData) {
        const { sender, receiver, shipment, history } = packageData;

        const shipmentHistory = history.map(entry => `
          <tr class="history-row">
            <td class="history-data date">${entry.date}</td>
            <td class="history-data time">${entry.time}</td>
            <td class="history-data location">${entry.location}</td>
            <td class="history-data status">${entry.status}</td>
            <td class="history-data updated-name">${entry.updatedBy}</td>
            <td class="history-data remarks">${entry.remarks}</td>
          </tr>
        `).join("");

        document.getElementById("shipmentDetails").innerHTML = `
          <div id="shipper-info" class="wpcargo-row">
            <div class="wpcargo-col-md-6 detail-section">
              <p class="header-title"><strong>Sender Information</strong></p>
              <p class="shipper details">
                <span>${sender.name}</span><br>
                ${sender.location} <br>
                ☎️ ${sender.contact}<br>
              </p>
            </div>
            <div class="wpcargo-col-md-6 detail-section">
              <p class="header-title"><strong>Receiver Information</strong></p>
              <p class="receiver details">
                ${receiver.name}<br>
                ${receiver.address}<br>
                ☎️ ${receiver.contact}<br>
              </p>
            </div>
          </div>

          <div id="shipment-status" class="wpcargo-row"
            style="display: flex; justify-content: center; align-items: center; text-transform: uppercase; background-color: #4D148C; color: #fff; height: 80px; padding: 5px;">
            <p style="margin: 0;"><strong>Shipment Status:</strong> ${shipment.status}</p>
          </div>

          <br><br>
          <p class="header-title"><strong>Shipment Information</strong></p>
          <div id="shipment-info" class="wpcargo-row detail-section" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: left;">
            <div>
              <p><strong>Origin:</strong><br>${shipment.origin}</p>
              <p><strong>Destination:</strong><br>${shipment.destination}</p>
              <p><strong>Weight:</strong><br>${shipment.weight}</p>
              <p><strong>Product:</strong><br>${shipment.product}</p>
              <p><strong>Total Freight:</strong><br>${shipment.freight || "Standard"}</p>
              <p><strong>Pick-up Date:</strong><br>${shipment.pickupDate}</p>
              <p><strong>Comments:</strong><br>${shipment.comments || "N/A"}</p>
            </div>
            <div>
              <p><strong>Package:</strong><br>${shipment.package || "Package"}</p>
              <p><strong>Carrier:</strong><br>${shipment.carrier}</p>
              <p><strong>Shipment Mode:</strong><br>${shipment.mode}</p>
              <p><strong>Qty:</strong><br>${shipment.qty}</p>
              <p><strong>Expected Delivery Date:</strong><br>${shipment.deliveryDate}</p>
              <p><strong>Pick-up Time:</strong><br>${shipment.pickupTime}</p>
            </div>
            <div>
              <p><strong>Status:</strong><br>${shipment.status}</p>
              <p><strong>Type of Shipment:</strong><br>${shipment.type}</p>
              <p><strong>Carrier Reference No.:</strong><br>${shipment.referenceNo || "N/A"}</p>
              <p><strong>Payment Mode:</strong><br>${shipment.paymentMode}</p>
              <p><strong>Expected Delivery Time:</strong><br>${shipment.deliveryTime}</p>
            </div>
          </div>

          <div id="wpcargo-history-section" class="wpcargo-history-details">
           
            <table id="shipment-history" class="table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #4D148C;">
                  <th style="color: white; padding: 8px; text-align: left; border: 1px solid white;">Date</th>
                  <th style="color: white; padding: 8px; text-align: left; border: 1px solid white;">Time</th>
                  <th style="color: white; padding: 8px; text-align: left; border: 1px solid white;">Location</th>
                  <th style="color: white; padding: 8px; text-align: left; border: 1px solid white;">Status</th>
                  <th style="color: white; padding: 8px; text-align: left; border: 1px solid white;">Updated By</th>
                  <th style="color: white; padding: 8px; text-align: left; border: 1px solid white;">Remarks</th>
                </tr>
              </thead>
              <tbody>${shipmentHistory}</tbody>
            </table>
          </div>
        `;
      } else {
        document.getElementById("shipmentDetails").textContent = "Tracking ID not found.";
      }
    })
    .catch(error => {
      console.error("Error loading shipment data:", error);
      document.getElementById("shipmentDetails").textContent = "Error loading data.";
    });
}
