function updateDateTime() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  const formattedDateTime = `Date: ${month}/${day}/${year} -- Time: ${hours}:${minutes}:${seconds}`;
  document.getElementById('datetime').textContent = formattedDateTime;
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get the table data
  const table = document.querySelector('#data-table');
  const rows = table.querySelectorAll('tr');

  // Column widths
  const colWidths = [30, 30, 30, 80]; // Adjust width of "Line of the Day" column (index 3) to be larger

  let y = 10;

  rows.forEach((row, index) => {
    const cols = row.querySelectorAll('td, th');
    let x = 10;

    cols.forEach((col, i) => {
      const text = col.innerText.trim();

      // If it's the "Line of the Day" column, we split the text to fit within the column width
      if (i === 3) {
        // Wrap the text in the "Line of the Day" column
        const wrappedText = doc.splitTextToSize(text, colWidths[i]);

        // Write the wrapped text in the PDF
        wrappedText.forEach((line, lineIndex) => {
          doc.text(line, x, y + (lineIndex * 6));  // Add spacing for each line
        });
        
        y += (wrappedText.length * 6); // Adjust y position based on the number of lines
      } else {
        // For other columns, simply add the text
        doc.text(text, x, y);
      }

      // Move x position for next column
      x += colWidths[i] + 5; // Add padding between columns
    });

    y += 10; // Move y position to the next row

    // Check if the y position is near the bottom of the page and add a new page if necessary
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  // Save the PDF
  doc.save('Daily_Journal_Report.pdf');
}

// Add event listener to the "Generate PDF" button
document.getElementById('generate-pdf').addEventListener('click', generatePDF);

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initialize with the current date and time
updateDateTime();
