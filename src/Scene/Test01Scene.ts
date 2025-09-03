import { AbstractScene, CEventType, GlobalConfigInterface } from "@ludeschersoftware/scenerenderer";
import FPSComponent from "../Component/FPSComponent";
import CursorComponent from "../Component/CursorComponent";
import CameraComponent from "../Component/CameraComponent";
import TextureComponent from "../Component/TextureComponent";
import WorldButtonComponent from "../Component/WorldButtonComponent";
import ButtonComponent from "../Component/ButtonComponent";
import SceneId from "../Enum/SceneId";

class Test01Scene extends AbstractScene {
    constructor() {
        super(SceneId.Test01);
    }

    public override Initialize(config: GlobalConfigInterface): void {
        super.Initialize(config);

        this.Layers = [
            {
                applyCamera: false, components: [new ButtonComponent({
                    title: '< Go back',
                    backgroundColor: '#9a4f00ff',
                    color: 'white',
                    x: 20,
                    y: 20,
                    width: 500,
                    height: 100,
                }, () => {
                    this.m_config.EventHub.send(CEventType.LoadScene, 'MainMenu');
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
                    new CursorComponent(),
                    new CameraComponent(this.m_config.Camera),
                ]
            }
        ];
    }
}

export default Test01Scene;