// Cambiar pestañas
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        tabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

// Registro de clics
let clickCounts = {
    "Botón Azul": 0,
    "Botón Verde": 0,
    "Botón Naranja": 0,
    "Botón Rosa": 0,
    "Botón Morado": 0
};

let totalClicks = 0;

const logList = document.getElementById("logList");
const totalClicksSpan = document.getElementById("totalClicks");

// Gráfica
const canvas = document.getElementById("clickChart");
const ctx = canvas.getContext("2d");

function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let values = Object.values(clickCounts);
    let labels = Object.keys(clickCounts);

    let barWidth = 60;
    let spacing = 30;
    let x = 20;

    ctx.font = "14px Arial";

    values.forEach((value, index) => {
        let barHeight = value * 10; 
        
        ctx.fillStyle = "#457b9d";
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        ctx.fillStyle = "black";
        ctx.fillText(labels[index], x, canvas.height - barHeight - 10);

        x += barWidth + spacing;
    });
}

// Botones
document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let name = btn.dataset.btn;

        clickCounts[name]++;
        totalClicks++;

        totalClicksSpan.textContent = totalClicks;

        let li = document.createElement("li");
        li.textContent = `${name} fue presionado. Total: ${clickCounts[name]}`;
        logList.appendChild(li);

        drawChart();
    });
});

drawChart();
