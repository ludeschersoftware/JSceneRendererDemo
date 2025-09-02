import { AbstractComponent, InputStateInterface } from "@ludeschersoftware/scenerenderer";

class CursorComponent extends AbstractComponent {
    private m_size: number; // pixel size (scaling factor)
    private m_pixels: Array<string>;
    private m_colors: { [key: string]: string | null; };

    constructor(scale?: number) {
        super();

        this.m_size = scale ?? 2;
        this.m_pixels = [
            "0000011",
            "00001221",
            "00001221",
            "00001221",
            "0000122111",
            "0000122122111",
            "000012212212211",
            "0000122122122121",
            "11101221221221221",
            "12211222222221221",
            "12221222222222221",
            "01221222222222221",
            "00121222222222221",
            "00122222222222221",
            "00012222222222221",
            "00012222222222210",
            "00001222222222210",
            "00001222222222210",
            "00000122222222100",
            "00000122222222100",
            "00000111111111100",
        ];
        this.m_colors = {
            "0": null,
            "1": "white",
            "2": "black",
        };
    }

    public override Update(_deltaTime: number, inputState: InputStateInterface): void {
        this.x = inputState.MousePositionCamera.x;
        this.y = inputState.MousePositionCamera.y;
    }

    public override Draw(context: CanvasRenderingContext2D): void | false {
        context.save();
        context.translate(this.x - this.m_size * 6, this.y - this.m_size);

        this.m_pixels.forEach((row, y) => {
            [...row].forEach((val, x) => {
                if (this.m_colors[val]) {
                    context.fillStyle = this.m_colors[val];
                    context.fillRect(x * this.m_size, y * this.m_size, this.m_size, this.m_size);
                }
            });
        });

        context.restore();
    }
}

export default CursorComponent;