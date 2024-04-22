const myName = 'Francisco';
const myAge = 12;

const suma = (a: number, b:number) => {
  return a + b;
}

suma(12,22);

class Persona {
  constructor(private age: number, private name: string){
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `my name es ${this.name}, ${this.age}`;
  }
}

const francisco = new Persona(20,'Francisco');

francisco.getSummary();
