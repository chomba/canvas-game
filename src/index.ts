import { Check } from "./shared/Check";
import { App } from "./ui/App";

let app = new App();
app.startup();

console.log(app.game.board.control);

class Animal { }
class Dog extends Animal { }
class Bird extends Animal { }
let x: Animal = new Dog();

console.log(x instanceof Dog);
// console.log(Check.isOf<Dog>(x));