'use strict';
// {
//   document.querySelector('button').addEventListener('click',()=>{
//     const item0 = document.querySelectorAll("li")[0];
//     const copy = item0.cloneNode(true);
//     const ul = document.querySelector("ul");
//     const item2 = document.querySelectorAll('li')[2];
//     ul.insertBefore(copy, item2);
//   });
// }
// {
//   document.querySelector('button').addEventListener('click',()=>{
//     const item1 = document.querySelectorAll('li')[1];
//     // item1.remove();
//     document.querySelector('ul').removeChild(item1);
//   });
// }
'use strict';

(() => {
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  class Ball {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;
      this.vx = rand(3, 5) * (Math.random() < 0.5 ? 1 : -1);
      this.vy = rand(3, 5);
      this.isMissed = false;
    }

    getMissedStatus() {
      return this.isMissed;
    }

    bounce() {
      this.vy *= -1;
    }

    reposition(paddleTop) {
      this.y = paddleTop - this.r;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getR() {
      return this.r;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y - this.r > this.canvas.height) {
        this.isMissed = true;
      }

      if (
        this.x - this.r < 0 ||
        this.x + this.r > this.canvas.width
      ) {
        this.vx *= -1;
      }

      if (
        this.y - this.r < 0
      ) {
        this.vy *= -1;
      }
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  class Paddle {
    constructor(canvas,game) {
      this.canvas = canvas;
      this.game = game;
      this.ctx = this.canvas.getContext('2d');
      this.w = 60;
      this.h = 16;
      this.x = this.canvas.width / 2 - (this.w / 2);
      this.y = this.canvas.height - 32;
      this.mouseX = this.x;
      this.addHandler();
    }

    addHandler() {
      document.addEventListener('mousemove', e => {
        this.mouseX = e.clientX;
      });
    }

    update(ball) {
      const ballBottom = ball.getY() + ball.getR();
      const paddleTop = this.y;
      const ballTop = ball.getY() - ball.getR();
      const paddleBottom = this.y + this.h;
      const ballCenter = ball.getX();
      const paddleLeft = this.x;
      const paddleRight = this.x + this.w;
      
      if (
        ballBottom > paddleTop &&
        ballTop < paddleBottom &&
        ballCenter > paddleLeft &&
        ballCenter < paddleRight
      ) {
        ball.bounce();
        ball.reposition(paddleTop);
        this.game.addScore();
      }
      
      const rect = this.canvas.getBoundingClientRect();
      this.x = this.mouseX - rect.left - (this.w / 2);

      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x + this.w > this.canvas.width) {
        this.x = this.canvas.width - this.w;
      }
    }

    draw() {
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
  
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ball = new Ball(this.canvas);
      this.paddle = new Paddle(this.canvas,this);
      this.loop();
      this.isGameOver = false;
      this.score = 0;
    }

    addScore(){
      this.score++;
    }

    loop() {
      if (this.isGameOver) {
        return;
      }

      this.update();
      this.draw();

      requestAnimationFrame(() => {
        this.loop();
      });
    }

    update() {
      this.ball.update();
      this.paddle.update(this.ball);

      if (this.ball.getMissedStatus()) {
        this.isGameOver = true;
      }
    }

    draw() {
      if (this.isGameOver) {
        this.drawGameOver();
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.draw();
      this.paddle.draw();
      this.drawScore();
    }

    drawGameOver() {
      this.ctx.font = '28px "Arial Black"';
      this.ctx.fillStyle = 'tomato';
      this.ctx.fillText('GAME OVER', 50, 150);
    }

    drawScore() {
      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = '#fdfdfd';
      this.ctx.fillText(this.score,10,25);
    }
  }
  
  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return;
  }
  
  new Game(canvas);
})();// {
//   document.querySelector('form').addEventListener('submit',e =>{
//     e.preventDefault();
//     console.log('submit');
//   });
  // {
  //   document.querySelector('ul').addEventListener('click',e =>{
  //     if(e.target.nodeName === 'LI'){
  //       e.target.classList.toggle('done');
  //     }
  //   });
  // }
