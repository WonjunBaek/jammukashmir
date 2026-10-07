import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Plus, Minus, Sun, MoveUpRight } from 'lucide-react';

const products = [
  { id: 'knit', category: '니트웨어', name: 'The Soft Essential', ko: '소프트 캐시미어 니트', color: 'OATMEAL', shade: '#c8b9a3', position: '0%', description: '여유로운 실루엣과 차분한 오트밀 컬러. 하나만으로도, 여러 겹으로도 자연스럽게 어우러지는 일상의 니트입니다.' },
  { id: 'cardigan', category: '니트웨어', name: 'A Gentle Layer', ko: '클래식 캐시미어 카디건', color: 'WARM TAUPE', shade: '#a48b72', position: '50%', description: '가볍게 걸치는 순간 완성되는 편안함. 부드러운 색감과 단정한 디테일로 계절 사이의 일상을 함께합니다.' },
  { id: 'scarf', category: '액세서리', name: 'Wrapped in Warmth', ko: '캐시미어 머플러', color: 'NATURAL IVORY', shade: '#e0d5c4', position: '100%', description: '몸 가까이 닿는 부드러움. 포근한 볼륨과 자연스러운 드레이프로 당신의 하루에 작은 온기를 더합니다.' },
];

const care = [
  ['부드럽게 세탁하기', '찬물 또는 미지근한 물에 울 전용 세제를 풀어 가볍게 손세탁하세요. 제품별 케어 라벨을 먼저 확인하고, 비비거나 비틀어 짜지 않는 것이 좋습니다.'],
  ['천천히, 자연스럽게 말리기', '깨끗한 수건으로 눌러 물기를 제거한 뒤, 형태를 정돈해 그늘에서 평평하게 말려주세요. 옷걸이에 걸어 말리면 형태가 늘어날 수 있습니다.'],
  ['오래 곁에 두는 보관법', '충분히 건조한 니트는 접어서 통풍이 되는 곳에 보관하세요. 마찰로 생기는 보풀은 전용 도구로 조심스럽게 정리하고, 착용 후에는 잠시 쉬게 해주세요.'],
];

