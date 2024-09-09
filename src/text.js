export const drawText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight);
  }
};

export const drawOutput = (ctx, output, canvas) => {
  let fontSize = 16;
  const maxWidth = canvas.width - 20; // Adjust for padding
  const lineHeight = fontSize * 1.2;
  let text = `Output: ${output.join(" ")}`;

  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "white";
  ctx.textAlign = "left";

  // Measure text width and adjust font size if necessary
  while (ctx.measureText(text).width > maxWidth && fontSize > 15) {
    fontSize -= 1;
    ctx.font = `${fontSize}px Verdana`;
  }

  drawText(ctx, text, 10, 20, maxWidth, lineHeight);
};