// }
// {
//   const text = document.querySelector('textarea');
//   text.addEventListener('focus',()=>{
//     console.log('focus');
//   });
//   text.addEventListener('blur',()=>{
//     console.log('blur');
//   });
//   text.addEventListener('input',()=>{
//     // console.log('input');
//     console.log(text.value.length);
//   });
//   text.addEventListener('change',()=>{
//     console.log('change');
//   });
// }
// {
//   document.querySelector('button').addEventListener('dblclick',()=>{
//     console.log('hello');
//   });
//   document.addEventListener('mousemove',e =>{
//     console.log(e.clientX,e.clientY);
//   });
//   document.addEventListener('keydown',e =>{
//     console.log(e.key);
//   });
// }
// {
//   document.querySelector('button').addEventListener('click',()=>{
//     const li = document.createElement('li');
//     const colors = document.querySelectorAll('input');
//     let colorSelector = [];
//     colors.forEach((color)=>{
//       if(color.checked === true){
//         colorSelector.push(color.value);
//       }
//     });
//     if (colorSelector.length === 0){
//       alert('Not checked');
//     }
//     li.textContent = colorSelector.join('&');
//     document.querySelector('ul').appendChild(li);
//     const btn = querySelector(`input[value=${colorSelector}]`);
//     btn.checked = false;
//   });
// }
// {
//   document.querySelector('button').addEventListener('click',()=>{
//     const colors = document.querySelectorAll('input');
//     const li = document.createElement('li');
//     let selectedColor;
//     colors.forEach((color) => {
//       if (color.checked === true){
//         selectedColor = color.value;
//       }
//     });
//     li.textContent = selectedColor;
//     document.querySelector('ul').appendChild(li);
//     const button = document.querySelector(`input[value=${selectedColor}]`);
//     button.checked = false
//   });
// }
// {
//   document.querySelector('button').addEventListener('click',()=>{
//     const li = document.createElement('li');
//     const color = document.querySelector('select');
//     li.textContent = `${color.value} - ${color.selectedIndex}`;
//     document.querySelector('ul').appendChild(li);
//   });
// }
// {
//   document.getElementById('acction-btn').addEventListener('click',()=>{
//     const li = document.createElement('li');
//     const text = document.getElementById('input_acction');
//     li.textContent = text.value;
//     document.getElementById('ul-text').appendChild(li);
//     text.value = "";
//     text.focus();
//   });
// }
// {
//   document.querySelector('button').addEventListener('click',()=> {
//     const li = document.createElement('li');
//     const text = document.querySelector('input');
//     li.textContent = text.value;
//     document.querySelector('ul').appendChild(li);
//     text.value = '';
//     text.focus();
//   });
// }
// {
//   document.querySelector('button').addEventListener('dblclick',() => {
//     document.querySelectorAll('p').forEach((p,index) =>{
//       p.textContent = `${index}番目のP`;
//     });
//     document.querySelector('h1').textContent = 'いいじゃん';
//   });
// }
// {
//   document.querySelector('button').addEventListener('click',()=>{
//     const targetNode = document.getElementById('target');
//     targetNode.textContent = targetNode.dataset.translation;
//   });
// }
// {
//   document.querySelector('button').addEventListener('click', () => {
//     const targetNode = document.getElementById('target');
//     targetNode.classList.toggle('my-color');
//     // if (targetNode.classList.contains('my-color') === true ){
//     //   targetNode.classList.remove('my-color');
//     // } else {
//     //   targetNode.classList.add('my-color');
//     // }
//   });
// }
// {
//   document.querySelector('button').addEventListener('click', () => {
//     const targetNode = document.getElementById('target');
//     targetNode.className = 'my-color my-border';
//   });
// }
// {
//   document.querySelector('button').addEventListener('click',() => {
//     const targetNode = document.getElementById('target');
//     targetNode.textContent = 'Change!';
//     targetNode.title = 'This is title';
//     targetNode.style.color = 'red';
//     targetNode.style.backgroundColor = 'skyblue';
//   });
// }
// {
//     function update(){
//       document.querySelector('h1').textContent = 'Change!';
//   //   //   // document.querySelector('#target').textContent = 'Change!';
//   //   //   // document.getElementById('target').textContent = 'Idで変更しました';
//       document.querySelectorAll('p').forEach((p,index) =>{
//         p.textContent = `${index}changePPP`;
//       });
//     }
//   document.getElementById('event').addEventListener('dublclick',update);
// }
// {
//   function update(){
//     document.querySelector('h1').textContent = 'Change!';
// //   //   // document.querySelector('#target').textContent = 'Change!';
// //   //   // document.getElementById('target').textContent = 'Idで変更しました';
//     document.querySelectorAll('p').forEach((p,index) =>{
//       p.textContent = `${index}changePPP`;
//     });
//   }
//   setTimeout(update,1000)
// }
  // function update(){
  //   // document.querySelectorAll('p')[1].textContent = 'p';
  //   document.querySelectorAll('p').forEach(function(p,index){
  //     p.textContent = `${index}番目のPっすね`;
  //   });
  // }
  // function update(i){
  //   document.querySelectorAll('p').forEach((p,index) => {
  //     p.textContent = `${index}番目のPだけど${i}`;
  //   });
  // }
  // function tt(){
  //   document.getElementById('item1').textContent = '111'
  // }
  // function tt2(){
  //   document.getElementById('item2').textContent = '222'
  // }
  // function tt3(){
  //   document.getElementById('item3').textContent = '333'
  // }
  // const gg = () => {
  //   document.getElementById('target').textContent = 'ffff';
  // }

  // setTimeout(function(){
  //   update('がんばれ');
  // },3000);
  // setTimeout(gg, 2000);
  // setTimeout(update, 3000);
  // setTimeout(gg, 4000);
  // setTimeout(tt, 1000);
  // setTimeout(tt2, 2000);
  // setTimeout(tt3, 3000);
  // document.getElementById('target').addEventListener('click',tt)