function ProductDialog({ product, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    const onCancel = (event) => { event.preventDefault(); onClose(); };
    element.addEventListener('cancel', onCancel);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element.removeEventListener('cancel', onCancel); document.body.style.overflow = previous; };
  }, [onClose]);
  return <dialog ref={dialog} className="product-dialog" aria-labelledby="product-title" onClick={(event) => { if (event.target === dialog.current) onClose(); }}>
    <button className="dialog-close icon-button" onClick={onClose} aria-label="상품 정보 닫기"><X size={22} /></button>
    <div className="dialog-image product-image" style={{ '--product-position': product.position }} />
    <div className="dialog-content"><span className="eyebrow">THE EVERYDAY COLLECTION</span><h2 id="product-title">{product.name}</h2><h3>{product.ko}</h3><p>{product.description}</p><div className="color-line"><i style={{ background: product.shade }} />{product.color}</div><p className="sample-note">컬렉션 콘셉트 예시입니다. 실제 상품 사양과 판매 정보는 추후 안내됩니다.</p><button className="text-link" onClick={() => { onClose(); document.getElementById('care').scrollIntoView({ behavior: 'smooth' }); }}>캐시미어 관리법 <ArrowRight size={17} /></button></div>
  </dialog>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('전체');
  const [selected, setSelected] = useState(null);
  const [openCare, setOpenCare] = useState(0);
  const closeDialog = () => setSelected(null);
  return <>
    <div className="announcement">A little warmth. A lasting feeling. <span>당신의 일상에 머무는 온기</span></div>
    <header className="header">
      <a className="wordmark" href="#home" aria-label="Jammu and Kashmir 홈">Jammu<span>&</span>Kashmir<span className="wordmark-sub">CASHMERE & EVERYDAY LUXURY</span></a>
      <nav className="desktop-nav" aria-label="주요 메뉴"><a href="#story">Our story</a><a href="#collection">Collection</a><a href="#care">Cashmere care</a></nav>
      <a className="header-cta" href="#contact">브랜드 안내 <ArrowUpRight size={15} /></a>
      <button className="mobile-toggle icon-button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="모바일 메뉴">{[['#story', 'Our story'], ['#collection', 'Collection'], ['#care', 'Cashmere care'], ['#contact', '브랜드 안내']].map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={18} /></a>)}</nav>}
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><span className="small-line" /> SOFTNESS, WITH A SOUL</div><h1>Warmth,<br />in its <em>purest</em><br />form.</h1><p className="hero-korean">입는 순간, 일상이 조금 더 따뜻해집니다.</p><p className="hero-description">피부에 닿는 부드러움부터 오래 곁에 두고 싶은 아름다움까지.<br className="desktop-break" /> Jammu&Kashmir가 전하는 캐시미어의 온기를 만나보세요.</p><a className="filled-link" href="#collection">컬렉션 만나보기 <ArrowUpRight size={19} /></a><a className="hero-bottom" href="#story"><span className="down-circle"><ArrowDown size={16} /></span> 천천히 알아가는, 우리의 이야기</a></div>
        <div className="hero-visual"><img src="/images/cashmere-hero.png" alt="크림색 캐시미어 니트의 부드러운 질감과 편안한 실루엣" fetchPriority="high" /><div className="hero-image-label"><span>LESS, BUT BETTER.</span><span>자연스럽게, 오래도록.</span></div><div className="round-stamp"><Sun size={24} strokeWidth={1} /><span>MADE FOR<br />SLOW LIVING</span></div></div>
      </section>
      <div className="values-strip"><span>Soft by nature</span><i /> <span>Timeless by design</span><i /><span>Warm at heart</span><i /><span>Jammu&Kashmir</span></div>
      <section className="story section-space" id="story"><div className="story-label"><span className="eyebrow">01 / OUR PHILOSOPHY</span><Sun className="story-sun" size={64} strokeWidth={0.8} /></div><div className="story-content"><h2>좋은 옷은,<br />시간이 지날수록 <em>가까워집니다.</em></h2><div className="story-body"><p>유행보다 취향을, 특별한 날보다 평범한 하루를 생각합니다.<br />자연스러운 색감, 편안한 실루엣, 그리고 손끝으로 느껴지는 부드러움.<br />Jammu&Kashmir는 일상에 조용히 스며드는 아름다움을 이야기합니다.</p><p>아침의 차 한 잔처럼, 익숙한 사람의 안부처럼.<br />우리의 옷이 당신에게 그런 따뜻함이 되기를 바랍니다.</p></div><span className="story-signature">With warmth, Jammu&Kashmir</span></div></section>
      <section className="collection section-space" id="collection"><div className="section-heading"><div><span className="eyebrow">02 / THE EVERYDAY COLLECTION</span><h2>Everyday, <em>extraordinary.</em></h2><p>매일 손이 가는 옷. 오래 마음에 남는 감촉.</p></div><div className="filters" role="group" aria-label="컬렉션 종류">{['전체', '니트웨어', '액세서리'].map(category => <button key={category} className={filter === category ? 'active' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div></div><div className="product-grid">{products.filter(product => filter === '전체' || product.category === filter).map((product, i) => <button key={product.id} className="product-card" onClick={() => setSelected(product)} aria-label={`${product.ko} 자세히 보기`}><div className="product-image" style={{ '--product-position': product.position }}><span className="product-index">0{products.indexOf(product) + 1}</span><span className="product-open"><Plus size={22} strokeWidth={1.4} /></span></div><div className="product-title"><h3>{product.name}</h3><ArrowUpRight size={20} strokeWidth={1.2} /></div><div className="product-meta"><span>{product.ko}</span><span className="color-dot" style={{ background: product.shade }} /></div></button>)}</div><div className="collection-footnote"><span>THOUGHTFULLY SIMPLE. BEAUTIFULLY SOFT.</span><span>당신의 속도로, 당신의 방식으로.</span></div></section>
      <section className="brand-note"><div className="note-image" role="img" aria-label="캐시미어 니트와 머플러의 포근한 질감" /><div className="note-copy"><span className="eyebrow">A NOTE ON SOFTNESS</span><h2>작은 온기가<br />만드는 <em>큰 차이.</em></h2><p>좋은 소재는 굳이 설명하지 않아도 느껴집니다.<br />몸을 감싸는 가벼움, 움직임을 따라 흐르는 유연함,<br />그리고 하루의 끝에도 남아 있는 편안함.</p><p>Jammu&Kashmir가 생각하는 럭셔리는<br />당신이 가장 편안한 모습으로 머무는 순간입니다.</p><a className="text-link" href="#care">부드러움을 오래 간직하는 방법 <ArrowRight size={18} /></a></div></section>
      <section className="care section-space" id="care"><div className="care-heading"><span className="eyebrow">03 / CARE FOR WHAT YOU LOVE</span><h2>A little care.<br /><em>A longer story.</em></h2><p>아끼는 옷과 오래 함께하는 법.<br />조금의 정성으로 부드러움을 지켜주세요.</p></div><div className="care-accordions">{care.map(([title, body], i) => <div className="care-item" key={title}><h3><button aria-expanded={openCare === i} aria-controls={`care-panel-${i}`} id={`care-heading-${i}`} onClick={() => setOpenCare(openCare === i ? null : i)}><span className="care-number">0{i + 1}</span>{title}{openCare === i ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div role="region" aria-labelledby={`care-heading-${i}`} id={`care-panel-${i}`} hidden={openCare !== i}><p>{body}</p></div></div>)}</div></section>
      <section className="contact" id="contact"><Sun size={32} strokeWidth={1} /><span className="eyebrow">STAY CLOSE, STAY WARM</span><h2>당신의 일상에, <em>Jammu&Kashmir.</em></h2><p>컬렉션과 브랜드의 새로운 소식을 이곳에서 전합니다.<br />공식 매장과 문의 채널은 준비가 완료되는 대로 안내드리겠습니다.</p><a className="text-link" href="#collection">우리의 컬렉션 다시 만나기 <MoveUpRight size={18} /></a></section>
    </main>
    <footer><div className="footer-top"><a className="wordmark" href="#home">Jammu<span>&</span>Kashmir<span className="wordmark-sub">A LITTLE WARMTH. A LASTING FEELING.</span></a><div className="footer-links"><a href="#story">브랜드 이야기</a><a href="#collection">컬렉션</a><a href="#care">소재 관리</a><a href="#contact">브랜드 안내</a></div><a className="back-to-top" href="#home" aria-label="페이지 맨 위로">BACK TO TOP <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jammu&Kashmir</span><span>브랜드 소개 시안 · 컬렉션 및 이미지는 콘셉트 예시입니다.</span><span>Crafted with warmth.</span></div></footer>
    {selected && <ProductDialog product={selected} onClose={closeDialog} />}
  </>;
}
