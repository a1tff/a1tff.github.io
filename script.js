// DATA
const games = [
  {name:'Free Fire', id:'ff', icon:'FF'},
  {name:'Mobile Legends', id:'mlbb', icon:'ML'},
  {name:'PUBG Mobile', id:'pubg', icon:'PUBG'},
  {name:'BGMI', id:'bgmi', icon:'BGMI'},
  {name:'Honor Of Kings', id:'hok', icon:'HOK'},
  {name:'COD Mobile', id:'cod', icon:'COD'}
];

const slides = [
  {title:'Free Fire', sub:'Top Up Diamonds Instantly'},
  {title:'Mobile Legends', sub:'Get Your Skins Now'},
  {title:'PUBG Mobile', sub:'Buy UC at Best Price'},
  {title:'Honor Of Kings', sub:'Purchase Tokens'},
  {title:'COD Mobile', sub:'CP Top Up Fast'}
];

const mlPackages = [
  {name:'86 Diamonds', old:'₹89', price:'₹79'},
  {name:'172 Diamonds', old:'₹179', price:'₹159'},
  {name:'257 Diamonds', old:'₹269', price:'₹239'},
  {name:'Weekly Diamond Pass', old:'₹189', price:'₹169'},
  {name:'Twilight Pass', old:'₹1199', price:'₹1099'}
];

// LOADER
window.onload = () => setTimeout(()=>document.getElementById('loader').style.display='none',1500);
window.onscroll = () => document.getElementById('header').classList.toggle('shrink', window.scrollY > 20);

// THEME
function toggleTheme(){document.body.classList.toggle('light');}

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

// OPEN GAME PAGE WITH PACKAGES
function openGame(id){
  let game = games.find(g=>g.id===id);
  let pkgHTML = '';
  
  if(id==='mlbb'){
    pkgHTML = mlPackages.map(p=>`
      <div class="glass" style="padding:12px;margin:8px 0;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <p><b>${p.name}</b></p>
          <p style="color:var(--grey);text-decoration:line-through;font-size:12px;">${p.old}</p>
        </div>
        <div>
          <p style="color:var(--s);font-weight:700;">${p.price}</p>
          <button onclick="placeOrder('${game.name}','${p.name}','${p.price}')" style="background:var(--s);color:#000;border:none;padding:6px 12px;border-radius:8px;">BUY</button>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('gamePage').innerHTML = `
    <header class="glass"><i class="fas fa-arrow-left" onclick="showPage('homePage')"></i><h3>${game.name}</h3></header>
    <div class="section">
      <input id="playerId" placeholder="Enter Player ID" class="glass" style="width:100%;padding:12px;border:none;margin:10px 0;color:#fff;background:rgba(0,0,0,0.3);">
      ${id==='mlbb'?'<input id="serverId" placeholder="Enter Server ID" class="glass" style="width:100%;padding:12px;border:none;margin:10px 0;color:#fff;background:rgba(0,0,0,0.3);">':''}
      <button class="glass" style="width:100%;padding:12px;background:var(--s);color:#000;border:none;" onclick="validatePlayer('${id}')">Continue</button>
      <div id="playerInfo" style="display:none;margin-top:10px;"></div>
      <h3 style="margin-top:20px;">Select Package</h3>
      ${pkgHTML}
    </div>`;
  showPage('gamePage');
}

// PLAYER VALIDATION
function validatePlayer(id){
  let pid = document.getElementById('playerId').value;
  document.getElementById('playerInfo').style.display='block';
  document.getElementById('playerInfo').innerHTML = `<p class="glass" style="padding:10px;color:var(--s)">✓ Verified: Player_${pid}</p>`;
}

// WHATSAPP ORDER
function placeOrder(game, pkg, price){
  let pid = document.getElementById('playerId').value;
  let sid = document.getElementById('serverId')?.value || 'N/A';
  let time = new Date().toLocaleString();
  let msg = `*NEW ORDER - A1T STORE*%0A%0A` +
            `Game: ${game}%0A` +
            `Package: ${pkg}%0A` +
            `Price: ${price}%0A` +
            `Player ID: ${pid}%0A` +
            `Server ID: ${sid}%0A` +
            `Time: ${time}%0A` +
            `Status: Pending Payment`;
  window.open(`https://wa.me/918638125856?text=${msg}`,'_blank');
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
