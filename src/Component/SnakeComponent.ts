import { AbstractComponent, getConfig, GlobalConfigInterface, InputStateInterface } from '@ludeschersoftware/scenerenderer';
import GameOverComponent from './GameOverComponent';
import Ref from '@ludeschersoftware/ref';
import Rectangle from '../Rectangle';
import { randomInt } from '@ludeschersoftware/math';

interface Direction {
    x: number;
    y: number;
    key: string;
}

class SnakeComponent extends AbstractComponent {
    private m_config: GlobalConfigInterface;
    static TILE_SIZE: number = 50;
    static FOOD_POINTS: number = 50;

    private m_stop_game: Ref<boolean>;
    private m_height_range: number;
    private m_width_range: number;
    private m_snake: Rectangle[];
    private m_snake_direction: { x: number; y: number; };
    private m_old_update_tick: number;
    private m_foods: Rectangle[];
    private m_last_direction_key?: string;
    private m_game_over: Ref<boolean>;
    private m_score: Ref<number>;

    constructor(stopGame: Ref<boolean>) {
        super({ x: 0, y: 0, width: 0, height: 0 });

        this.m_config = getConfig("1");
        this.m_stop_game = stopGame;
        this.m_width_range = Math.floor(this.m_config.Canvas.width / SnakeComponent.TILE_SIZE);
        this.m_height_range = Math.floor(this.m_config.Canvas.height / SnakeComponent.TILE_SIZE);

        const SNAKE_POSITION = this._GetRandomPosition();
        this.m_snake = [new Rectangle(SNAKE_POSITION.x, SNAKE_POSITION.y, SnakeComponent.TILE_SIZE, SnakeComponent.TILE_SIZE)];

        const START_DIRECTION = this._GetStartDirection();
        this.m_snake_direction = { x: START_DIRECTION.x, y: START_DIRECTION.y };
        this.m_old_update_tick = Date.now();
        this.m_foods = [];
        this.m_last_direction_key = START_DIRECTION.key;
        this.m_game_over = new Ref(false);
        this.m_score = new Ref(0);

        this.m_foods.push(this._CreateFood());
        this.addComponent(new GameOverComponent(this.m_game_over, this.m_score));
    }

    public Initialize(): void { }

    public LoadContent(): void { }

    public Update(_deltaTime: number, inputState: InputStateInterface): void {
        if (this.m_stop_game.value || this.m_game_over.value) return;

        const keys = inputState.KeyboardKeyDown;

        if (this.m_last_direction_key !== 'KeyW' && this.m_last_direction_key !== 'KeyS' && keys['KeyW']) {
            this.m_snake_direction = { x: 0, y: -SnakeComponent.TILE_SIZE };
            this.m_last_direction_key = 'KeyW';
        } else if (this.m_last_direction_key !== 'KeyS' && this.m_last_direction_key !== 'KeyW' && keys['KeyS']) {
            this.m_snake_direction = { x: 0, y: SnakeComponent.TILE_SIZE };
            this.m_last_direction_key = 'KeyS';
        } else if (this.m_last_direction_key !== 'KeyA' && this.m_last_direction_key !== 'KeyD' && keys['KeyA']) {
            this.m_snake_direction = { x: -SnakeComponent.TILE_SIZE, y: 0 };
            this.m_last_direction_key = 'KeyA';
        } else if (this.m_last_direction_key !== 'KeyD' && this.m_last_direction_key !== 'KeyA' && keys['KeyD']) {
            this.m_snake_direction = { x: SnakeComponent.TILE_SIZE, y: 0 };
            this.m_last_direction_key = 'KeyD';
        }

        if (this.m_old_update_tick + 75 < Date.now()) {
            const head = this.m_snake[0]!;
            const newHead = new Rectangle(head.x + this.m_snake_direction.x, head.y + this.m_snake_direction.y, SnakeComponent.TILE_SIZE, SnakeComponent.TILE_SIZE);
            this.m_snake.unshift(newHead);

            if (
                newHead.x < 0 ||
                newHead.x > this.m_width_range * SnakeComponent.TILE_SIZE ||
                newHead.y < 0 ||
                newHead.y > this.m_height_range * SnakeComponent.TILE_SIZE
            ) {
                this.m_game_over.value = true;
            }

            for (let i = 1; i < this.m_snake.length; i++) {
                if (newHead.Intersects(this.m_snake[i]!)) {
                    this.m_game_over.value = true;
                }
            }

            for (let i = 0; i < this.m_foods.length; i++) {
                if (this.m_foods[i]!.Intersects(newHead)) {
                    this.m_foods[i] = this._CreateFood();
                    this.m_score.value += SnakeComponent.FOOD_POINTS;
                } else {
                    this.m_snake.pop();
                }
            }

            this.m_old_update_tick = Date.now();
        }
    }

    public Draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#327d00';
        for (const rect of this.m_snake) {
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }

        context.fillStyle = '#f54263';
        for (const rect of this.m_foods) {
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    }

    private _GetRandomPosition(): { x: number; y: number; } {
        return {
            x: randomInt(0, this.m_width_range) * SnakeComponent.TILE_SIZE,
            y: randomInt(0, this.m_height_range) * SnakeComponent.TILE_SIZE,
        };
    }

    private _CreateFood(): Rectangle {
        const FOOD_POSITION = this._GetRandomPosition();
        const RESULT = new Rectangle(FOOD_POSITION.x, FOOD_POSITION.y, SnakeComponent.TILE_SIZE, SnakeComponent.TILE_SIZE);

        for (const segment of this.m_snake) {
            if (RESULT.Intersects(segment)) return this._CreateFood();
        }

        for (const food of this.m_foods) {
            if (RESULT.Intersects(food)) return this._CreateFood();
        }

        return RESULT;
    }

    private _GetStartDirection(): Direction {
        const SNAKE_HEAD = this.m_snake[0]!;
        const WIDTH_DIFF = SNAKE_HEAD.x - (this.m_width_range * SnakeComponent.TILE_SIZE) / 2;
        const HEIGHT_DIFF = SNAKE_HEAD.y - (this.m_height_range * SnakeComponent.TILE_SIZE) / 2;

        let key = '';
        let x = 0;
        let y = 0;

        if (Math.abs(WIDTH_DIFF) > Math.abs(HEIGHT_DIFF)) {
            if (WIDTH_DIFF < 0) {
                key = 'KeyD';
                x = SnakeComponent.TILE_SIZE;
            } else {
                key = 'KeyA';
                x = -SnakeComponent.TILE_SIZE;
            }
        } else {
            if (HEIGHT_DIFF < 0) {
                key = 'KeyS';
                y = SnakeComponent.TILE_SIZE;
            } else {
                key = 'KeyW';
                y = -SnakeComponent.TILE_SIZE;
            }
        }

        return { key, x, y };
    }
}

export default SnakeComponent;