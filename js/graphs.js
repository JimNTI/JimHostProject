    function loadMonthlyChart() {
        const ctx = document.getElementById('monthChart');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 31 }, (_, i) => i + 1),
                datasets: [{
                    label: 'Data per Day',
                    data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)),
                    borderColor: '#0d6efd',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    pointBackgroundColor: '#0d6efd',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {display: false}
                },
                scales: {
                    x: { title: { display: true, text: 'Day' } },
                    y: { title: { display: true, text: 'Value' } }
                }
            }
        });
    }

    
    function loadDailyCharts() {
        const container = document.getElementById("dailyChartsContainer");

        for (let day = 1; day <= 31; day++) {
            // Add card for each day's mini chart
            container.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                    <div class="card p-2">
                        <small class="text-muted">Day ${day}</small>
                        <canvas id="dayChart${day}" class="day-chart"></canvas>
                    </div>
                </div>
            `;
        }

        // Render each mini chart
        for (let day = 1; day <= 31; day++) {
            const ctx = document.getElementById(`dayChart${day}`);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 24 }, (_, i) => i + 1),
                datasets: [{
                    data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)),
                    borderColor: '#0d6efd',
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: true,
                    tension: 0.3,
                    backgroundColor: 'rgba(13, 110, 253, 0.2)'
                }]
            },
            options: {
                responsive: true,
                    plugins: {
                        legend: {display: false}
                    },
                    scales: {
                    x: { 
                        display: false,
                        grid: {display: false}},
                    y: { 
                        display: false,
                        grid: {display: false}
                    }}

            }
        });
        }
    }

    // Load charts
    loadMonthlyChart();
    loadDailyCharts();