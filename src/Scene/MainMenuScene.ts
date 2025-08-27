import { AbstractScene, CEventType, Renderer } from "@ludeschersoftware/scenerenderer";
import TextureComponent from "../Component/TextureComponent";
import ButtonComponent from "../Component/ButtonComponent";
import FPSComponent from "../Component/FPSComponent";
import CursorComponent from "../Component/CursorComponent";

class MainMenuScene extends AbstractScene {
    private m_container: HTMLElement;

    constructor(id: string, container: HTMLElement) {
        super(id);

        this.m_container = container;
    }

    public override Initialize(): void {
        super.Initialize();

        this.Layers = [
            {
                applyCamera: false,
                components: [
                    new TextureComponent({
                        x: 250,
                        y: 250,
                        width: 1024,
                        height: 365,
                        src: 'https://staging.gaertnerei-ludescher.at/assets/media/2024030312462165e4630d7f40d1.73816928..jpeg',
                    }),
                ],
            },
            {
                applyCamera: false,
                components: [
                    new ButtonComponent(
                        {
                            title: 'Start Game',
                            backgroundColor: '#12a308',
                            x: Renderer.CONFIG.canvas.width / 2 - 250,
                            y: 350,
                            width: 500,
                            height: 100,
                        },
                        () => {
                            this.m_container.dispatchEvent(
                                new CustomEvent(CEventType.LoadScene, {
                                    detail: 'Test01',
                                })
                            );
                        }
                    ),
                ],
            },
            {
                applyCamera: false,
                components: [
                    new ButtonComponent(
                        {
                            title: 'Level #2',
                            backgroundColor: '#17ebb6',
                            x: Game.CONFIG.canvas.width / 2 - 220,
                            y: 320,
                            width: 500,
                            height: 100,
                        },
                        () => {
                            console.log('Level #2');
                        }
                    ),
                ],
            },
            {
                applyCamera: false,
                components: [
                    new ButtonComponent(
                        {
                            title: 'Start Snake',
                            backgroundColor: '#3279a8',
                            x: 0,
                            y: 0,
                            width: 500,
                            height: 200,
                        },
                        () => {
                            this.m_container.dispatchEvent(
                                new CustomEvent(CEventType.LoadScene, {
                                    detail: 'snake',
                                })
                            );
                        }
                    ),
                    new ButtonComponent(
                        {
                            title: 'Level #4',
                            backgroundColor: '#8f1575',
                            x: Renderer.CONFIG.canvas.width / 2 - 200,
                            y: 300,
                            width: 400,
                            height: 100,
                        },
                        () => {
                            console.log('Level #4');
                        }
                    ),
                ],
            },
            {
                applyCamera: false,
                components: [new FPSComponent(), new CursorComponent(10)],
            },
        ];
    }
}

export default MainMenuScene;