const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

marqueeContent.addEventListener('mouseover', function() {
    marqueeContent.style.animationPlayState = 'paused';
});

marqueeContent.addEventListener('mouseout', function() {
    marqueeContent.style.animationPlayState = 'running';
});

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}


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

//Use CORS to get the total a elements from a remote URL and display it on the element with the id "html"
//HTML
// fetch('https://knowledge.trap.lol/category/cs/programming/html/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('html').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // CSS
// fetch('https://knowledge.trap.lol/category/cs/programming/css/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('css').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // JavaScript
// fetch('https://knowledge.trap.lol/category/cs/programming/javascsript/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('js').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // c++
// fetch('https://knowledge.trap.lol/category/cs/programming/cpp-programming/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('cpp').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // Python
// fetch('https://knowledge.trap.lol/category/cs/programming/python/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('python').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // SQL
// fetch('https://knowledge.trap.lol/category/cs/programming/sql/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('sql').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // rust
// fetch('https://knowledge.trap.lol/category/cs/programming/rust/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('rust').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // php
// fetch('https://knowledge.trap.lol/category/cs/programming/php/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('php').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // wordpress
// fetch('https://knowledge.trap.lol/category/cs/programming/wordpress/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('wp').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // docker
// fetch('https://knowledge.trap.lol/category/cs/programming/docker/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('docker').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // windows
// fetch('https://knowledge.trap.lol/category/cs/os/windows/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('windows').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // linux
// fetch('https://knowledge.trap.lol/category/cs/os/unix/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('linux').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // shopify
// fetch('https://knowledge.trap.lol/category/cs/programming/shopify/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('shopify').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     });
// // git
// fetch('https://knowledge.trap.lol/category/cs/programming/git/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const aElements = doc.querySelectorAll('.icon-book');
//         document.getElementById('git').textContent = aElements.length;
//     })
//     .catch(error => {
//         console.error('Error fetching or parsing HTML:', error);
//     }); 