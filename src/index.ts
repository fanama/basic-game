import { keyboardEvents } from "./interface/keyboard";
import { useDom } from "./app/useDom";
import { Snake } from "./domain/snake";

const hero = new Snake();

const { run } = useDom();

const goal = new Snake(400, 400);

keyboardEvents(hero);

run(hero, goal);
