// Load Navbar
// fetch('navbar.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('navbar-placeholder').innerHTML = data;

//         // Highlight active link
//         const currentPage = window.location.pathname.split("/").pop() || "index.html";
//         const navLinks = document.querySelectorAll('.nav-link');
//         navLinks.forEach(link => {
//             if (link.getAttribute('href') === currentPage) {
//                 link.classList.add('active');
//             }
//         });
//     })
//     .catch(error => console.error('Error loading navbar:', error));


    // Load Navbar
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;

        // Highlight active link
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // NAV TOGGLE FUNCTIONALITY (runs after navbar is loaded)
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu on link click
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }

    })
    .catch(error => console.error('Error loading navbar:', error));
    


// Load footer component
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = data;
        }
    })
    .catch(error => console.error('Error loading footer:', error));