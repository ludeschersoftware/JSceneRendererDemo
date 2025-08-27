import { AbstractComponent, ContentManager } from "@ludeschersoftware/scenerenderer";

interface InputState {
    mousePositionCamera: {
        x: number;
        y: number;
    };
}

class CursorComponent extends AbstractComponent {
    private m_radius: number;

    constructor(radius?: number) {
        super({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });

        this.m_radius = radius ?? 10;
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(contentManager: ContentManager): void {
        // Optional content loading logic
    }

    public Update(deltaTime: number, inputState: InputState): void {
        this.x = inputState.mousePositionCamera.x;
        this.y = inputState.mousePositionCamera.y;
    }

    public Draw(context: CanvasRenderingContext2D): void | false {
        context.beginPath();
        context.arc(this.x, this.y, this.m_radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#fce303';
        context.fill();
    }
}

export default CursorComponent;