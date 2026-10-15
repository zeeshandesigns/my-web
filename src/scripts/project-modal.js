const dialog=document.querySelector('#projectModal');
if(dialog){
 const projects=JSON.parse(dialog.dataset.projects||'[]');
 const area=dialog.querySelector('#projectModalContent'),scroll=dialog.querySelector('#projectModalScroll'),loading=dialog.querySelector('#projectModalLoading');
 const title=dialog.querySelector('#projectModalTitle'),direct=dialog.querySelector('#projectModalDirectLink'),count=dialog.querySelector('#projectModalCounter');
 const viewer=dialog.querySelector('#projectModalImageViewer'),big=dialog.querySelector('#projectModalExpandedImage'),imgCount=dialog.querySelector('#projectModalImageCounter');
 let current=-1,origin=null,base=location.pathname,seq=0,imageIndex=0,imageLinks=[];
 const norm=u=>new URL(u,location.origin).pathname;
 const getIndex=u=>projects.findIndex(p=>norm(p.url)===norm(u));
 const updateNav=()=>{count.textContent=String(current+1).padStart(2,'0')+' / '+String(projects.length).padStart(2,'0');};
 async function open(index,{historyMode='push'}={}){
  if(index<0||index>=projects.length)return;
  const wasOpen=dialog.open;
  if(!wasOpen){origin=document.activeElement;base=location.pathname;dialog.showModal();}
  viewer.hidden=true;loading.hidden=false;area.innerHTML='';current=index;const token=++seq;
  title.textContent=projects[index].title;direct.href=projects[index].url;updateNav();
  if(historyMode==='push')history.pushState({projectModal:true},'',projects[index].url);
  if(historyMode==='replace')history.replaceState({projectModal:true},'',projects[index].url);
  try{
   const response=await fetch(projects[index].url);
   if(!response.ok)throw Error('Unable to load project.');
   const html=new DOMParser().parseFromString(await response.text(),'text/html');
   const main=html.querySelector('#main-content');
   if(!main)throw Error('No project content found.');
   if(token!==seq)return;
   area.innerHTML=main.innerHTML;scroll.scrollTop=0;area.querySelectorAll('script').forEach(x=>x.remove());
   loading.hidden=true;
  }catch(e){if(token!==seq)return;loading.hidden=true;area.innerHTML='<div class="project-modal-error"><h2>Preview Unavailable</h2><p>You can still view the full project page.</p><a href="'+projects[index].url+'" data-project-modal-bypass>Open Project ↗</a></div>';}
 }
 function dismiss({historyBack=true}={}){
  if(!dialog.open)return;seq++;viewer.hidden=true;dialog.close();
  if(historyBack&&history.state?.projectModal)history.back();
  else if(historyBack&&norm(location.pathname)!==norm(base))history.replaceState(null,'',base);
  if(origin&&origin.isConnected)origin.focus();
 }
 document.addEventListener('click',event=>{
  const link=event.target.closest?.('a[href]');
  if(!link||link.hasAttribute('data-project-modal-bypass')||link.target==='_blank'||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
  const index=getIndex(link.href);
  if(index<0)return;
  event.preventDefault();open(index,{historyMode:'push'});
 });
 dialog.querySelector('#projectModalClose').addEventListener('click',()=>dismiss());
 dialog.addEventListener('cancel',e=>{if(!viewer.hidden){e.preventDefault();viewer.hidden=true;return;}e.preventDefault();dismiss();});
 dialog.querySelector('#projectModalPrevious').addEventListener('click',()=>open((current+projects.length-1)%projects.length));
 dialog.querySelector('#projectModalNext').addEventListener('click',()=>open((current+1)%projects.length));
 dialog.addEventListener('click',event=>{
  const a=event.target.closest?.('.social-gallery-link');
  if(!a||!area.contains(a))return;
  event.preventDefault();imageLinks=[...area.querySelectorAll('.social-gallery-link')];
  imageIndex=imageLinks.indexOf(a);showImage(imageIndex);
 });
 function showImage(index){if(!imageLinks.length)return;imageIndex=(index+imageLinks.length)%imageLinks.length;const link=imageLinks[imageIndex];const img=link.querySelector('img');big.src=img?.dataset.fullSrc||link.href;big.alt=img?.alt||'Campaign artwork';imgCount.textContent=(imageIndex+1)+' / '+imageLinks.length;viewer.hidden=false;}
 dialog.querySelector('#projectModalImageClose').addEventListener('click',()=>{viewer.hidden=true;});
 dialog.querySelector('#projectModalImagePrevious').addEventListener('click',()=>showImage(imageIndex-1));
 dialog.querySelector('#projectModalImageNext').addEventListener('click',()=>showImage(imageIndex+1));
 window.addEventListener('keydown',e=>{if(!dialog.open||viewer.hidden)return;if(e.key==='ArrowRight')showImage(imageIndex+1);if(e.key==='ArrowLeft')showImage(imageIndex-1);});
 window.addEventListener('popstate',()=>{const i=getIndex(location.pathname);if(i>=0&&dialog.open)open(i,{historyMode:'none'});else dismiss({historyBack:false});});
}