// }
// {
//   class Post {
//     constructor(text) {
//       this.text = text;
//       this.lickcount = 0;
//     }
//     show(){
//       console.log(`${this.text}${this.lickcount}`);
//     }
//   }
//   const word = new Post('今からお前に何話そうかなどうやってこの感じ伝えようかな少し長く掛かるかもなでもね頑張ってみるよ');
//   word.show();
// }
// {
//   class Post {
//     constructor(text){
//       this.text = text
//       this.likeCount = 0
//     }
//     show() {
//       console.log(`${this.text} - ${this.likeCount}いいね`);
//     }
//     like(){
//       this.likeCount++;
//       this.show();
//     }
//   }
//   class SponsoredPost extends Post{
//     constructor(text,sponsor){
//       super(text);
//       this.sponsor = sponsor
//     }
//     show() {
//       super.show();
//       console.log(`...sponsored by ${this.sponsor} - ${this.likeCount}like`);
//     }
//   }
//   const posts = [
//     new SponsoredPost('プログラミングむずい','ドットインストール'),
//     new SponsoredPost('がんばれ','ドットインストール'),
//   ]
//   posts[0].show();
//   posts[1].show();
//   posts[0].like();
//   posts[1].like();

//   // Post.showInfo();
// }
// {
//   class Post {
//     constructor(text, count){
//       this.text = text
//       this.likecount = count
//     }
//     show(){
//       console.log(`${this.text} - ${this.likecount}いいね`);
//     }
//     like(){
//       this.likecount++;
//       this.show();
//     }
//     static showInfo() {
//       console.log('Post version 1.0');
//     }
//   }
//   const posts = [
//     new Post('美味しい',2),
//     new Post('むずい',0),
//   ];
//   Post.showInfo();
//   // posts[0].like();
//   // posts[1].like();
// }
// {
//   class Post {
//     constructor(text) {
//       this.text = text
//       this.likecount = 0
//     }
//     show(){
//       console.log(`${this.text}${this.likecount}`);
//     }
//   }
//   const posts = [
//     new Post('puroguramingutanosii'),
//     new Post('helloworld'),
//   ];
//   posts[0].show();
//   posts[1].show();
// }
// {
//   const posts = [
//     {
//       text: 'Javascriptの勉強中',
//       likecount: 0,
//     },
//     {
//       text: 'puroguramingtanosii',
//       likecount: 0,
//     },
//   ];
//   function show(post){
//     console.log(`${post.text} - ${post.likecount}いいね`);
//   }
//   show(posts[0]);
//   console.log(posts[0]);
// }
// {
//   // const name = 'taguchi';
//   const name = 2;
//   try {
//     console.log(name.toUpperCase());
//   } catch (e) {
//     console.log('hello');
//   }
//   console.log('Finish!');
// }
// {
//   const d = new Date();
//   console.log(`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日${d.getHours()}時${d.getMinutes()}分${d.getSeconds()}秒`);
// }
// {
//   let i = 0;
//   function showTime(){
//     console.log(new Date());
//     const timeOutId = setTimeout(showTime,1000);
//     i++;
//     if(i > 5){
//       clearTimeout(timeOutId);
//     }
//   }
//   showTime();
// }
// let i = 0;
// function showTime(){
//   const d = new Date();
//   console.log(d.getHours());
//   const timeout = setTimeout(showTime,1000);
//   i++;
//   if(i > 5){
//     clearTimeout(timeout);
//   }

