export class TreeNode {
  static LINE_OPACITY_INCREMENT = 0.05;
  static NODE_OPACITY_INCREMENT = 0.05;
  static LINE_LENGTH_INCREMENT = 0.02;
  static FONT_SIZE = "16px";
  static FONT_FAMILY = "Courier";
  static TEXT_COLOR = "white";
  static GLOW_COLOR = "#c59f60";
  static GLOW_BLUR = 20;

  constructor(nodesForDrawing, x = 0, y = 0) {
    this.value = nodesForDrawing.length;
    nodesForDrawing.push(this);
    this.left = null;
    this.right = null;

    this.position = { x, y };
    this.active = false;
    this.opacity = 0;
    this.lineOpacity = 0; // Opacity for the lines
    this.lineLength = 0; // Line length starts at 0

    this.textColour = TreeNode.TEXT_COLOR;
  }

  setLeft(node) {
    this.left = node;
  }

  setRight(node) {
    this.right = node;
  }

  draw(ctx, width, height, padding, radius = 20) {
    const x = this.position.x * width + padding;
    const y = this.position.y * height + padding;

    this.drawLinesToChildren(ctx, x, y, width, height, padding, radius);
    this.drawNode(ctx, x, y, radius);
    this.drawValue(ctx, x, y);
  }

  drawLinesToChildren(ctx, x, y, width, height, padding, radius) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.lineOpacity})`;
    ctx.lineWidth = 1;

    if (this.left) {
      this.drawLineToChild(
        ctx,
        x,
        y,
        this.left,
        width,
        height,
        padding,
        radius,
        Math.PI
      );
    }

    if (this.right) {
      this.drawLineToChild(
        ctx,
        x,
        y,
        this.right,
        width,
        height,
        padding,
        radius,
        0
      );
    }
  }

  drawLineToChild(ctx, x, y, child, width, height, padding, radius, angle) {
    const childX = child.position.x * width + padding;
    const childY = child.position.y * height + padding;
    const start = this.calculateLineStart(x, y, radius, angle);
    const end = this.calculateLineEnd(x, y, childX, childY, radius);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(
      start.x + (end.x - start.x) * this.lineLength,
      start.y + (end.y - start.y) * this.lineLength
    );
    ctx.stroke();
  }

  calculateLineStart(x, y, radius, angle) {
    return {
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius,
    };
  }

  calculateLineEnd(x, y, childX, childY, radius) {
    const angle = Math.atan2(childY - y, childX - x);
    return {
      x: childX - Math.cos(angle) * radius,
      y: childY - Math.sin(angle) * radius,
    };
  }

  drawNode(ctx, x, y, radius) {
    ctx.save(); // Save the current state

    if (this.active) {
      ctx.shadowColor = TreeNode.GLOW_COLOR;
      ctx.shadowBlur = TreeNode.GLOW_BLUR;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(197, 158, 96, ${this.opacity})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.lineOpacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore(); // Restore the state
  }

  drawValue(ctx, x, y) {
    ctx.fillStyle = this.textColour;
    ctx.font = `${TreeNode.FONT_SIZE} ${TreeNode.FONT_FAMILY}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.value.toString(), x, y);
  }

  update() {
    this.updateLineLength();
    this.updateLineOpacity();
    this.updateNodeOpacity();
  }

  updateLineLength() {
    if (this.lineLength < 1) {
      this.lineLength = Math.min(
        1,
        this.lineLength + TreeNode.LINE_LENGTH_INCREMENT
      );
    }
  }

  updateLineOpacity() {
    if (this.lineOpacity < 1) {
      this.lineOpacity = Math.min(
        1,
        this.lineOpacity + TreeNode.LINE_OPACITY_INCREMENT
      );
    }
  }

  updateNodeOpacity() {
    if (this.active) {
      this.opacity = Math.min(
        1,
        this.opacity + TreeNode.NODE_OPACITY_INCREMENT
      );
    } else {
      this.opacity = Math.max(
        0,
        this.opacity - TreeNode.NODE_OPACITY_INCREMENT
      );
    }
  }
}
