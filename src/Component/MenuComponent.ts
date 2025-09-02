import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import { AbstractComponent, CEventType, getConfig, GlobalConfigInterface, InputStateInterface } from '@ludeschersoftware/scenerenderer';
import Ref from '@ludeschersoftware/ref';
import AlignType from '../Enum/AlignType';

class MenuComponent extends AbstractComponent {
    private m_config: GlobalConfigInterface;
    private m_stop_game: Ref<boolean>;
    private m_backgroundcolor: string;
    private m_show: boolean;

    constructor(stopGame: Ref<boolean>) {
        super({
            x: 0,
            y: 0,
            width: 200,
            height: 2000,
        });

        this.m_config = getConfig("1");
        this.m_stop_game = stopGame;
        this.m_backgroundcolor = '#03adfc';
        this.m_show = false;

        this.addComponent(
            new TextComponent({
                value: 'Snake',
                color: 'red',
                fontSize: '40px',
                horizontalAlign: AlignType.Center,
                verticalAlign: AlignType.Start,
            })
        );

        this.addComponent(
            new ButtonComponent(
                {
                    backgroundColor: '#b22020ff',
                    title: 'Main Menu',
                    color: 'white',
                    x: 0,
                    y: 300,
                    width: 350,
                    height: 100,
                },
                () => {
                    this.m_config.EventHub.send(CEventType.LoadScene, 'MainMenu');
                }
            )
        );
    }

    public override Update(_deltaTime: number, inputState: InputStateInterface): false | void {
        this.width = this.m_config.Canvas.width * 0.666;
        this.height = this.m_config.Canvas.height;
        this.x = (this.m_config.Canvas.width - this.width) / 2;

        if ('Escape' in inputState.KeyboardKeyDown) {
            this.m_show = !this.m_show;
            this.m_stop_game.value = this.m_show;
            delete inputState.KeyboardKeyDown['Escape'];
        }

        if (this.m_show === false) {
            return false;
        }
    }

    public override Draw(context: CanvasRenderingContext2D): void | false {
        if (!this.m_show) return false;

        context.fillStyle = this.m_backgroundcolor;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default MenuComponent;