// }
// showTime();
// {
//   let i = 0;
//   function showTime() {
//     console.log(new Date());
//     i++;
//     if (i > 2){
//       clearInterval(intervalId);
//     }
//   }
//   const intervalId = setInterval(showTime, 1000);
// }
// let i = 0;
// function showTime(){
//   console.log(new Date());
//   i++;
//   if (i > 2){
//     clearInterval(intervalId);
//   }
// }
// const intervalId = setInterval(showTime, 1000);
// {
//   // alert('hello');
//   const answer = confirm('削除しますか？');
//   if (answer){
//     console.log('削除しました');
//   } else {
//     console.log('キャンセルしました');
//   }
// }

// {
//   const d = new Date(2019, 10);
//   d.setHours(10,20,30);
//   d.setDate(d.getDate() + 3)
//   console.log(d);
// }
// {
//   // console.log(Math.random());
//   // 0.1.2
//   // console.log(Math.floor(Math.random() * 3)+ 1 );
//   // 0,...,n
//   // console.log(Math.floor(Math.random()* (3 + 1 -1)));
//   console.log(Math.floor(Math.random() * (5 + 1 - 1)) + 1);
//   // console.log(Math.floor(Math.random() * 6) + 1);
// }

// {
//   const g = [1,2,3,4,5,6];
//   const evenG = g.filter(g => g %2 ===0);
//   console.log(evenG);
//   console.log(evenG[2]);
// }

// {
//   const scores = [10,3,9];
//   let sum = 0;
//   scores.forEach(score => {
//     sum += score;
//   });
//   const avg = sum / scores.length;
//   // console.log(sum);
//   // console.log(avg);
//   console.log(Math.floor(avg));
//   console.log(Math.ceil(avg));
//   console.log(Math.round(avg));
//   console.log(avg.toFixed(3));
//   console.log(Math.random());
// }
// {
//   const str = 'hello'
//   console.log(str.length);
//   console.log(str.substring(2,4));
//   console.log(str);
// }
// {
//   const sss = {a:"ss",b:"ggg",c:"aa",};
//   console.log(sss['c']);

//   const aaa = Object.keys(sss);
//   console.log(aaa[1]);
//   aaa.forEach(aa => {
//     console.log(`b:${aa}:${sss[aa]}`);
//   });
//   console.log(aaa[1]);

// }
// {
//   const d = [2019,11,14];
//   console.log(d);
//   console.log(d.join('/'));
//   console.log(d.join(''));

//   const t = '11:22:33:44'
//   console.log(t.split(':'));
//   const [hour,minute,second] = (t.split(':'));
//   console.log(hour);
//   console.log(minute);
//   console.log(second);
// }

