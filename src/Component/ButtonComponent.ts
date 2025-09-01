import { InputStateInterface, AbstractComponent } from "@ludeschersoftware/scenerenderer";
import TextComponent from "./TextComponent";
import { CollidesWith } from "../Utils/CollisionHelper";
import AlignType from "../Enum/AlignType";

interface ButtonOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    title?: string;
    backgroundColor?: string;
    fillStyle?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

class ButtonComponent extends AbstractComponent {
    public backgroundColor: string;
    private m_clicked: boolean;
    private m_callback: () => void;

    constructor(options: ButtonOptions, callback: () => void) {
        super(options);

        this.backgroundColor = options.backgroundColor ?? '#32a854';
        this.m_clicked = false;
        this.m_callback = callback;

        this.addComponent(
            new TextComponent({
                value: options.title ?? 'Button',
                color: options.fillStyle ?? '#a83256',
                fontSize: '40px',
                horizontalAlign: AlignType.Center,
                verticalAlign: AlignType.Center,
            })
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
        context.fillStyle = this.backgroundColor;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default ButtonComponent;