const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}


document.addEventListener('DOMContentLoaded', function() {
    // Fetch the frontend.html content
    fetch('../projects/frontend.html')
        .then(response => response.text())
        .then(html => {
            // Parse the HTML string into a document object
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Count elements with the .project class
            const projectCount = doc.querySelectorAll('.project').length;
            
            // Display the count in a <p> element on index.html
            const displayElement = document.getElementById('frontend-project-count');
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
// Fetch the frontend.html content
fetch('../projects/backend.html')
    .then(response => response.text())
    .then(html => {
        // Parse the HTML string into a document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Count elements with the .project class
        const projectCount = doc.querySelectorAll('.project').length;
        
        // Display the count in a <p> element on index.html
        const displayElement = document.getElementById('backend-project-count');
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
    // Fetch the frontend.html content
    fetch('../projects/scripts.html')
        .then(response => response.text())
        .then(html => {
            // Parse the HTML string into a document object
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Count elements with the .project class
            const projectCount = doc.querySelectorAll('.project').length;
            
            // Display the count in a <p> element on index.html
            const displayElement = document.getElementById('script-project-count');
            if (!displayElement) {
                console.error('Display element not found');
                return;
            }
            displayElement.textContent = `${projectCount} projects`;
        })
        .catch(error => {
            console.error('Error fetching or parsing frontend.html:', error);
        });
    }
);