import { Snake } from "../domain/snake";

export function keyboardEvents(snake: Snake) {
  document.addEventListener(
    "keydown",
    (event) => {
      var code = event.code;
      switch (code) {
        case "ArrowUp":
          snake.up();
          break;
        case "ArrowDown":
          snake.down();
          break;
        case "ArrowLeft":
          snake.left();
          break;
        case "ArrowRight":
          snake.right();
          break;
        case "Space":
          snake.pause();
          break;
        default:
          return;
      }
    },
    false
  );
}
