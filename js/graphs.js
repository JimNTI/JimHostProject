let showFullGraph = false;


const TOTAL_DAYS = 31;
const TOTAL_HOURS = 24;

const hourlyData = Array.from({ length: TOTAL_DAYS }, () =>
    Array.from({ length: TOTAL_HOURS }, () =>
        Math.floor(Math.random() * 100000)
    )
);

const dailySum = hourlyData.map(dayHours =>
    dayHours.reduce((sum, v) => sum + v, 0)
);




function loadMonthlyChart() {
    const ctx = document.getElementById('monthChart');

    monthlyGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 31 }, (_, i) => i + 1),
            datasets: [{
                label: 'Data per Day',
                data: dailySum,
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
                legend: { display: false }
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
                        <small class="text-muted">Day ${day} - ${dailySum[day - 1]}</small>
                        <canvas id="dayChart${day}" class="day-chart"></canvas>
                    </div>
                </div>
            `;
    }

    // Render each mini chart
    for (let day = 0; day < TOTAL_DAYS; day++) {
        const ctx = document.getElementById(`dayChart${day + 1}`);

        allDaysChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: TOTAL_HOURS }, (_, i) => i + 1),
                datasets: [{
                    data: hourlyData[day],
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
                    legend: { display: false }
                },
                scales: {
                    x: {
                        display: false,
                        grid: { display: false }
                    },
                    y: {
                        display: false,
                        grid: { display: false }
                    }
                }

            }
        });

    }
}

function toggleView() {
    const monthlyCanvas = document.getElementById("fullGraphSection")
    const dailyContainer = document.getElementById("allDaysSection")

    showFullGraph = !showFullGraph;

    monthlyCanvas.classList.toggle("d-none", showFullGraph);
    dailyContainer.classList.toggle("d-none", !showFullGraph);
}



// Load charts
loadMonthlyChart();
loadDailyCharts();

document.getElementById("toggleView").addEventListener("click", toggleView);

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.backgroundColor = '#c7d5e0';
    });
    card.addEventListener('mouseleave', () => {
        card.style.backgroundColor = '';
    });
});

document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});



