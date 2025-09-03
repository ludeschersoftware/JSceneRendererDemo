import Ref from "@ludeschersoftware/ref";
import { AbstractScene, GlobalConfigInterface } from "@ludeschersoftware/scenerenderer";
import SnakeComponent from "../Component/SnakeComponent";
import MenuComponent from "../Component/MenuComponent";
import FPSComponent from "../Component/FPSComponent";
import CursorComponent from "../Component/CursorComponent";
import SceneId from "../Enum/SceneId";

class SnakeScene extends AbstractScene {
    private m_stop_game: Ref<boolean>;

    constructor() {
        super(SceneId.Snake);

        this.m_stop_game = new Ref(false);
    }

    public override Initialize(config: GlobalConfigInterface): void {
        super.Initialize(config);

        this.Layers = [
            {
                applyCamera: false,
                components: [new SnakeComponent(this.m_stop_game)],
            },
            {
                applyCamera: false,
                components: [new MenuComponent(this.m_stop_game)],
            },
            {
                applyCamera: false,
                components: [new FPSComponent(), new CursorComponent()],
            },
        ];

        this.m_stop_game.value = false;
    }
}

export default SnakeScene;