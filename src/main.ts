import { Renderer } from '@ludeschersoftware/scenerenderer';
import MainMenuScene from './Scene/MainMenuScene';
import Test01Scene from './Scene/Test01Scene';
import SnakeScene from './Scene/SnakeScene';

(function () {
    const WRAPPER: HTMLDivElement | null = (document.getElementById("wrapper") as HTMLDivElement | null);

    if (WRAPPER === null) {
        return;
    }

    const REN1: Renderer = new Renderer({
        Container: WRAPPER,
        Id: "1",
    });

    REN1.RegisterScene(new MainMenuScene());
    REN1.RegisterScene(new Test01Scene());
    REN1.RegisterScene(new SnakeScene());

    REN1.RunAsync("MainMenu");
})();