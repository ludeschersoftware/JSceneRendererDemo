import { Vec2 } from 'gl-matrix';
import { Renderer, Camera2D } from '@ludeschersoftware/scenerenderer';
import MainMenuScene from './Scene/MainMenuScene';
import Test01Scene from './Scene/Test01Scene';
import SnakeScene from './Scene/SnakeScene';

(function () {
    const WRAPPER: HTMLDivElement | null = (document.getElementById("wrapper") as HTMLDivElement | null);

    if (WRAPPER === null) {
        return;
    }

    const CAM2D = new Camera2D(new Vec2(WRAPPER.clientWidth, WRAPPER.clientHeight));

    const REN1: Renderer = new Renderer({
        Container: WRAPPER,
        Id: "1",
    });

    REN1.RegisterScene(new MainMenuScene("MainMenu", WRAPPER));
    REN1.RegisterScene(new Test01Scene("Test01", CAM2D, WRAPPER));
    REN1.RegisterScene(new SnakeScene("snake", WRAPPER));

    REN1.RunAsync("MainMenu");
})();