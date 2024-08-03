const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}


document.addEventListener('DOMContentLoaded', function() {
    // Fetch the webdev.html content
    fetch('../projects/webdev.html')
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
fetch('../projects/software.html')
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
    fetch('../projects/other.html')
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