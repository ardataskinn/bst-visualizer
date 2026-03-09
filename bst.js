// BST Node class
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
        this.level = 0;
    }
}

// BST class
class BST {
    constructor() {
        this.root = null;
        this.nodeCount = 0;
        this.maxDepth = 0;
    }

    insert(value) {
        this.root = this._insert(this.root, value, 0);
        this.nodeCount++;
    }

    _insert(node, value, level) {
        if (node === null) {
            this.maxDepth = Math.max(this.maxDepth, level);
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this._insert(node.left, value, level + 1);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value, level + 1);
        }

        return node;
    }

    remove(value) {
        this.root = this._remove(this.root, value);
        if (this.root !== null) {
            this._updateDepth(this.root, 0);
        }
    }

    _remove(node, value) {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this._remove(node.left, value);
        } else if (value > node.value) {
            node.right = this._remove(node.right, value);
        } else {
            this.nodeCount--;
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            const minNode = this._findMin(node.right);
            node.value = minNode.value;
            node.right = this._remove(node.right, minNode.value);
        }

        return node;
    }

    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    _updateDepth(node, level) {
        if (node === null) return;
        this.maxDepth = Math.max(this.maxDepth, level);
        this._updateDepth(node.left, level + 1);
        this._updateDepth(node.right, level + 1);
    }

    clear() {
        this.root = null;
        this.nodeCount = 0;
        this.maxDepth = 0;
    }

    getDepth() {
        return this.maxDepth;
    }
}

