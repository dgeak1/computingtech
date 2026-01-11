// Dynamic Greeting based on time
document.addEventListener('DOMContentLoaded', () => {
        const hour = new Date().getHours();
        let greeting;

        if (hour < 12) greeting = "Good Morning, Scholar!";
        else if (hour < 18) greeting = "Good Afternoon, Scholar!";
        else greeting = "Good Evening, Scholar!";

        console.log(`${greeting} Welcome to the Faculty Portal.`);

        // Dark mode toggle logic
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
                function setDarkMode(enabled) {
                        if (enabled) {
                                document.body.classList.add('dark-mode');
                                toggleBtn.textContent = '☀️ Light Mode';
                        } else {
                                document.body.classList.remove('dark-mode');
                                toggleBtn.textContent = '🌙 Dark Mode';
                        }
                }
                // Load preference
                const darkPref = localStorage.getItem('darkMode') === 'true';
                setDarkMode(darkPref);
                toggleBtn.addEventListener('click', () => {
                        const isDark = !document.body.classList.contains('dark-mode');
                        setDarkMode(isDark);
                        localStorage.setItem('darkMode', isDark);
                });
        }

        // 3D Animation Modal for Equity Crew Members
        const equityCrewBox = document.getElementById('equity-crew-box');
        const crewModal = document.getElementById('equity-crew-modal');
        const crew3d = document.getElementById('crew-3d-animation');
        const crewPrev = document.getElementById('crew-prev');
        const crewNext = document.getElementById('crew-next');
        const crewClose = document.getElementById('close-crew-modal');

        // Equity Crew Members Data (President to PRO)
        const crewMembers = [
            { role: 'President', name: 'Jane Doe', spec: 'Leads the team, oversees all activities, and represents the crew.' },
            { role: 'Vice President', name: 'Michael Lee', spec: 'Assists the President and coordinates departmental activities.' },
            { role: 'General Secretary', name: 'John Smith', spec: 'Handles documentation, correspondence, and meeting records.' },
            { role: 'Assistant General Secretary', name: 'Sarah Kim', spec: 'Supports the Secretary and manages logistics.' },
            { role: 'Financial Secretary', name: 'Mary Johnson', spec: 'Manages finances, dues, and budgeting.' },
            { role: 'Treasurer', name: 'David Brown', spec: 'Keeps financial records and handles cash flow.' },
            { role: 'Public Relations Officer (PRO)', name: 'Ahmed Musa', spec: 'Handles publicity, announcements, and external relations.' }
        ];
        let crewIndex = 0;

        function renderCrew3D(index, animate = true) {
            const member = crewMembers[index];
            crew3d.innerHTML = `
                <div class="crew-3d-card-face" style="width:220px;height:220px;background:linear-gradient(135deg,#22c55e 60%,#4ade80 100%);border-radius:18px;box-shadow:0 4px 24px rgba(34,197,94,0.18);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotateY(0deg);transition:transform 0.7s cubic-bezier(.25,.8,.25,1);">
                    <div style="font-size:2.2em;font-weight:900;color:#fff;text-shadow:0 2px 8px #17643a77;">${member.role}</div>
                    <div style="font-size:1.3em;font-weight:700;color:#fff;margin:12px 0 6px 0;">${member.name}</div>
                    <div style="font-size:1em;color:#e6ffe6;text-align:center;max-width:180px;">${member.spec}</div>
                </div>
            `;
            if (animate) {
                crew3d.style.transform = 'rotateY(360deg)';
                setTimeout(() => { crew3d.style.transform = 'rotateY(0deg)'; }, 100);
            }
        }

        if (equityCrewBox) {
            equityCrewBox.addEventListener('click', () => {
                crewModal.style.display = 'flex';
                renderCrew3D(crewIndex, false);
            });
        }
        if (crewClose) {
            crewClose.addEventListener('click', () => {
                crewModal.style.display = 'none';
            });
        }
        if (crewPrev) {
            crewPrev.addEventListener('click', () => {
                crewIndex = (crewIndex - 1 + crewMembers.length) % crewMembers.length;
                renderCrew3D(crewIndex);
            });
        }
        if (crewNext) {
            crewNext.addEventListener('click', () => {
                crewIndex = (crewIndex + 1) % crewMembers.length;
                renderCrew3D(crewIndex);
            });
        }
        // Close modal on outside click
        if (crewModal) {
            crewModal.addEventListener('click', (e) => {
                if (e.target === crewModal) crewModal.style.display = 'none';
            });
        }
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                });
        });
});