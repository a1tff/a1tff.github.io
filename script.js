// DATA
const games = [
  {name:'Free Fire', id:'ff', icon:'FF'},
  {name:'Mobile Legends', id:'mlbb', icon:'ML'},
  {name:'PUBG Mobile', id:'pubg', icon:'PUBG'},
  {name:'BGMI', id:'bgmi', icon:'BGMI'},
  {name:'Honor Of Kings', id:'hok', icon:'HOK'},
  {name:'COD Mobile', id:'cod', icon:'COD'},
  {name:'Genshin Impact', id:'genshin', icon:'GI'},
  {name:'Wuthering Waves', id:'wuwa', icon:'WW'}
];

const slides = [
  {title:'Free Fire', sub:'Top Up Diamonds Instantly'},
  {title:'Mobile Legends', sub:'Get Your Skins Now'},
  {title:'PUBG Mobile', sub:'Buy UC at Best Price'},
  {title:'Honor Of Kings', sub:'Purchase Tokens'},
  {title:'COD Mobile', sub:'CP Top Up Fast'}
];

// LOADER
window.onload = () => setTimeout(()=>document.getElementById('loader').style.display='none',1500);

// HEADER SCROLL
window.onscroll = () => document.getElementById('header').classList.toggle('shrink', window.scrollY > 20);

// THEME
function toggleTheme(){
  document.body.classList.toggle('light');
  localStorage.theme = document.body.classList.contains('light') ? 'light' : 'dark';
}
if(localStorage.theme==='light') document.body.classList.add('light');

// SLIDER
let slideIndex=0;
function renderSlider(){
  document.getElementById('slides').innerHTML = slides.map(s=>`
    <div class="slide">
      <h3>${s.title}</h3><p>${s.sub}</p>
      <button onclick="toast('Shop Now')">SHOP NOW</button>
    </div>`).join('');
  setInterval(()=>{slideIndex=(slideIndex+1)%slides.length;document.getElementById('slides').style.transform=`translateX(-${slideIndex*100}%)`},4000);
}

// GAMES
function renderGames(){
  document.getElementById('gameGrid').innerHTML = games.map(g=>`
    <div class="gameCard glass" onclick="openGame('${g.id}')">
      <div class="icon">${g.icon}</div>
      <p>${g.name}</p>
    </div>`).join('');
}

// OPEN GAME PAGE
function openGame(id){
  let game = games.find(g=>g.id===id);
  document.getElementById('gamePage').innerHTML = `
    <header class="glass"><i class="fas fa-arrow-left" onclick="showPage('homePage')"></i><h3>${game.name}</h3></header>
    <div class="section">
      <input id="playerId" placeholder="Enter Player ID" class="glass" style="width:100%;padding:12px;border:none;margin:10px 0;">
      ${id==='mlbb'?'<input id="serverId" placeholder="Enter Server ID" class="glass" style="width:100%;padding:12px;border:none;margin:10px 0;">':''}
      <button class="glass" style="width:100%;padding:12px;background:var(--s);color:#000;border:none;" onclick="validatePlayer('${id}')">Continue</button>
      <div id="playerInfo" style="display:none;margin-top:10px;"></div>
    </div>`;
  showPage('gamePage');
}

// PLAYER VALIDATION PLACEHOLDER
function validatePlayer(id){
  let pid = document.getElementById('playerId').value;
  document.getElementById('playerInfo').style.display='block';
  document.getElementById('playerInfo').innerHTML = `<p class="glass" style="padding:10px;color:var(--s)">✓ Verified: Player_${pid}</p>`;
}

// PAGE SWITCH
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// TOAST + SHEET
function toast(msg){let t=document.getElementById('toast');t.innerText=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2000);}
function openSheet(){document.getElementById('sheet').classList.add('active');}
function closeSheet(){document.getElementById('sheet').classList.remove('active');}
function openSupport(){window.open('https://wa.me/918638125856','_blank');}

// INIT
renderSlider(); renderGames();