// {
  // const point = {x: 100, y:300};
  // const otherProps = {
  //   r: 4,
  //   color: 'red',
  // };

  // {
  //   let x = 1;
  //   let y = x;
  //   x = 5;
  //   console.log(x);
  //   console.log(y);
  // }
  // {
  //   let x = [1,2];
  //   let y = x;
  //   x[0] = 5;
  //   console.log(x);
  //   console.log(y);
  // }
  // {
  //   let x = [1,2];
  //   let y = [...x];
  //   x[0] = 5;
  //   console.log(x);
  //   console.log(y);
  // }

  // const point = {
  //   x: 100,
  //   y: 300,
  // };

  // const keys = Object.keys(point);
  // console.log(keys[0])
  // keys.forEach(key => {
  //   console.log(`Key: ${key} Valune: ${point[key]}`);
  // });

  // const points =[
  //   {x:30, y:50},
  //   {x:40, y:60},
  //   {x:50, y:70},
  // ];

  // console.log(points);
  // console.log(points[1].y);
  // console.log(points[2]['x']);

  // const point = {
  //   x: 100,
  //   y: 300,
  //   ...otherProps,
  // };

  // const {x,r,...others} = point;
  // console.log(x);
  // console.log(r);
  // console.log(others);
  // console.log(others.color);
  // console.log(others['color']);
  // console.log(others.y);
  // console.log(others['y']);
  // point.x = 150;
  // point['y'] = 210;
  // console.log(point.x);
  // console.log(point['y']);

  // point.z = 200;
  // delete point.x;
  // console.log(point);
// }

// const prices = [600,520,810,100];

// const evenPrice = prices.filter((price,index) => {
//   price - 30 <= 500;
//   console.log(`Price500以下${index + 1}:${price}`);
// });
// console.log(evenPrice);
// const evenPrice = prices.filter(price => price - 30 <= 500);
// console.log(evenPrice);

// {
  // const score1 = 80;
  // const score2 = 90;
  // const score3= 40;

  // const numbers = [1,4,7,8,10];
  // const evenNumbers = numbers.filter(number => number % 2 !== 0 );
  // console.log(evenNumbers);

  // const numbers = [1,4,7,8,10];
  // const evenNumbers = numbers.filter(number => number % 2 === 0 );
  // console.log(evenNumbers);

// const numbers = [1,4,7,8,10];
// const evenNumbers = numbers.filter(number => {
//   if (number % 2 === 0){
//     return true;
//   } else {
//     return false;
//   }
// });
// console.log(evenNumbers);
// const i = ((g,h) => {
//   return g + h;
// });
// console.log(i(5,6))

  // const scores = [55,60,88];
  // const updateScores = scores.map(score => score + 13);
  // console.log(updateScores);
  // // const otherScores = [10,20];
  // const prices = [100,190,350];
  // // const updatePrices = prices.map((price) => {
  // //   return price + 20;
  // // });
  // const updatePrices = prices.map(price => price + 20);
  // console.log(updatePrices);
  // scores.forEach((score,index) => {
  //   console.log(`Score${index}:${score}`)
  // });
  // scores.forEach(function(score,index){
  //   console.log(`Score${index}:${score}`)
  // });

  // const [a,b,c,d] = scores;
  // console.log(a);
  // console.log(b);
  // console.log(c);
  // console.log(d);
  // console.log(scores);
  // const [a,b,...others] = scores;
  // console.log(a);
  // console.log(b);
  // console.log(others);
  // function sum(a,b,c,d,e,f){
    // let x = 30;
    // let y = 70;
    // console.log(x);
    // console.log(y);
    // [x,y] = [y,x];
    // console.log(x);
    // console.log(y);

  //   console.log(a+b+c+d+e+f);
  // }
  // sum(...scores);
  // console.log(`Score: ${scores[0]}`);
  // console.log(`Score: ${scores[1]}`);
  // console.log(`Score: ${scores[2]}`);
  // scores.splice(1,1,40,50);
  // // scores.pop();
  // // for (let i = 0; i < 3; i++){
  // for (let i = 0; i < scores.length; i++){
  //   console.log(`Score ${i}:${scores[i]}`);
  // }
  // console.log(score[1]);
  // console.log(scores.length);

  // scores[2] = 44;
  // console.log(scores[2]);
// }