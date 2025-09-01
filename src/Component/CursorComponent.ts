import { AbstractComponent, InputStateInterface } from "@ludeschersoftware/scenerenderer";

class CursorComponent extends AbstractComponent {
    private m_radius: number;

    constructor(radius?: number) {
        super();

        this.m_radius = radius ?? 10;
    }

    public override Update(_deltaTime: number, inputState: InputStateInterface): void {
        this.x = inputState.MousePositionCamera.x;
        this.y = inputState.MousePositionCamera.y;
    }

    public override Draw(context: CanvasRenderingContext2D): void | false {
        context.beginPath();
        context.arc(this.x, this.y, this.m_radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#fce303';
        context.fill();
    }
}

export default CursorComponent;