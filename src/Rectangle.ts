class Rectangle {
    x;
    y;
    width;
    height;
    get left() {
        return this.x;
    }
    get right() {
        return (this.x + this.width);
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return (this.y + this.height);
    }
    get location() {
        return { x: this.x, y: this.y };
    }
    set location(location) {
        this.x = location.x;
        this.y = location.y;
    }
    get size() {
        return { width: this.width, height: this.height };
    }
    set size(size) {
        this.width = size.width;
        this.height = size.height;
    }
    get center() {
        return { x: this.x + (this.width / 2), y: this.y + (this.height / 2) };
    }
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Contains(value) {
        return ((((this.x <= value.x) && (value.x < (this.x + this.width))) && (this.y <= value.y)) && (value.y < (this.y + this.height)));
    }
    Equals(rect) {
        return this == rect;
    }
    Inflate(horizontalAmount, verticalAmount) {
        this.x -= horizontalAmount;
        this.y -= verticalAmount;
        this.width += horizontalAmount * 2;
        this.height += verticalAmount * 2;
    }
    Intersects(value) {
        return value.left < this.right &&
            this.left < value.right &&
            value.top < this.bottom &&
            this.top < value.bottom;
    }
    static Intersect(value1, value2) {
        if (value1.Intersects(value2)) {
            const RIGHT_SIDE = Math.min(value1.x + value1.width, value2.x + value2.width);
            const LEFT_SIDE = Math.max(value1.x, value2.x);
            const TOP_SIDE = Math.max(value1.y, value2.y);
            const BOTTOM_SIDE = Math.min(value1.y + value1.height, value2.y + value2.height);
            return new Rectangle(LEFT_SIDE, TOP_SIDE, RIGHT_SIDE - LEFT_SIDE, BOTTOM_SIDE - TOP_SIDE);
        }
        else {
            return new Rectangle(0, 0, 0, 0);
        }
    }
}
export default Rectangle;
//# sourceMappingURL=Rectangle.js.map