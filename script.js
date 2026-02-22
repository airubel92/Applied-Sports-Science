// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Fetch data from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderCharts(data);
            updateSummary(data.summary_statistics);
        })
        .catch(error => console.error('Error loading data:', error));

    // Function to render all charts
    function renderCharts(data) {
        const ctx = document.getElementById('injuryChart').getContext('2d');
        
        // Extracting labels and values from JSON
        const days = data.time_series_data.map(item => item.day);
        const fatigue = data.time_series_data.map(item => item.fatigue_index);
        const risk = data.time_series_data.map(item => item.injury_risk);

        // --- Multi-Axis Line Chart: Fatigue vs Injury Risk ---
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Fatigue Index',
                        data: fatigue,
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Injury Risk',
                        data: risk,
                        borderColor: '#ff4d4d',
                        backgroundColor: 'transparent',
                        borderWidth: 3,
                        borderDash: [5, 5], // Dashed line for prediction
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: 'white', font: { family: 'Poppins' } }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'white' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'white' }
                    }
                }
            }
        });
    }

    // Function to dynamically update statistics on the page
    function updateSummary(stats) {
        // This function can be used to update any text elements if needed
        console.log("Summary Stats Loaded:", stats);
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});