export const inOrder = (rootNode, setPlaying, output, delay) => {
  setPlaying(true);
  output.length = 0; // Clear the output array
  const stack = [];
  let current = rootNode;

  const traverse = () => {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    if (stack.length === 0) {
      setPlaying(false);
      return;
    }

    current = stack.pop();
    current.active = true;
    output.push(current.value); // Add the current node's value to the output

    setTimeout(() => {
      current.active = false;
      current = current.right;
      traverse();
    }, delay);
  };

  traverse();
};

export const preOrder = (rootNode, setPlaying, output, delay) => {
  setPlaying(true);
  output.length = 0; // Clear the output array
  const stack = [];
  let current = rootNode;

  const traverse = () => {
    if (!current) {
      setPlaying(false);
      return;
    }

    stack.push(current);
    current.active = true;
    output.push(current.value); // Add the current node's value to the output

    setTimeout(() => {
      current.active = false;
      if (current.left) {
        current = current.left;
      } else if (current.right) {
        current = current.right;
      } else {
        while (
          stack.length > 0 &&
          (!stack[stack.length - 1].right ||
            stack[stack.length - 1].right === current)
        ) {
          current = stack.pop();
        }
        current = stack.length > 0 ? stack[stack.length - 1].right : null;
      }
      traverse();
    }, delay);
  };

  traverse();
};

export const postOrder = (rootNode, setPlaying, output, delay) => {
  setPlaying(true);
  output.length = 0; // Clear the output array
  const stack = [];
  let current = rootNode;
  let lastVisited = null;

  const traverse = () => {
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack[stack.length - 1];

      if (!current.right || current.right === lastVisited) {
        current.active = true;
        output.push(current.value); // Add the current node's value to the output
        setTimeout(() => {
          current.active = false;
          lastVisited = stack.pop();
          current = null;
          traverse();
        }, delay);
        return;
      } else {
        current = current.right;
      }
    }
    setPlaying(false);
  };

  traverse();
};

export const levelOrder = (rootNode, setPlaying, output, delay) => {
  setPlaying(true);
  output.length = 0; // Clear the output array
  const queue = [rootNode];
  let index = 0;

  const traverse = () => {
    if (index >= queue.length) {
      setPlaying(false);
      return;
    }

    const node = queue[index];
    node.active = true;
    output.push(node.value); // Add the current node's value to the output

    setTimeout(() => {
      node.active = false;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      index++;
      traverse();
    }, delay);
  };

  traverse();
};
