class TreeNode {
  value;
  left;
  right;

  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  root;

  constructor(root = null) {
    this.root = root;
  }

  getMax(node = this.root) {
    if (!node.right) {
      return node;
    }

    return this.getMax(node.right);
  }

  getMin(node = this.root) {
    if (!node.left) {
      return node;
    }

    return this.getMin(node.left);
  }

  find(value, node = this.root) {
    if (value === node.value) {
      return node;
    }

    if (value < node.value && node.left) {
      return this.find(value, node.left);
    }

    if (value >= node.value && node.right) {
      return this.find(value, node.right);
    }

    return null;
  }

  append(value, node = this.root) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    if (value < node.value) {
      if (node.left) {
        this.append(value, node.left);
      } else {
        node.left = newNode;
        return newNode;
      }
    }

    if (value >= node.value) {
      if (node.right) {
        this.append(value, node.right);
      } else {
        node.right = newNode;
        return newNode;
      }
    }
  }

  toArray(node = this.root) {
    if (!node) {
      return null;
    }

    const leftValue = this.toArray(node.left);
    const rightValue = this.toArray(node.right);
    let result = [node.value];

    if (leftValue) {
      result = leftValue.concat(result);
    }

    if (rightValue) {
      result = result.concat(rightValue);
    }

    return result;
  }

  printTree(node = this.root) {
    if (!node) {
      return null;
    }

    this.printTree(node.left);
    console.log(node.value);
    this.printTree(node.right);
  }

  delete(value, node = this.root) {
    if (!node) {
      return null;
    }

    const deleteTwoChildsNode = (deletedNode) => {
      const maxInLeft = this.getMax(deletedNode.left);
      this.delete(maxInLeft.value);
      deletedNode.value = maxInLeft.value;
      return deletedNode;
    };

    if (value === this.root.value) {
      if (!this.root.left || !this.root.right) {
        this.root = this.root.left ?? this.root.right;
      } else {
        deleteTwoChildsNode(this.root);
      }

      return node;
    }

    if (value === node.left?.value) {
      const deletedNode = node.left;

      if (!deletedNode.left || !deletedNode.right) {
        node.left = deletedNode.left ?? deletedNode.right;
      } else {
        deleteTwoChildsNode(deletedNode);
      }

      return node;
    }

    if (value === node.right?.value) {
      const deletedNode = node.right;

      if (!deletedNode.left || !deletedNode.right) {
        node.right = deletedNode.left ?? deletedNode.right;
      } else {
        deleteTwoChildsNode(deletedNode);
      }

      return node;
    }

    if (value < node.value) {
      return this.delete(value, node.left);
    }

    if (value > node.value) {
      return this.delete(value, node.right);
    }

    return null;
  }
}

const tree = new BinarySearchTree();
tree.append(100);

tree.append(50);
tree.append(50);

tree.delete(50);

console.log(tree.toArray());
