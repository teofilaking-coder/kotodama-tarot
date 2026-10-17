/* Curated language preview: home shell and The Fool detail only. */
var appLanguage='ko';
try{appLanguage=localStorage.getItem('kotodama-language')||'ko';}catch(e){}
if(!['ko','ja','en'].includes(appLanguage))appLanguage='ko';
const FOOL_TRANSLATIONS={
 ja:{ko:'愚者',kw:['始まり','純粋さ','冒険'],arch:'永遠の子ども・放浪者',archNote:'まだ何も決まっていない状態。あらゆる物語の出発点です。',lit:'ぶつかって砕けよ',mean:'結果をあれこれ考える前に、まず挑戦してみようという言葉。失敗を恐れず、一歩踏み出すことを励まします。',q:'結果がわからなくても、まず始めてみたいことはありますか？',myth:{ko:'因幡の白兎',story:'海を渡ろうと、ワニ（鰐とも鮫とも解釈されます）をだまし、その背を跳んでいった兎。最後の一歩でうそがばれて毛を失いますが、その後、大国主に出会い、傷を癒やしてもらいます。'}},
 en:{ko:'The Fool',kw:['Beginnings','Innocence','Adventure'],arch:'The Eternal Child · The Wanderer',archNote:'Nothing is settled yet. This is the starting point of every story.',lit:'Throw yourself at it, even if you shatter.',mean:'An encouragement to try before worrying about the outcome: take the first step, even at the risk of failure.',q:'Is there something you want to begin, even without knowing how it will turn out?',myth:{ko:'The White Hare of Inaba',story:'To cross the sea, a hare tricks wani—interpreted as crocodiles or sharks—into forming a line and leaps across their backs. Its lie is exposed at the final step, and it loses its fur. Later, it meets Ōkuninushi, who helps heal its wounds.'}}
};
function localizedFool(c){const t=FOOL_TRANSLATIONS[appLanguage];return t?{...c,...t,myth:{...c.myth,...t.myth}}:c;}
(() => {
const ja=['言霊タロット','今日の日本語のひとこと、3枚で問うタロット、心に寄り添うおみくじ','今日のカード','質問タロット','おみくじ','78枚のカード','記録','言語','愚者のカードで言語切替を体験','体験版：メインの案内と「愚者」の詳細のみ3言語に対応しています。他の画面は韓国語です。'];
const en=['Kotodama Tarot','A Japanese phrase for today, a three-card reflection, and comforting omikuji','Today’s Card','Ask the Cards','Fortune Slip','78 Cards','Journal','Language','Try language switching with The Fool','Preview: the main introduction and The Fool detail support three languages. Other screens remain in Korean.'];
const els=[document.querySelector('h1'),document.querySelector('.head-text .sub'),...document.querySelectorAll('nav button'),document.getElementById('language-label'),document.getElementById('sample-card'),document.getElementById('language-note')];
const original=els.map(e=>e.innerHTML);
const pairs=[
 ['떠오르는 대로 적어보세요. 정답은 없습니다.','思い浮かぶままに書いてください。正解はありません。','Write whatever comes to mind. There is no right answer.'],['기록 고치기','記録を編集','Edit entry'],['기록 남기기','記録する','Save entry'],['다시 뽑기','もう一度引く','Draw again'],['하루 한 장이 원칙이지만, 오늘은 자유롭게.','基本は1日1枚ですが、今日は自由に。','Usually one card a day, but feel free to draw again today.'],['← 카드 목록','← カード一覧','← Card list'],['카드 속 신화·설화','カードの神話・伝承','Myth and folklore'],['오늘의 말','今日の言葉','Today’s phrase'],['직역: ','直訳：','Literal meaning: '],['원형','元型','Archetype'],['나에게 묻기','自分への問い','A question for yourself'],['마음이 끌리는 카드 한 장을 고르세요','心ひかれるカードを1枚選んでください','Choose a card that draws your attention'],['메이저 22장','大アルカナ22枚','22 Major Arcana'],['전체 78장','全78枚','All 78 cards'],['22장의 메이저 아르카나 중 한 장이 무작위로 나옵니다.','大アルカナ22枚から1枚がランダムに出ます。','One of the 22 Major Arcana cards is drawn at random.'],['마이너 56장(요괴 카드)까지 무작위로 나옵니다.','小アルカナ56枚（妖怪カード）も含めてランダムに出ます。','The draw includes the 56 Minor Arcana yokai cards.'],[' 일부 마이너 그림은 임시예요.',' 一部の小アルカナの絵は仮のものです。',' Some Minor Arcana illustrations are placeholders.']
];
let sample=false, lastReveal=null;
function translateView(){if(appLanguage==='ko')return;const isHome=!!view.querySelector('.pick');const isFool=view.querySelector('.jpname')?.textContent==='愚者';if(!isHome&&!isFool)return;
 const walker=document.createTreeWalker(view,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement.closest('textarea,svg'))continue;for(const p of pairs)n.nodeValue=n.nodeValue.replaceAll(p[0],p[appLanguage==='ja'?1:2]);}
}
function shell(){document.documentElement.lang=appLanguage;document.title=appLanguage==='en'?'Kotodama Tarot':appLanguage==='ja'?'言霊タロット':'코토다마 타로';els.forEach((e,i)=>{if(appLanguage==='ko')e.innerHTML=original[i];else e.textContent=(appLanguage==='ja'?ja:en)[i];});document.getElementById('app-language').value=appLanguage;}
// Reapply translated labels synchronously after rendering each supported view.
const reveal=renderReveal;
renderReveal=function(c,a,t){lastReveal={c,t};reveal(c,a,t);translateView();};
const today=renderToday;renderToday=function(){today();translateView();};
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{sample=false;}));
document.getElementById('sample-card').onclick=()=>{sample=true;document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-selected','false'));renderReveal(CARDS[0],false,false);};
document.getElementById('app-language').onchange=e=>{
 appLanguage=e.target.value;try{localStorage.setItem('kotodama-language',appLanguage);}catch(e){}shell();
 if(sample){renderReveal(CARDS[0],false,false);return;}
 if(view.querySelector('.jpname') && lastReveal?.c.n===0){const answer=document.getElementById('answer')?.value;renderReveal(lastReveal.c,false,lastReveal.t);if(answer!==undefined&&document.getElementById('answer'))document.getElementById('answer').value=answer;return;}
 const selected=document.querySelector('nav button[aria-selected="true"]');
 // Preserve saved state and do not redraw cards when changing the display language.
 if(selected?.dataset.view==='today'){const answer=document.getElementById('answer')?.value;renderToday();if(answer!==undefined&&document.getElementById('answer'))document.getElementById('answer').value=answer;}
};
shell();const selected=document.querySelector('nav button[aria-selected="true"]');if(selected?.dataset.view==='today')renderToday();
})();
