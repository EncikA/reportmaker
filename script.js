// Function to reformat date from dd/mm/yyyy to dd-mm-yyyy for internal use
function formatDateForOutput(inputDate) {
    const dateParts = inputDate.split('/'); // Split the date into parts
    if (dateParts.length === 3) {
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        return `${year}-${month}-${day}`; // Reformat to yyyy-mm-dd for internal use
    }
    return inputDate; // Return the original date if formatting fails
}

// Script to handle form submission and generate output dynamically
document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from resetting

    // Collect form data
    const formData = {
        programName ```javascript
: document.getElementById('programName').value,
        date: document.getElementById('date').value, // Keep the date as dd/mm/yyyy
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        targetAudience: document.getElementById('targetAudience').value,
        objectives: document.getElementById('objectives').value,
        activities: document.getElementById('activities').value,
        strengths: document.getElementById('strengths').value,
        weaknesses: document.getElementById('weaknesses').value,
        preparedBy: document.getElementById('preparedBy').value,
        position: document.getElementById('position').value
    };

    // Handle image uploads
    const imageFiles = Array.from(document.getElementById('images').files);
    const imagePreviews = imageFiles.slice(0, 4).map(file => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = function (e) {
                resolve(`<img src="${e.target.result}" alt="${file.name}">`);
            };
            reader.readAsDataURL(file);
        });
    });

    // Wait for all images to load
    Promise.all(imagePreviews).then(images => {
        // Generate output HTML
        const outputHTML = `
            <h2>Generated Report</h2>
            <p><strong>Nama Program/Aktiviti:</strong> ${formData.programName}</p>
            <p><strong>Tarikh:</strong> ${formData.date}</p>
            <p><strong>Masa:</strong> ${formData.time}</p>
            <p><strong>Tempat:</strong> ${formData.location}</p>
            <p><strong>Sasaran:</strong> ${formData.targetAudience}</p>
            <p><strong>Objektif:</strong> ${formData.objectives}</p>
            <p><strong>Aktiviti:</strong> ${formData.activities}</p>
            <p><strong>Kekuatan:</strong> ${formData.strengths}</p>
            <p><strong>Kelemahan:</strong> ${formData.weaknesses}</p>
            <p><strong>Gambar:</strong></p>
            <div class="image-grid">${images.join('')}</div>
            <p><strong>Disediakan oleh:</strong> ${formData.preparedBy}</p>
            <p><strong>Jawatan:</strong> ${formData.position}</p>
        `;

        // Display output
        document.getElementById('output').innerHTML = outputHTML;

        // Show the "Download PDF" button
        document.getElementById('downloadPdfBtn').style.display = 'block';
    });
});

// Add functionality to download the report as a PDF
document.getElementById('downloadPdfBtn').addEventListener('click', function () {
    const element = document.getElementById('output');
    const progress = document.getElementById('progress');
    
    // Show progress message
    progress.style.display = 'block';

    // Options for the PDF generation
    const options = {
        margin: 10,
        filename: 'OnePageReport.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf().set(options).from(element).save().then(() => {
        // Hide progress message after PDF generation
        progress.style.display = 'none';
    }).catch(err => {
        console.error('Error generating PDF:', err);
        progress.style.display = 'none'; // Hide progress on error
    });
});
