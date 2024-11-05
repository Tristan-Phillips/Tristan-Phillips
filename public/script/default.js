const root = document.documentElement;

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the webdev.html content
    fetch('../projects/webdev/index.html')
        .then(response => response.text())
        .then(html => {
            // Parse the HTML string into a document object
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Count elements with the .project class
            const projectCount = doc.querySelectorAll('.project').length;
            
            // Display the count in a <p> element on index.html
            const displayElement = document.getElementById('webdev-project-count');
            if (!displayElement) {
                console.error('Display element not found');
                return;
            }
            displayElement.textContent = `${projectCount} projects`;
        })
        .catch(error => {
            console.error('Error fetching or parsing frontend.html:', error);
        });
});

document.addEventListener('DOMContentLoaded', function() {
// Fetch the software.html content
fetch('../projects/software/index.html')
    .then(response => response.text())
    .then(html => {
        // Parse the HTML string into a document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Count elements with the .project class
        const projectCount = doc.querySelectorAll('.project').length;
        
        // Display the count in a <p> element on index.html
        const displayElement = document.getElementById('software-project-count');
        if (!displayElement) {
            console.error('Display element not found');
            return;
        }
        displayElement.textContent = `${projectCount} projects`;
    })
    .catch(error => {
        console.error('Error fetching or parsing backend.html:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the frontend.html content
    fetch('../projects/other/index.html')
        .then(response => response.text())
        .then(html => {
            // Parse the HTML string into a document object
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Count elements with the .project class
            const projectCount = doc.querySelectorAll('.project').length;
            
            // Display the count in a <p> element on index.html
            const displayElement = document.getElementById('other-project-count');
            if (!displayElement) {
                console.error('Display element not found');
                return;
            }
            displayElement.textContent = `${projectCount} projects`;
        })
        .catch(error => {
            console.error('Error fetching or parsing other.html:', error);
        });
    }
);

const headerImg = document.querySelector("header img");

if (headerImg) {
    document.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const imgRect = headerImg.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2;
        const imgCenterY = imgRect.top + imgRect.height / 2;
        
        const tiltX = (mouseX - imgCenterX) / (imgRect.width / 2);
        const tiltY = (mouseY - imgCenterY) / (imgRect.height / 2);
        const maxTilt = 3; // Set the maximum tilt value
        
        const clampedTiltX = Math.max(Math.min(tiltX, maxTilt), -maxTilt); // Clamp the tiltX value
        const clampedTiltY = Math.max(Math.min(tiltY, maxTilt), -maxTilt); // Clamp the tiltY value
        headerImg.style.transform = `rotateX(${clampedTiltY * maxTilt}deg) rotateY(${-clampedTiltX * maxTilt}deg)`;
    });
}