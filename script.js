async function loadGames(){
  const grid = document.getElementById('gameGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  function render(){
    const q = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    grid.innerHTML = "";
    games
      .filter(g=> (cat==="all"||g.category===cat) && g.title.toLowerCase().includes(q))
      .forEach(g=>{
        const div=document.createElement('div');
        div.className='card';
        div.textContent=g.title;
        div.onclick=()=>openGame(g.url);
        grid.appendChild(div);
      });
  }

  const categories=[...new Set(games.map(g=>g.category))];
  categories.forEach(c=>{
    const opt=document.createElement('option');
    opt.value=c; opt.textContent=c;
    categoryFilter.appendChild(opt);
  });

  searchInput.oninput=render;
  categoryFilter.onchange=render;
  render();
}

function openGame(url){
  const modal=document.getElementById('modal');
  const frame=document.getElementById('gameFrame');
  frame.src=url;
  modal.style.display='flex';
}

document.getElementById('closeModal').onclick=()=>{
  document.getElementById('modal').style.display='none';
  document.getElementById('gameFrame').src="";
};

document.addEventListener('DOMContentLoaded',loadGames);
