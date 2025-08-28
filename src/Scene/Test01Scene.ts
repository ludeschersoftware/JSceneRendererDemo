import { AbstractScene, Camera2D, CEventType } from "@ludeschersoftware/scenerenderer";
import FPSComponent from "../Component/FPSComponent";
import CursorComponent from "../Component/CursorComponent";
import CameraComponent from "../Component/CameraComponent";
import TextureComponent from "../Component/TextureComponent";
import WorldButtonComponent from "../Component/WorldButtonComponent";
import ButtonComponent from "../Component/ButtonComponent";

class Test01Scene extends AbstractScene {
    private m_container: HTMLElement;

    constructor(id: string, camera: Camera2D, container: HTMLElement) {
        super(id, camera);

        this.m_container = container;
    }

    public override Initialize(): void {
        super.Initialize();

        this.Layers = [
            {
                applyCamera: false, components: [new ButtonComponent({
                    title: '< Go back',
                    backgroundColor: '#fc8403',
                    x: 20,
                    y: 20,
                    width: 500,
                    height: 100,
                }, () => {
                    this.m_container.dispatchEvent(new CustomEvent(CEventType.LoadScene, {
                        detail: "MainMenu",
                    }));
                })]
            },
            {
                applyCamera: true, components: [
                    new TextureComponent({
                        x: 100,
                        y: 100,
                        width: 650,
                        height: 365,
                        src: 'assets/world-collapse-doomsday-scene-digital-painting.jpg',
                    }),
                    new WorldButtonComponent({
                        title: 'Clickme',
                        backgroundColor: '#9a4ec7',
                        x: 0,
                        y: 0,
                        width: 250,
                        height: 100,
                    }, () => {
                        console.log("Clickme!");
                    })
                ]
            },
            {
                applyCamera: false, components: [
                    new FPSComponent(),
                    new CursorComponent(10),
                    new CameraComponent(this.Camera!),
                ]
            }
        ];
    }
}

export default Test01Scene;