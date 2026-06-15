// Controls screen switches smoothly
function nextPage(pageId) {
    const activeCard = document.querySelector('.card.active');
    if (activeCard) {
        activeCard.classList.remove('active');
    }

    const nextCard = document.getElementById(pageId);
    if (nextCard) {
        nextCard.classList.add('active');
    }

    // Initialize Canvas engine if the canvas frame goes live
    if (pageId === 'page-canvas') {
        startHeartCanvas();
    }
}

// Moves target buttons randomly away when cursor approaches or touches on mobile
function moveButton(btn) {
    const container = btn.closest('.card');
    const containerBound = container.getBoundingClientRect();
    const btnBound = btn.getBoundingClientRect();

    // Bound calculation window limits
    const maxLeft = containerBound.width - btnBound.width - 24;
    const maxTop = containerBound.height - btnBound.height - 40;

    const targetX = Math.max(12, Math.floor(Math.random() * maxLeft));
    const targetY = Math.max(70, Math.floor(Math.random() * maxTop));

    btn.style.left = targetX + "px";
    btn.style.top = targetY + "px";
}

// Custom hand coming out of screen visual triggers
function triggerHandSlap() {
    const box = document.getElementById('drawingBox');
    box.classList.add('slap-animation');
    
    // Switch to target question frame right after the animation pop completes
    setTimeout(() => {
        box.classList.remove('slap-animation');
        nextPage('page-final');
    }, 550);
}

// Modal popups handler actions
function showModal() {
    document.getElementById('popup-modal').style.display = 'flex';
}

function forceYes() {
    document.getElementById('popup-modal').style.display = 'none';
    nextPage('page-success');
}

function handleFakeLink() {
    alert("Nice try! But you really have to pick the big green button this time. 😉");
}


/* --- HTML5 Canvas Heart Generator Engine --- */
let canvas, ctx, loopTrackerId;
let pointMatrix = [];
let matrixIndex = 0;
let speedControl;

function startHeartCanvas() {
    canvas = document.getElementById('heartCanvas');
    ctx = canvas.getContext('2d');
    speedControl = document.getElementById('speedSlider');

    // Display configuration scaling
    canvas.width = 340;
    canvas.height = 290;

    buildHeartGridCoordinates();
    matrixIndex = 0;

    if (loopTrackerId) cancelAnimationFrame(loopTrackerId);
    executeDrawingLoop();
}

// Maps mathematical coordinates building standard layout curve geometry rows
function buildHeartGridCoordinates() {
    pointMatrix = [];
    // Scan lines tracking row grids mapping blocks coordinates loops
    for (let y = -10; y <= 10; y += 0.68) {
        for (let x = -12; x <= 12; x += 0.58) {
            // Heart envelope function formula equation mapping
            const formulaResult = Math.pow((x * 0.12), 2) + Math.pow((y * 0.12) - Math.sqrt(Math.abs(x * 0.12)), 2);
            if (formulaResult < 1.1) {
                // Center math coordinate offsets down onto canvas pixels spacing
                const drawX = 170 + (x * 12);
                const drawY = 130 - (y * 12);
                pointMatrix.push({ x: drawX, y: drawY });
            }
        }
    }
    // Sort array elements sequential rendering from highest to lowest coordinate planes
    pointMatrix.sort((a, b) => a.y - b.y || a.x - b.x);
}

function executeDrawingLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate active processing block frame generation step ratios
    const strokeIntervals = Math.ceil(speedControl.value / 32);

    // Render historical processed array values
    for (let i = 0; i < matrixIndex; i++) {
        stampHeartEmoji(pointMatrix[i].x, pointMatrix[i].y);
    }

    // Step current calculation limits loop forward safely toward termination
    if (matrixIndex < pointMatrix.length) {
        matrixIndex = Math.min(pointMatrix.length, matrixIndex + strokeIntervals);
        loopTrackerId = requestAnimationFrame(executeDrawingLoop);
    }
}

function stampHeartEmoji(x, y) {
    ctx.fillStyle = "#e05275";
    ctx.font = "12px Arial";
    ctx.fillText("❤️", x - 6, y + 4);
}

function resetCanvas() {
    matrixIndex = 0;
    if (loopTrackerId) cancelAnimationFrame(loopTrackerId);
    executeDrawingLoop();
}
