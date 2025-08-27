import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import { AbstractComponent, CEventType, ContentManager, Renderer } from '@ludeschersoftware/scenerenderer';
import Ref from '@ludeschersoftware/ref';

interface InputState {
    keyboardKeyDown: Record<string, boolean>;
}

class MenuComponent extends AbstractComponent {
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

    public LoadContent(contentManager: ContentManager): void {
        // Optional content loading logic
    }

    public Update(deltaTime: number, inputState: InputState): boolean | void {
        this.width = Renderer.CONFIG.canvas.width * 0.666;
        this.height = Renderer.CONFIG.canvas.height;
        this.x = (Renderer.CONFIG.canvas.width - this.width) / 2;

        if ('Escape' in inputState.keyboardKeyDown) {
            this.m_show = !this.m_show;
            this.m_stop_game.value = this.m_show;
            delete inputState.keyboardKeyDown['Escape'];
        }

        return this.m_show;
    }

    public Draw(context: CanvasRenderingContext2D): void | false {
        if (!this.m_show) return false;

        context.fillStyle = this.m_backgroundcolor;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default MenuComponent;