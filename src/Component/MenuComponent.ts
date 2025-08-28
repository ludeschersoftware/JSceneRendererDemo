import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import { AbstractComponent, CEventType, getConfig, GlobalConfigInterface, InputStateInterface } from '@ludeschersoftware/scenerenderer';
import Ref from '@ludeschersoftware/ref';

class MenuComponent extends AbstractComponent {
    private m_global_config: GlobalConfigInterface;
    public m_container: HTMLElement;
    private m_stop_game: Ref<boolean>;
    private m_backgroundcolor: string;
    private m_show: boolean;

    constructor(container: HTMLElement, stopGame: Ref<boolean>) {
        super({
            x: 0,
            y: 0,
            width: 200,
            height: 2000,
        });

        this.m_global_config = getConfig("1");
        this.m_container = container;
        this.m_stop_game = stopGame;
        this.m_backgroundcolor = '#03adfc';
        this.m_show = false;

        this.addComponent(
            new TextComponent({
                title: 'Snake',
                fillStyle: 'red',
                textAlign: 'center',
                textBaseline: 'middle',
                font: '40px verdana, sans-serif',
                x: 0,
                y: 100,
                width: 350,
                height: 100,
            })
        );

        this.addComponent(
            new ButtonComponent(
                {
                    backgroundColor: '#4248f5',
                    title: 'Main Menu',
                    fillStyle: 'red',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    font: '40px verdana, sans-serif',
                    x: 0,
                    y: 300,
                    width: 350,
                    height: 100,
                },
                () => {
                    this.m_container.dispatchEvent(
                        new CustomEvent(CEventType.LoadScene, {
                            detail: 'MainMenu',
                        })
                    );
                }
            )
        );
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(): void {
        // Optional content loading logic
    }

    public Update(_deltaTime: number, inputState: InputStateInterface): false | void {
        this.width = this.m_global_config.Canvas.width * 0.666;
        this.height = this.m_global_config.Canvas.height;
        this.x = (this.m_global_config.Canvas.width - this.width) / 2;

        if ('Escape' in inputState.KeyboardKeyDown) {
            this.m_show = !this.m_show;
            this.m_stop_game.value = this.m_show;
            delete inputState.KeyboardKeyDown['Escape'];
        }

        if (this.m_show === false) {
            return false;
        }
    }

    public Draw(context: CanvasRenderingContext2D): void | false {
        if (!this.m_show) return false;

        context.fillStyle = this.m_backgroundcolor;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default MenuComponent;