import { Box, Vector2, Size } from "@ludeschersoftware/types";

class Rectangle implements Box {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get left(): number {
        return this.x;
    }

    get right(): number {
        return this.x + this.width;
    }

    get top(): number {
        return this.y;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    get location(): Vector2 {
        return { x: this.x, y: this.y };
    }

    set location(location: Vector2) {
        this.x = location.x;
        this.y = location.y;
    }

    get size(): Size {
        return { width: this.width, height: this.height };
    }

    set size(size: Size) {
        this.width = size.width;
        this.height = size.height;
    }

    get center(): Vector2 {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
        };
    }

    public Contains(value: Vector2): boolean {
        return (
            this.x <= value.x &&
            value.x < this.x + this.width &&
            this.y <= value.y &&
            value.y < this.y + this.height
        );
    }

    public Equals(rect: Rectangle): boolean {
        return this === rect;
    }

    public Inflate(horizontalAmount: number, verticalAmount: number): void {
        this.x -= horizontalAmount;
        this.y -= verticalAmount;
        this.width += horizontalAmount * 2;
        this.height += verticalAmount * 2;
    }

    public Intersects(value: Rectangle): boolean {
        return (
            value.left < this.right &&
            this.left < value.right &&
            value.top < this.bottom &&
            this.top < value.bottom
        );
    }

    public static Intersect(value1: Rectangle, value2: Rectangle): Rectangle {
        if (value1.Intersects(value2)) {
            const RIGHT_SIDE = Math.min(value1.x + value1.width, value2.x + value2.width);
            const LEFT_SIDE = Math.max(value1.x, value2.x);
            const TOP_SIDE = Math.max(value1.y, value2.y);
            const BOTTOM_SIDE = Math.min(value1.y + value1.height, value2.y + value2.height);

            return new Rectangle(
                LEFT_SIDE,
                TOP_SIDE,
                RIGHT_SIDE - LEFT_SIDE,
                BOTTOM_SIDE - TOP_SIDE
            );
        } else {
            return new Rectangle(0, 0, 0, 0);
        }
    }
}

export default Rectangle;