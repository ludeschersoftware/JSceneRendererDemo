export function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
}

export function drawCustomOutlinedRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    // Base rectangle (blue fill)
    ctx.fillStyle = "blue";
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.fill();

    // Outline (top, left, right -> 1px)
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.stroke();

    // Bottom outline (3px) → draw a line manually
    ctx.beginPath();
    ctx.moveTo(x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 3;
    ctx.stroke();
}
