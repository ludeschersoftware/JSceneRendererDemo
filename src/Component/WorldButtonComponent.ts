import { Box } from '@ludeschersoftware/types';
import { AbstractComponent, InputStateInterface } from '@ludeschersoftware/scenerenderer';
import TextComponent from './TextComponent';
import { CollidesWith } from '../Utils/CollisionHelper';
import AlignType from '../Enum/AlignType';

interface ButtonOptions extends Box {
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

class WorldButtonComponent extends AbstractComponent {
    public backgroundColor: string;
    private m_clicked: boolean;
    private m_callback: () => void;

    constructor(options: ButtonOptions, callback: () => void) {
        super(options);

        this.backgroundColor = options.backgroundColor ?? "#9a4ec7";
        this.m_clicked = false;
        this.m_callback = callback;

        this.addComponent(new TextComponent({
            value: options.title ?? 'Button',
            color: options.fillStyle ?? '#a83256',
            fontSize: '40px',
            horizontalAlign: AlignType.Center,
            verticalAlign: AlignType.Center,
        }));
    }

    public override Update(_deltaTime: number, inputState: InputStateInterface): false | void {
        const CAM_HITBOX: Box = {
            x: inputState.MousePositionWorld.x,
            y: inputState.MousePositionWorld.y,
            width: 1,
            height: 1,
        };

        if (inputState.MouseLeftDown === true) {
            if (this.m_clicked === false) {
                if (CollidesWith(this, CAM_HITBOX) === true) {
                    this.m_clicked = true;

                    this.m_callback();

                    inputState.MouseLeftDown = false;
                }
            } else if (CollidesWith(this, CAM_HITBOX) === true) {
                inputState.MouseLeftDown = false;
            }
        } else if (this.m_clicked === true) {
            this.m_clicked = false;
        }
    }

    public override Draw(context: CanvasRenderingContext2D): void | false {
        context.fillStyle = this.backgroundColor;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default WorldButtonComponent;