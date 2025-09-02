import { InputStateInterface, AbstractComponent } from "@ludeschersoftware/scenerenderer";
import TextComponent from "./TextComponent";
import { CollidesWith } from "../Utils/CollisionHelper";
import AlignType from "../Enum/AlignType";
import FontOptions from "../Interfaces/FontOptions";
import { Box, Loose } from "@ludeschersoftware/types";

interface ButtonOptions extends Box, FontOptions {
    title?: string;
    backgroundColor?: string;
    color?: string;
}

class ButtonComponent extends AbstractComponent {
    public backgroundColor: string;
    private m_clicked: boolean;
    private m_callback: () => void;

    constructor(options: Loose<ButtonOptions>, callback: () => void) {
        super(Object.assign({
            x: 0,
            y: 0,
            width: 10,
            height: 10,
        }, options));

        const { title, backgroundColor, ...rest } = options;

        this.backgroundColor = backgroundColor ?? 'white';
        this.m_clicked = false;
        this.m_callback = callback;

        this.addComponent(
            new TextComponent(Object.assign({
                value: title ?? 'BUTTON',
                color: 'black',
                fontFamily: 'Sniglet',
                fontSize: '60px',
                horizontalAlign: AlignType.Center,
                verticalAlign: AlignType.Center,
            }, rest))
        );
    }

    public override Update(_deltaTime: number, inputState: InputStateInterface): void | false {
        const CAM_HITBOX = {
            x: inputState.MousePositionCamera.x,
            y: inputState.MousePositionCamera.y,
            width: 1,
            height: 1,
        };

        if (inputState.MouseLeftDown) {
            if (!this.m_clicked && CollidesWith(this, CAM_HITBOX)) {
                this.m_clicked = true;
                this.m_callback();
                inputState.MouseLeftDown = false;
            } else if (CollidesWith(this, CAM_HITBOX)) {
                inputState.MouseLeftDown = false;
            }
        } else if (this.m_clicked) {
            this.m_clicked = false;
        }
    }

    public override Draw(context: CanvasRenderingContext2D): void | false {
        let radius = 16;
        let width = this.width;
        let height = this.height;
        let x = this.x;
        let y = this.y;

        context.fillStyle = this.backgroundColor;

        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.arcTo(x + width, y, x + width, y + radius, radius);
        context.lineTo(x + width, y + height - radius);
        context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        context.lineTo(x + radius, y + height);
        context.arcTo(x, y + height, x, y + height - radius, radius);
        context.lineTo(x, y + radius);
        context.arcTo(x, y, x + radius, y, radius);
        context.closePath();

        context.fill();

        radius -= 2;
        height -= 8;

        context.fillStyle = "#ffffff30";

        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.arcTo(x + width, y, x + width, y + radius, radius);
        context.lineTo(x + width, y + height - radius);
        context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        context.lineTo(x + radius, y + height);
        context.arcTo(x, y + height, x, y + height - radius, radius);
        context.lineTo(x, y + radius);
        context.arcTo(x, y, x + radius, y, radius);
        context.closePath();

        context.fill();

        radius -= 2;

        x += 5;
        y += 5;
        width -= 10;
        height -= 10;

        context.strokeStyle = "#ffffff37";
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.arcTo(x + width, y, x + width, y + radius, radius);
        context.lineTo(x + width, y + height - radius);
        context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        context.lineTo(x + radius, y + height);
        context.arcTo(x, y + height, x, y + height - radius, radius);
        context.lineTo(x, y + radius);
        context.arcTo(x, y, x + radius, y, radius);
        context.closePath();

        context.stroke();

        height = Math.floor(height / 2);
        context.fillStyle = "#ffffff37";

        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.arcTo(x + width, y, x + width, y + radius, radius);
        context.lineTo(x + width, y + height);
        context.lineTo(x, y + height);
        context.lineTo(x, y + radius);
        context.arcTo(x, y, x + radius, y, radius);
        context.closePath();

        context.fill();

    }
}

export default ButtonComponent;