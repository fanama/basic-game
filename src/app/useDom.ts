import { Snake } from "../domain/snake";

export function useDom() {
  const getBoard = (width: number = 500, height: number = 500) => {
    const svg = document.getElementById("board");
    if (!svg) {
      const playground = document.getElementById("playground");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", "board");
      svg.setAttribute("width", `${width}`);
      svg.setAttribute("height", `${height}`);
      playground.appendChild(svg);
      return svg;
    }
    return svg;
  };

  function initEnemies(numberOfEnemy: number): Snake[] {
    const enemies: Snake[] = [];
    const { width, height } = getBoard().getBoundingClientRect();

    for (let i = 0; i < numberOfEnemy; i++) {
      enemies.push(
        new Snake(50 + Math.random() * width, Math.random() * height + 50)
      );
    }
    return enemies;
  }

  const getSnakeDisplay = (id: string) => {
    let snakeDisplay = document.getElementById(id);

    if (!snakeDisplay) {
      const snakeSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      const svg = getBoard();
      snakeSVG.setAttribute("id", id);
      svg.appendChild(snakeSVG);
      return snakeSVG;
    }

    return snakeDisplay;
  };

  const increaseScore = () => {
    let score = document.getElementById("score");

    const value = parseInt(score.innerHTML);
    score.innerHTML = `${value + 1}`;
    return;
  };

  const moveElement = (snake: Snake, id: string) => {
    const snakeDisplay = getSnakeDisplay(id);

    const board = getBoard();
    const { width, height } = board.getBoundingClientRect();

    snakeDisplay.setAttribute("r", `${snake.getRadius()}`);
    snakeDisplay.setAttribute("cy", `${snake.getY()}`);
    snakeDisplay.setAttribute("cx", `${snake.getX()}`);
    snakeDisplay.setAttribute(
      "fill",
      id == "snake" ? "blue" : id == "goal" ? "yellow" : "red"
    );

    snake.move(width, height);
  };

  const run = (p1: Snake, goal: Snake) => {
    let level = 10;
    let enemies = initEnemies(level);

    setInterval(() => {
      moveElement(p1, "snake");
      for (const enemy of enemies) {
        p1.collision(
          enemy.coordonates.x,
          enemy.coordonates.y,
          enemy.getRadius()
        );
        moveElement(enemy, `p${enemies.indexOf(enemy)}`);
      }
      if (p1.goal(goal)) {
        level += 5;
        increaseScore();
        enemies = initEnemies(level);
      }
      moveElement(goal, `goal`);
    }, 0.05 * 1000);
  };

  return { initEnemies, run };
}