// Visualization class
class BSTVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.bst = new BST();
        
        // View transformation
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
        this.minScale = 0.1;
        this.maxScale = 5;
        
        // Pan state
        this.isPanning = false;
        this.lastPanX = 0;
        this.lastPanY = 0;
        
        // Node styling
        this.nodeRadius = 25;
        this.horizontalSpacing = 80;
        this.verticalSpacing = 100;
        
        this.setupCanvas();
        this.setupEventListeners();
        this.animate();
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.draw();
    }

    setupEventListeners() {
        // Mouse wheel for zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom(e.offsetX, e.offsetY, delta);
        });

        // Pan with mouse drag
        this.canvas.addEventListener('mousedown', (e) => {
            this.isPanning = true;
            this.lastPanX = e.clientX;
            this.lastPanY = e.clientY;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isPanning) {
                const dx = e.clientX - this.lastPanX;
                const dy = e.clientY - this.lastPanY;
                this.offsetX += dx;
                this.offsetY += dy;
                this.lastPanX = e.clientX;
                this.lastPanY = e.clientY;
                this.draw();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isPanning = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isPanning = false;
        });

        // Touch support for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isPanning = true;
                this.lastPanX = e.touches[0].clientX;
                this.lastPanY = e.touches[0].clientY;
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1 && this.isPanning) {
                e.preventDefault();
                const dx = e.touches[0].clientX - this.lastPanX;
                const dy = e.touches[0].clientY - this.lastPanY;
                this.offsetX += dx;
                this.offsetY += dy;
                this.lastPanX = e.touches[0].clientX;
                this.lastPanY = e.touches[0].clientY;
                this.draw();
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.isPanning = false;
        });
    }

    zoom(centerX, centerY, factor) {
        const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * factor));
        
        // Zoom towards mouse position
        const worldX = (centerX - this.offsetX) / this.scale;
        const worldY = (centerY - this.offsetY) / this.scale;
        
        this.scale = newScale;
        
        this.offsetX = centerX - worldX * this.scale;
        this.offsetY = centerY - worldY * this.scale;
        
        this.updateZoomDisplay();
        this.draw();
    }

    updateZoomDisplay() {
        const zoomPercent = Math.round(this.scale * 100);
        document.getElementById('zoomLevel').textContent = `Zoom: ${zoomPercent}%`;
    }

    resetView() {
        this.offsetX = this.canvas.width / 2;
        this.offsetY = 50;
        this.scale = 1;
        this.updateZoomDisplay();
        this.draw();
    }

    addNode(value) {
        if (value === null || value === undefined || value === '') return;
        const numValue = parseInt(value);
        if (isNaN(numValue)) return;
        
        this.bst.insert(numValue);
        this.updateInfo();
        this.draw();
    }

    removeNode(value) {
        if (value === null || value === undefined || value === '') return;
        const numValue = parseInt(value);
        if (isNaN(numValue)) return;
        
        this.bst.remove(numValue);
        this.updateInfo();
        this.draw();
    }

    clearTree() {
        this.bst.clear();
        this.updateInfo();
        this.draw();
    }

    addRandomNodes(count) {
        for (let i = 0; i < count; i++) {
            const value = Math.floor(Math.random() * 1000);
            this.bst.insert(value);
        }
        this.updateInfo();
        this.draw();
    }

    updateInfo() {
        document.getElementById('nodeCount').textContent = this.bst.nodeCount;
        document.getElementById('depth').textContent = this.bst.getDepth();
    }

    calculatePositions() {
        if (this.bst.root === null) return;
        
        const positions = new Map();
        this._calculatePositions(this.bst.root, 0, 0, positions);
        return positions;
    }

    _calculatePositions(node, level, offset, positions) {
        if (node === null) return offset;

        const leftOffset = this._calculatePositions(node.left, level + 1, offset, positions);
        const x = leftOffset * this.horizontalSpacing;
        const y = level * this.verticalSpacing;
        
        positions.set(node, { x, y, level });
        node.x = x;
        node.y = y;
        node.level = level;

        const rightOffset = this._calculatePositions(node.right, level + 1, leftOffset + 1, positions);
        return rightOffset;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Apply transformation
        this.ctx.save();
        this.ctx.translate(this.offsetX, this.offsetY);
        this.ctx.scale(this.scale, this.scale);

        if (this.bst.root === null) {
            this.ctx.restore();
            return;
        }

        // Calculate positions
        this.calculatePositions();

        // Draw connections first (so they appear behind nodes)
        this.drawConnections(this.bst.root);

        // Draw nodes
        this.drawNodes(this.bst.root);

        this.ctx.restore();
    }

    drawConnections(node) {
        if (node === null) return;

        const centerX = node.x;
        const centerY = node.y;

        // Draw connection to left child
        if (node.left !== null) {
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY + this.nodeRadius);
            this.ctx.lineTo(node.left.x, node.left.y - this.nodeRadius);
            this.ctx.strokeStyle = '#444';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawConnections(node.left);
        }

        // Draw connection to right child
        if (node.right !== null) {
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY + this.nodeRadius);
            this.ctx.lineTo(node.right.x, node.right.y - this.nodeRadius);
            this.ctx.strokeStyle = '#444';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawConnections(node.right);
        }
    }

    drawNodes(node) {
        if (node === null) return;

        const x = node.x;
        const y = node.y;

        // Draw node with glow effect
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, this.nodeRadius * 1.5);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#cccccc');
        gradient.addColorStop(1, '#888888');

        // Outer glow
        this.ctx.shadowColor = '#ffffff';
        this.ctx.shadowBlur = 15;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.nodeRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Reset shadow
        this.ctx.shadowBlur = 0;

        // Draw border
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.nodeRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Draw value text
        this.ctx.fillStyle = '#000000';
        this.ctx.font = `bold ${Math.max(12, this.nodeRadius * 0.6)}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(node.value.toString(), x, y);

        // Recursively draw children
        this.drawNodes(node.left);
        this.drawNodes(node.right);
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const visualizer = new BSTVisualizer('treeCanvas');

    // Button event listeners
    document.getElementById('addBtn').addEventListener('click', () => {
        const value = document.getElementById('nodeValue').value;
        visualizer.addNode(value);
        document.getElementById('nodeValue').value = '';
    });

    document.getElementById('removeBtn').addEventListener('click', () => {
        const value = document.getElementById('nodeValue').value;
        visualizer.removeNode(value);
        document.getElementById('nodeValue').value = '';
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        visualizer.clearTree();
    });

    document.getElementById('randomBtn').addEventListener('click', () => {
        visualizer.addRandomNodes(20);
    });

    document.getElementById('random50Btn').addEventListener('click', () => {
        visualizer.addRandomNodes(50);
    });

    document.getElementById('random100Btn').addEventListener('click', () => {
        visualizer.addRandomNodes(100);
    });

    document.getElementById('zoomInBtn').addEventListener('click', () => {
        visualizer.zoom(visualizer.canvas.width / 2, visualizer.canvas.height / 2, 1.2);
    });

    document.getElementById('zoomOutBtn').addEventListener('click', () => {
        visualizer.zoom(visualizer.canvas.width / 2, visualizer.canvas.height / 2, 0.8);
    });

    document.getElementById('resetViewBtn').addEventListener('click', () => {
        visualizer.resetView();
    });

    // Enter key to add node
    document.getElementById('nodeValue').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            visualizer.addNode(e.target.value);
            e.target.value = '';
        }
    });

    // Initial reset view
    visualizer.resetView();
});


