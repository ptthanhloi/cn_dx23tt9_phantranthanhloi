/**
 * Dashboard Charts & Statistics - Chart.js Integration
 */

// Color palette
const COLORS = {
    primary: '#6366f1',
    primaryLight: '#818cf8',
    success: '#10b981',
    successLight: '#34d399',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    purple: '#a855f7',
    pink: '#ec4899',
    palette: [
        '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4',
        '#a855f7', '#ec4899', '#f97316', '#14b8a6', '#8b5cf6'
    ]
};

/**
 * Initialize Revenue Line/Bar Chart
 */
function initRevenueChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !data) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.date),
            datasets: [{
                label: 'Doanh thu (VNĐ)',
                data: data.map(d => d.revenue),
                backgroundColor: data.map((_, i) =>
                    `rgba(99, 102, 241, ${0.4 + (i / data.length) * 0.6})`
                ),
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { family: 'Inter', size: 13 },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => formatVND(ctx.raw)
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 12, weight: 500 } }
                },
                y: {
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        callback: (val) => formatVNDShort(val)
                    }
                }
            }
        }
    });
}

/**
 * Initialize Room Distribution Doughnut Chart
 */
function initRoomChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !data) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.name),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: COLORS.palette.slice(0, data.length),
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { family: 'Inter', size: 12, weight: 500 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { family: 'Inter', size: 13 },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                }
            }
        }
    });
}

/**
 * Initialize Statistics Chart (for statistics page)
 */
function initStatisticsChart(canvasId, data, criteria) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !data || data.length === 0) return;

    const chartType = criteria === 'time' ? 'line' : 'bar';

    const datasets = [{
        label: 'Doanh thu phòng',
        data: data.map(d => d.room_revenue || 0),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: chartType === 'bar' ? 6 : 0,
        tension: 0.3,
        fill: chartType === 'line',
    }];

    if (criteria !== 'time') {
        datasets.push({
            label: 'Doanh thu DV',
            data: data.map(d => d.service_revenue || 0),
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderColor: COLORS.success,
            borderWidth: 2,
            borderRadius: chartType === 'bar' ? 6 : 0,
            tension: 0.3,
            fill: chartType === 'line',
        });
    } else {
        datasets[0].label = 'Tổng doanh thu';
        datasets[0].data = data.map(d => d.total_revenue || 0);
        datasets[0].backgroundColor = 'rgba(99, 102, 241, 0.1)';
    }

    new Chart(ctx, {
        type: chartType,
        data: {
            labels: data.map(d => d.label),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        font: { family: 'Inter', size: 12, weight: 500 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { family: 'Inter', size: 13 },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${formatVND(ctx.raw)}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 12 } }
                },
                y: {
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        callback: (val) => formatVNDShort(val)
                    }
                }
            }
        }
    });
}

/**
 * Format VND currency
 */
function formatVND(value) {
    if (!value && value !== 0) return '0 VNĐ';
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
}

function formatVNDShort(value) {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
    return value.toString();
}

/**
 * Mobile sidebar toggle
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// Close sidebar on overlay click
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
});

/**
 * Statistics page filter handling
 */
function handlePeriodChange(select) {
    const customFields = document.getElementById('customDateFields');
    if (customFields) {
        customFields.style.display = select.value === 'custom' ? 'flex' : 'none';
    }
}

/**
 * Confirm delete action
 */
function confirmDelete(formId, itemName) {
    if (confirm(`Bạn có chắc chắn muốn xóa "${itemName}"?`)) {
        document.getElementById(formId).submit();
    }
}
