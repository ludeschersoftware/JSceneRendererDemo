import { Box } from "@ludeschersoftware/types";

export function CollidesWith(box1: Box, box2: Box): boolean {
    return (
        box2.x < box1.x + box1.width &&
        box2.x + box2.width > box1.x &&
        box2.y < box1.y + box1.height &&
        box2.y + box2.height > box1.y
    );
}
