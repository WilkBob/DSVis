// Import TreeNode class
import { drawOutput } from "./src/text.js";
import { TreeNode } from "./src/trees/TreeNode.js";
import {
  preOrder,
  inOrder,
  postOrder,
  levelOrder,
} from "./src/trees/traversals.js";

// Configuration constants
const CONFIG = {
  depth: 2,
  maxDepth: 4,
  minDepth: 1,
  padding: 0,
  radius: 20,
  animationDelay: 550,
};

// DOM Elements
const container = document.getElementById("tree-container");
const canvas = document.createElement("canvas");
container.appendChild(canvas);

canvas.classList.add("w-full", "h-full");

const ctx = canvas.getContext("2d");

const preOrderButton = document.getElementById("pre-traverse");
const inOrderButton = document.getElementById("in-traverse");
const postOrderButton = document.getElementById("post-traverse");
const levelOrderButton = document.getElementById("level-traverse");
const addDepthButtons = document.querySelectorAll(".add-depth");
const subtractDepthButtons = document.querySelectorAll(".subtract-depth");
const depthCounters = document.querySelectorAll(".depth-counter");

// State
let nodesForDrawing = [];
let rootNode = null;
let playing = false;
const output = [];

// Set playing state
const setPlaying = (value) => {
  playing = value;
};

// Resize canvas to fill container
const resizeCanvas = () => {
  const rect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  // Set the canvas width and height to match the container size multiplied by the device pixel ratio
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Set the CSS width and height to match the container size
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  // Scale the context to match the device pixel ratio
  ctx.scale(dpr, dpr);
};
// Build tree with specified depth
const buildTree = (levels) => {
  setPlaying(false);
  output.length = 0;
  const root = new TreeNode(nodesForDrawing, 0.5, 0.08); // Center the root node horizontally and place it near the top
  const queue = [{ node: root, level: 0 }];
  const verticalSpacing = 1 / (levels + 0.9); // Adjust vertical spacing based on the number of levels

  const build = () => {
    if (queue.length === 0) return;

    const { node, level } = queue.shift();
    if (level >= levels) return;

    const horizontalSpacing = 1 / Math.pow(2, level + 1) / 2; // Adjust horizontal spacing based on the level
    const left = new TreeNode(
      nodesForDrawing,
      node.position.x - horizontalSpacing,
      node.position.y + verticalSpacing
    );
    const right = new TreeNode(
      nodesForDrawing,
      node.position.x + horizontalSpacing,
      node.position.y + verticalSpacing
    );
    node.setLeft(left);
    node.setRight(right);

    queue.push({ node: left, level: level + 1 });
    queue.push({ node: right, level: level + 1 });

    build();
  };

  build();
  return root;
};

// Animation loop
const animate = () => {
  const rect = container.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);

  nodesForDrawing.forEach((node) => {
    node.draw(
      ctx,
      rect.width,
      rect.height,
      CONFIG.padding,
      Math.min(rect.width, rect.height) / 40
    );
    node.update();
  });
  drawOutput(ctx, output, canvas);
  requestAnimationFrame(animate);
};

// Initialize tree and start animation
const initializeTree = (depth) => {
  nodesForDrawing = [];
  rootNode = buildTree(depth);
  depthCounters.forEach((counter) => {
    console.log(counter);
    counter.textContent = depth;
  });
  resizeCanvas();
  setPlaying(false);
};

// Handle traversal button clicks
const handleTraversal = (traversalFunction) => {
  if (!playing) {
    traversalFunction(rootNode, setPlaying, output, CONFIG.animationDelay);
  }
};

// Event listeners for traversal buttons
preOrderButton.addEventListener("click", () => handleTraversal(preOrder));
inOrderButton.addEventListener("click", () => handleTraversal(inOrder));
postOrderButton.addEventListener("click", () => handleTraversal(postOrder));
levelOrderButton.addEventListener("click", () => handleTraversal(levelOrder));

// Event listeners for depth adjustment buttons
addDepthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (CONFIG.depth < CONFIG.maxDepth) {
      CONFIG.depth += 1;
      initializeTree(CONFIG.depth);
    }
  });
});
subtractDepthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (CONFIG.depth > CONFIG.minDepth) {
      CONFIG.depth -= 1;
      initializeTree(CONFIG.depth);
    }
  });
});
// Initial setup
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
initializeTree(CONFIG.depth);
animate();
