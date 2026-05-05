/* ============================================================
   Mr. Noodle AlmaZen — Animaciones + Sakura
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   SAKURA — pétalos de cerezo
────────────────────────────────────────────── */
function initSakura() {
  const canvas = document.getElementById('sakura-canvas');
  const ctx    = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const PETAL_COUNT = window.innerWidth < 768 ? 18 : 35;
  const petals = [];

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  class Petal {
    constructor() { this.reset(true); }
    reset(init) {
      this.x     = randBetween(0, W);
      this.y     = init ? randBetween(-H, 0) : -20;
      this.size  = randBetween(4, 9);
      this.speed = randBetween(0.8, 2.2);
      this.wind  = randBetween(-0.6, 0.6);
      this.rot   = randBetween(0, Math.PI * 2);
      this.rotS  = randBetween(-0.03, 0.03);
      this.alpha = randBetween(0.3, 0.7);
      this.hue   = randBetween(340, 360);
    }
    update() {
      this.y   += this.speed;
      this.x   += this.wind;
      this.rot += this.rotS;
      if (this.y > H + 20) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.beginPath();
      /* Pétalo ovalado */
      ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 70%, 80%)`;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ──────────────────────────────────────────────
   LOADER
────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete() {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        animateHeroIn();
      }
    });
  }, 2000);
}

/* ──────────────────────────────────────────────
   HERO ENTRADA
────────────────────────────────────────────── */
function animateHeroIn() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-eyebrow',  { opacity: 1, y: 0, duration: 0.8 })
    .to('.hero-line',     { opacity: 1, y: 0, duration: 1, stagger: 0.15 }, '-=0.4')
    .to('.hero-sub',      { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.hero-desc',     { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .to('.hero-btns',     { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .to('.hero-char',     { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out' }, '-=0.8');
}

/* ──────────────────────────────────────────────
   NAVBAR
────────────────────────────────────────────── */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('nav-links');

  ScrollTrigger.create({
    start: 'top -60',
    onUpdate(self) {
      navbar.classList.toggle('scrolled', self.scroll() > 60);
    }
  });

  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ──────────────────────────────────────────────
   SCROLL ANIMATIONS
────────────────────────────────────────────── */
function initScrollAnimations() {
  /* En móvil no hay animaciones de scroll: evita cualquier translateX/Y que genere overflow */
  if (window.innerWidth < 768) return;

  /* Concepto */
  gsap.from('.concepto-text', {
    scrollTrigger: { trigger: '.concepto-text', start: 'top 82%' },
    opacity: 0, x: mob ? 0 : -50, duration: 1, ease: 'power3.out'
  });
  gsap.from('.concepto-visual', {
    scrollTrigger: { trigger: '.concepto-visual', start: 'top 82%' },
    opacity: 0, x: mob ? 0 : 50, duration: 1, ease: 'power3.out'
  });
  gsap.from('.pillar', {
    scrollTrigger: { trigger: '.concepto-pillars', start: 'top 88%' },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out'
  });

  /* Section heads */
  document.querySelectorAll('.section-head').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 87%' },
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out'
    });
  });

  /* Carta cards */
  gsap.set('.carta-card', { opacity: 0, y: 30 });

  /* KasaZen */
  gsap.from('.kasazen-text', {
    scrollTrigger: { trigger: '#kasazen', start: 'top 80%' },
    opacity: 0, x: mob ? 0 : -50, duration: 1, ease: 'power3.out'
  });
  gsap.from('.kasazen-visual', {
    scrollTrigger: { trigger: '#kasazen', start: 'top 80%' },
    opacity: 0, x: mob ? 0 : 50, duration: 1, delay: 0.15, ease: 'power3.out'
  });
  gsap.from('.kasazen-list li', {
    scrollTrigger: { trigger: '.kasazen-list', start: 'top 85%' },
    opacity: 0, x: mob ? 0 : -20, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });

  /* Personajes */
  gsap.from('.personaje-card', {
    scrollTrigger: { trigger: '.personajes-grid', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power3.out'
  });

  /* Instagram */
  gsap.from('.insta-header', {
    scrollTrigger: { trigger: '#instagram', start: 'top 85%' },
    opacity: 0, y: 24, duration: 0.9, ease: 'power3.out'
  });
  gsap.from('.insta-item', {
    scrollTrigger: { trigger: '.insta-grid', start: 'top 88%' },
    opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.07, ease: 'power3.out'
  });

  /* Reseñas */
  gsap.from('.resena-card', {
    scrollTrigger: { trigger: '.resenas-grid', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power3.out'
  });
  gsap.from('.resenas-global', {
    scrollTrigger: { trigger: '.resenas-global', start: 'top 88%' },
    opacity: 0, y: 20, duration: 0.8, ease: 'power3.out'
  });

  /* Contacto */
  gsap.from('.cinfo-item', {
    scrollTrigger: { trigger: '.contacto-grid', start: 'top 82%' },
    opacity: 0, x: mob ? 0 : -30, duration: 0.7, stagger: 0.1, ease: 'power3.out'
  });
  gsap.from('.contacto-map', {
    scrollTrigger: { trigger: '.contacto-map', start: 'top 85%' },
    opacity: 0, x: mob ? 0 : 40, duration: 1, ease: 'power3.out'
  });
}

/* ──────────────────────────────────────────────
   CATÁLOGO COMPLETO — DATOS
────────────────────────────────────────────── */
const B = 'https://mrnoodlealmazen.com/wp-content/uploads/'; // base URL imágenes

const CATALOG = [
  {
    id: 'ramen', name: '🍜 Ramen & Noodles',
    products: [
      { name:'Big Bowl Kimchi',            price:'3,60 €', img:`${B}2025/07/big-bowl-kimchi-scaled-e1757421662831-300x300.png`,           desc:'Noodles instant en formato bowl grande con intenso sabor a kimchi coreano. Picante y lleno de sabor.' },
      { name:'Buldak Carbonara',           price:'2,95 €', img:`${B}2025/07/buldak-carbonara-e1755006762785-300x300.png`,               desc:'Los famosos fideos de pollo llameante en versión carbonara. Picantes y cremosos a la vez.' },
      { name:'Buldak Cream Carbonara',     price:'2,95 €', img:`${B}2025/07/buldak-cream-e1757343619898-300x300.png`,                    desc:'Versión cremosa extra del Buldak Carbonara. Suavemente picante con crema de queso.' },
      { name:'Buldak Pollo Picante x2',    price:'2,95 €', img:`${B}2025/07/buldak-x2-e1757421552450-300x300.png`,                       desc:'El original Buldak de pollo picante en pack doble. El reto más famoso de Internet.' },
      { name:'Buldak Queso',              price:'2,95 €', img:`${B}2025/07/buldak-queso-e1757421578169-300x300.png`,                    desc:'Fideos llameantes Buldak con sabor a queso fundido. El equilibrio perfecto entre picante y lácteo.' },
      { name:'Buldak Rosé',              price:'2,95 €', img:`${B}2025/07/buldak-rose-e1755019401943-300x300.png`,                     desc:'Fideos llameantes con salsa rosé cremosa. Suavemente picante y muy cremoso.' },
      { name:'Chapagetti',               price:'2,60 €', img:`${B}2025/07/ramen-chapagetti-1-e1757419679813-300x300.png`,              desc:'Noodles coreanos negros con salsa de soja fermentada tipo jajang. Suave y sabroso.' },
      { name:'CUP Kimchi',               price:'1,90 €', img:`${B}2025/07/cup-kimchi-scaled-e1757421502197-300x300.png`,               desc:'Ramen instant en CUP con sabor a kimchi. Listo para comer en minutos.' },
      { name:'CUP Negisan Picante',      price:'2,95 €', img:`${B}2025/07/cup-negisan-picante-e1757421460945-300x300.png`,             desc:'CUP de ramen picante con intensos sabores asiáticos. El favorito de los amantes del picante.' },
      { name:'CUP Nissin Gambas',        price:'1,90 €', img:`${B}2025/07/cup-nissin-gambas-e1757421369232-289x300.png`,               desc:'El clásico CUP Nissin con sabor a gambas. Rápido, sabroso y sin complicaciones.' },
      { name:'CUP Nissin Miso',          price:'1,90 €', img:`${B}2025/07/cup-nissin-miso-e1757421332883-300x300.png`,                 desc:'CUP de ramen Nissin con reconfortante caldo de miso japonés.' },
      { name:'CUP Nissin Pollo',         price:'1,90 €', img:`${B}2025/07/cup-nissin-pollo-e1757421275664-292x300.png`,                desc:'CUP Nissin de pollo, el sabor más clásico del ramen instant japonés.' },
      { name:'CUP Nissin Ternera',       price:'1,90 €', img:`${B}2025/07/images-2-1-e1757416108851.png`,                             desc:'CUP Nissin con caldo de ternera, intenso y satisfactorio.' },
      { name:'CUP Oyakata Pad Thai',     price:'2,20 €', img:`${B}2025/07/cup-oyakata-pad-thai-e1757421225120-300x300.png`,            desc:'Fideo CUP al estilo pad thai tailandés. Agridulce y aromático.' },
      { name:'CUP Soba Pato Pekín',      price:'2,95 €', img:`${B}2025/07/cup-soba-pato-e1757420797643-300x300.png`,                  desc:'Fideos soba con intenso sabor a pato al estilo Pekín. Un producto único.' },
      { name:'CUP Soba Teriyaki',        price:'2,95 €', img:`${B}2025/07/cup-soba-teriyaki-e1757420762268-300x300.png`,              desc:'Fideos soba con salsa teriyaki dulce. Sabor japonés auténtico.' },
      { name:'Hot Pot Noodles',          price:'2,60 €', img:`${B}2025/09/shopping-removebg-preview-300x300.png`,                      desc:'Noodles de hot pot, el plato comunal más popular de China.' },
      { name:'JML Ternera Picante',      price:'2,60 €', img:`${B}2025/07/tallarines-instantaneos-ternera-picante-jml-110g-300x300.png`, desc:'Tallarines picantes de ternera al estilo chino.' },
      { name:'Mi Goreng Gamba y Cebolla',price:'1,40 €', img:`${B}2025/07/fideos-instantaneos-hao-hao-mi-goreng-con-sabor-a-cebolla-y-gamba-acecook-76g-e1757416134691-300x300.png`, desc:'Fideos fritos vietnamitas con sabor a gamba y cebolla. Ligeros y crujientes.' },
      { name:'Neoguri',                  price:'2,60 €', img:`${B}2025/07/ramen-neoguri-scaled-e1753099029934-300x300.png`,            desc:'Ramen coreano Nongshim con sabor a mariscos y un toque picante. Muy popular en Corea.' },
      { name:'Nissin Gambas',            price:'1,40 €', img:`${B}2025/07/images-4-e1757415513722.png`,                               desc:'Tallarín Nissin clásico con sabor a gambas. Económico y sabroso.' },
      { name:'Nissin Miso',              price:'1,40 €', img:`${B}2025/07/images-3-1-e1757415539711.png`,                             desc:'Tallarín Nissin con caldo de miso. Un clásico del ramen instant japonés.' },
      { name:'Nissin Pato',              price:'1,40 €', img:`${B}2025/07/tallarines-instantaneos-nissin-pato-100gm-e1757417123753-300x300.png`, desc:'Tallarín Nissin con sabor a pato, suave y aromático.' },
      { name:'Nissin Pollo',             price:'1,40 €', img:`${B}2025/07/tallarin-demae-ramen-instantaneo-pollo-nissin-100-g-e1757416975623-300x300.png`, desc:'El clásico Nissin de pollo, el ramen más vendido del mundo.' },
      { name:'Nissin Sésamo',            price:'1,40 €', img:`${B}2025/07/tallarin-instantaneo-sesamo-nissin-100-g-e1757417009457-300x300.png`, desc:'Tallarín Nissin con intenso sabor a sésamo tostado.' },
      { name:'Nissin Ternera',           price:'1,40 €', img:`${B}2025/07/tallarines-instantaneos-ternera-nissin-100gm-1-e1757417037208-300x300.png`, desc:'Tallarín Nissin con caldo de ternera.' },
      { name:'Nissin Tonkotsu',          price:'1,40 €', img:`${B}2025/07/tallarin-instantaneo-tonkotsu-nissin-100-g-e1757417066609-300x300.png`, desc:'Tallarín Nissin con caldo tonkotsu de cerdo. El sabor más amado del ramen japonés.' },
      { name:'Nissin Yakisoba',          price:'1,40 €', img:`${B}2025/07/tallarin-cup-nissin-s-champinon-63gr-e1757417094135-300x300.png`, desc:'Fideo Nissin al estilo yakisoba con champiñones.' },
      { name:'Nongshim Kimchi',          price:'2,60 €', img:`${B}2025/07/nongdhimkimchiremovebg-preview-300x300.png`,                desc:'Ramen coreano Nongshim con intenso sabor a kimchi.' },
      { name:'Nongshim Sea Food',        price:'2,60 €', img:`${B}2025/07/tallarin-nong-shim-seafood-ramyun-125g--e1757416167518-300x300.png`, desc:'Ramen Nongshim con delicioso sabor a mariscos.' },
      { name:'Nongshim Shin Ramyun',     price:'2,60 €', img:`${B}2025/07/Nong-Shim-Fideos-Ramen-Coreanos-Shinramyun-asia-meraki-gourmet-productos-e1757416203947-300x300.png`, desc:'El ramen coreano picante más famoso del mundo. Intenso y adictivo.' },
      { name:'Nongshim Stir Fry Picantes',price:'2,60 €',img:`${B}2025/07/images-1-1.png`,                                           desc:'Nongshim para saltear, extremadamente picante. Solo para valientes.' },
      { name:'Ramen Hokkaido (2 rac.)',  price:'4,90 €', img:`${B}2025/09/hokkaido-shio-ramen-itsuki-172-g-300x300.png`,              desc:'Ramen Itsuki estilo Hokkaido Shio. Caldo salado ligero y aromático. 2 raciones.' },
      { name:'Ramen Kyoto (2 rac.)',     price:'4,90 €', img:`${B}2025/09/fideo-kyoto-tonkotsu-miso-ramen-itsuki-182g-300x300.png`,   desc:'Ramen Itsuki estilo Kyoto Tonkotsu Miso. Caldo rico y cremoso. 2 raciones.' },
      { name:'Ramen Osaka (2 rac.)',     price:'4,90 €', img:`${B}2025/09/ramenosaka-300x300.png`,                                    desc:'Ramen Itsuki estilo Osaka. Sabor profundo y reconfortante. 2 raciones.' },
      { name:'Sapporo Miso Ramen (2 rac.)',price:'4,90 €',img:`${B}2025/07/fideo-sapporo-miso-ramen-itsuki-186g-removebg-preview-300x300.png`, desc:'Ramen Itsuki estilo Sapporo Miso. El ramen del norte de Japón. 2 raciones.' },
      { name:'Ramyun Picante Salteado',  price:'2,60 €', img:`${B}2025/07/tallarines-ramyun-picante-salteado-nong-shim-130g-removebg-preview-300x300.png`, desc:'Noodles coreanos picantes para saltear.' },
      { name:'Samyang Hot Pepper',       price:'2,95 €', img:`${B}2025/07/4eaa71c6573f69e9cea840491465d51f-stir-fried-noodles-hot-pepper-120g-samyang-300x300.png`, desc:'Fideos picantes para saltear de Samyang. Clásico coreano.' },
      { name:'Soba Chile',               price:'2,20 €', img:`${B}2025/07/ramen-soba-chili-e1757420189872-300x300.png`,              desc:'Fideos soba con chile. El contraste del alforfón con el picante.' },
      { name:'Soba Pollo Teriyaki',      price:'2,20 €', img:`${B}2025/07/9C523E14-37B1-4F56-9D85-1D32478AAF9C-300x300.png`,         desc:'Fideos soba con suave sabor a pollo teriyaki.' },
      { name:'Topokki Picante',          price:'3,50 €', img:`${B}2025/07/61fApKb3lsL._SL1001_-e1755019226448-300x300.png`,          desc:'Las famosas bolitas de arroz coreanas en salsa picante gochujang. Un clásico del street food.' },
    ]
  },
  {
    id: 'congelados', name: '❄️ Congelados',
    products: [
      { name:'Gyoza Cerdo y Verduras 600g (30ud)', price:'9,90 €',  img:`${B}2025/09/gyoza-de-verduras-y-cerdo-ajinomoto-600g-30pzs-removebg-preview-1-300x300.png`, desc:'Gyoza Ajinomoto de cerdo y verduras. 30 piezas. La gyoza japonesa más popular.' },
      { name:'Gyoza Setas y Edamame 400g',         price:'9,90 €',  img:`${B}2025/09/gyozas-de-setas-y-edamame-ajinomoto-400g-20ud-removebg-preview-300x300.png`,     desc:'Gyoza vegetal con setas y edamame. 20 unidades. Ideal para vegetarianos.' },
      { name:'Gyoza Pato con Salsa Hoi Sin 600g',  price:'11,50 €', img:`${B}2025/08/2g0036-removebg-preview-300x300.png`,                                            desc:'Gyoza de pato con salsa hoisin. 30 unidades. Un sabor diferente y delicioso.' },
      { name:'Gyoza Ternera-Verdura 600g (30ud)',  price:'10,90 €', img:`${B}2025/07/gyoza-ternera-verdura-30pcs-ajinomoto-600g-removebg-preview-300x300.png`,         desc:'Gyoza Ajinomoto de ternera y verduras. 30 piezas.' },
      { name:'Gyoza Pollo al Curry 600g',          price:'9,90 €',  img:`${B}2025/07/gyozas-pollo-al-curry-300x300.png`,                                              desc:'Gyoza de pollo con curry. Sabor aromático y suave.' },
      { name:'Gyozas Langostino 200g',             price:'4,40 €',  img:`${B}2025/07/gyozas-de-langostino-oriental-mg-preview-300x300.png`,                           desc:'Gyoza de langostino en formato pequeño. Perfectas para un aperitivo.' },
      { name:'Gyozas Manzana 600g',                price:'6,50 €',  img:`${B}2025/07/gyoza-de-manzana-ajinomoto600-gr-removebg-preview-300x300.png`,                  desc:'Gyoza dulce de manzana. Postre o merienda única.' },
      { name:'Gyoza Pollo y Verduras 200g',        price:'3,20 €',  img:`${B}2025/07/gyozas-de-pollo-y-verduras-oriental-market-200g-removebg-preview-300x300.png`,   desc:'Gyoza de pollo y verduras en formato individual.' },
      { name:'Gyoza Vegetariana Sin Gluten 600g',  price:'14,20 €', img:`${B}2025/07/gyoza-vegetariana-sin-gluten-shirakiku-600g-removebg-preview-300x300.png`,        desc:'Gyoza 100% vegetariana y sin gluten. 30 piezas.' },
      { name:'Gyozas Verdura 200g',                price:'3,40 €',  img:`${B}2025/07/gyozas-de-verduras-oriental-market200g-removebg-preview-1-300x300.png`,          desc:'Gyoza de verduras en formato pequeño.' },
      { name:'Onigiri Atún, Mayo y Kimchi',        price:'2,50 €',  img:`${B}2025/07/onigiri-atun-mayo-kimchi-e1757422914980-300x300.png`,                            desc:'Bola de arroz rellena de atún, mayonesa y kimchi. Sin alga.' },
      { name:'Onigiri Atún y Mayo',                price:'2,50 €',  img:`${B}2025/07/onigiri-atun-mayo-e1757422787793-300x300.png`,                                   desc:'Bola de arroz con atún y mayonesa japonesa. Sin alga.' },
      { name:'Onigiri Pollo Teriyaki',             price:'2,50 €',  img:`${B}2025/07/onigiri-pollo-teriyaki-e1757422756610-300x300.png`,                              desc:'Bola de arroz con pollo teriyaki.' },
      { name:'Onigiri Pollo New Orleans',          price:'2,50 €',  img:`${B}2025/07/onigiri-pollo-new-orleans-e1757422726163-300x300.png`,                           desc:'Bola de arroz con pollo especiado al estilo New Orleans.' },
      { name:'Ramen Tonkotsu (ready to eat)',      price:'7,90 €',  img:`${B}2025/07/ramen-tonkotsu-congelado-550g-300x300.jpg`,                                      desc:'Ramen tonkotsu artesanal congelado 550g. Caldo de cerdo cremoso. Solo calentar.' },
      { name:'Shoyu Ramen (ready to eat)',         price:'7,90 €',  img:`${B}2025/08/ramen-shoyu-congelado-550g-removebg-preview-300x300.png`,                        desc:'Ramen shoyu artesanal congelado 550g. Caldo de soja claro y suave.' },
      { name:'Takoyaki 500g',                     price:'9,20 €',  img:`${B}2025/07/takoyaki-seafood-market-500g-removebg-preview-300x300.png`,                      desc:'Las famosas bolitas de pulpo japonesas. Solo freír o microondas.' },
      { name:'Naruto (pasta de pescado)',          price:'4,20 €',  img:`${B}2025/07/naruto-maki-pasta-de-pescado-160g__1_-removebg-preview-300x300.png`,             desc:'Pasta de pescado enrollada tipo naruto. Topping clásico del ramen.' },
      { name:'Sau Mai de Marisco',                 price:'24,90 €', img:`${B}2025/07/sau-may-de-marisco-fu-long-20uds-removebg-preview-300x300.png`,                  desc:'Dim sum de marisco al vapor. 20 unidades de alta calidad.' },
      { name:'Sau Mai de Cerdo 500g',              price:'12,40 €', img:`${B}2025/07/empanadillas-rellena-de-cerdo-gambas-y-setas-removebg-preview-300x300.png`,      desc:'Dim sum de cerdo con gambas y setas. Tradicional chino.' },
      { name:'Sau Mai de Arroz 660g',              price:'12,40 €', img:`${B}2025/07/sau-mai-de-arroz-dacheng-660g-removebg-preview-300x300.png`,                    desc:'Dim sum relleno de arroz.' },
      { name:'Baozi (Shien Lo Pao) pack 2',        price:'3,00 €',  img:`${B}2025/08/shien-lo-pao-fu-long-2un-220g-removebg-preview-300x300.png`,                    desc:'Bollo chino al vapor relleno. El snack más popular de Asia.' },
      { name:'Pasta para Gyozas 300g',             price:'3,50 €',  img:`${B}2025/07/pasta-para-gyoza-tyj-300gm--300x300.png`,                                       desc:'Obleas para hacer gyozas en casa. Perfectas para preparar tu propio dim sum.' },
      { name:'Alga Wakame Goma',                   price:'3,95 €',  img:`${B}2025/06/alga-wakame-goma-300x300.jpg`,                                                   desc:'Alga wakame con sésamo. Topping imprescindible para sopas y ensaladas.' },
      { name:'Edamame 400g',                       price:'2,90 €',  img:`${B}2025/07/edamame-crudo-sushi-king-400-g-removebg-preview-e1757696784573-300x300.png`,     desc:'Vainas de soja verde. El aperitivo más saludable de la cocina japonesa.' },
      { name:'Helado Matcha y Soja Roja',          price:'2,00 €',  img:`${B}2025/07/helado-sabor-matcha-y-soja-roja-bamboo-tree-4x75g-removebg-preview-300x300.png`, desc:'Helado de matcha con anko de soja roja. Sabor auténtico japonés.' },
      { name:'Helado Palettas Açai',               price:'2,00 €',  img:`${B}2025/07/PALETTA_ACAI-removebg-preview-300x300.png`,                                     desc:'Helado artesanal sin gluten ni lactosa con açai.' },
      { name:'Helado Palettas Coco',               price:'2,00 €',  img:`${B}2025/07/PALETTACOCO-removebg-preview-300x300.png`,                                      desc:'Helado artesanal sin gluten ni lactosa con coco.' },
      { name:'Helado Palettas Limón y Hierbabuena',price:'2,00 €',  img:`${B}2025/07/PALETTA_HIERBABUENA-removebg-preview-300x300.png`,                              desc:'Helado artesanal sin gluten ni lactosa. Refrescante combinación.' },
      { name:'Helado Palettas Mango',              price:'2,00 €',  img:`${B}2025/07/PALETTASMANGO-Photoroom-300x300.png`,                                           desc:'Helado artesanal de mango, sin gluten ni lactosa.' },
      { name:'Helado Palettas Sandía',             price:'2,00 €',  img:`${B}2025/07/sandiasinfondo.png`,                                                            desc:'Helado artesanal de sandía, sin gluten ni lactosa.' },
      { name:'Helado Palettas Frambuesa',          price:'2,00 €',  img:`${B}2025/07/PALETTA_FRANBUESA-removebg-preview-300x300.png`,                                desc:'Helado artesanal de frambuesa, sin gluten ni lactosa.' },
      { name:'Helado Palettas Kiwi',               price:'2,00 €',  img:`${B}2025/07/PALETTAKIWI-removebg-preview-300x300.png`,                                     desc:'Helado artesanal de kiwi, sin gluten ni lactosa.' },
      { name:'Helado Palettas Mandarina',          price:'2,00 €',  img:`${B}2025/07/PALETTAMANDARINA-removebg-preview-300x300.png`,                                 desc:'Helado artesanal de mandarina, sin gluten ni lactosa.' },
    ]
  },
  {
    id: 'dulces', name: '🍬 Dulces',
    products: [
      { name:'Mochi Choco Bubble Milk Tea',price:'3,80 €', img:`${B}2025/07/mochi-bubble-milk-tea-300x300.png`,                           desc:'Mochi relleno de crema de bubble milk tea. Una fusión deliciosa.' },
      { name:'Mochi Mixto Frutas',         price:'6,40 €', img:`${B}2025/07/mochis-de-frutas-sw-180gr-300x300.png`,                       desc:'Surtido de mochis de diferentes frutas. 180g de suave pastelito de arroz.' },
      { name:'Mochi Tradicional',          price:'6,40 €', img:`${B}2025/07/mochi-tradicional-scaled-e1757422552526-300x300.png`,          desc:'Mochi japonés tradicional. Masa de arroz glutinoso suave y deliciosa.' },
      { name:'Mochi Roll',                 price:'3,90 €', img:`${B}2025/07/4d61c84210b8c42938ab321b99a7dcd0-e1757417229363-300x300.png`, desc:'Mochi en formato roll. Suave, elástico y delicioso.' },
      { name:'Mico Mochi Chocolate',       price:'3,60 €', img:`${B}2025/07/mico-mochi-chocolate-scaled-e1753095498639-300x300.png`,       desc:'Mochi relleno de helado de chocolate. Suave exterior, cremoso interior.' },
      { name:'Mico Mochi Fresa',           price:'3,60 €', img:`${B}2025/07/images.png`,                                                  desc:'Mochi relleno de helado de fresa. El favorito de muchos.' },
      { name:'Mico Mochi Mango',           price:'3,60 €', img:`${B}2025/07/mochi-roll-mango-300x300.png`,                                desc:'Mochi relleno de helado de mango tropical.' },
      { name:'Mico Mochi Melocotón',       price:'3,60 €', img:`${B}2025/07/mico-mochi-melocoton-scaled-e1753095895328-300x300.png`,      desc:'Mochi relleno de helado de melocotón.' },
      { name:'Mico Mochi Uva',             price:'3,60 €', img:`${B}2025/07/mico-mochis-uva-e1757417164989-300x300.png`,                  desc:'Mochi relleno de helado de uva.' },
      { name:'Dorayaki Anko',              price:'1,80 €', img:`${B}2025/07/dorayakis-300x300.png`,                                       desc:'El dulce favorito de Doraemon. Dos bizcochos esponjosos rellenos de pasta de judía roja.' },
      { name:'Kit Kat Matcha Japan',       price:'0,90 €', img:`${B}2025/07/kit-kat-te-verde-matcha-nestle-13-barritas--e1757417193666-300x300.png`, desc:'Kit Kat de té verde matcha, icónico de Japón. Mini barrita.' },
      { name:'Pocky Matcha',              price:'3,60 €', img:`${B}2025/07/dfgfgfg-e1757417265607-300x300.png`,                          desc:'Las famosas galletas Pocky con cobertura de matcha. Un snack dulce japonés clásico.' },
      { name:'Hello Panda Chocolate',      price:'2,50 €', img:`${B}2025/07/hello-panda-chocolate-scaled-e1757422413583-300x300.png`,     desc:'Galletas rellenas de chocolate con forma de oso panda.' },
      { name:'Hello Panda Leche',          price:'2,50 €', img:`${B}2025/07/hello-panda-leche-1-scaled-e1757422060584-300x300.png`,       desc:'Galletas rellenas de crema de leche con forma de oso panda.' },
      { name:'Galleta Choco Shin Chan',    price:'2,00 €', img:`${B}2025/07/galleta-shin-chan-chocolate-1-scaled-e1757422134491-300x300.png`, desc:'Galletas con la forma del travieso Shin Chan con chocolate. Edición especial.' },
      { name:'Galleta Matcha',             price:'3,90 €', img:`${B}2025/07/galleta-matcha-1-e1757422170355-300x300.png`,                 desc:'Galletas con sabor a té verde matcha. Dulce con un toque amargo.' },
      { name:'Galleta Pez Meito Chocolate',price:'2,40 €', img:`${B}2025/07/meito-pez-choco-1-scaled-e1753096264670-300x300.png`,         desc:'Galletas en forma de pez con relleno de chocolate.' },
      { name:'Galleta Pez Meito Fresa',    price:'2,40 €', img:`${B}2025/07/meito-pez-fresa-1-scaled-e1753095782245-300x300.png`,         desc:'Galletas en forma de pez con relleno de fresa.' },
      { name:'Galleta Pez Meito Original', price:'2,40 €', img:`${B}2025/07/meito-pez-original-scaled-e1753095730499-300x300.png`,        desc:'Galletas originales en forma de pez rellenas de crema.' },
      { name:'Galleta Sachima Taro',       price:'5,10 €', img:`${B}2025/07/galletas-sachima-con-cereales-variados-qio-fu-227g-300x300.png`, desc:'Galleta china sachima con taro y cereales. 227g.' },
      { name:'Oreo Fresa',                price:'2,90 €', img:`${B}2025/07/oreo-fresa-300x300.png`,                                      desc:'Oreo edición asiática con relleno de fresa.' },
      { name:'Oreo Matcha',              price:'3,80 €', img:`${B}2025/07/oreo-matcha-300x300.png`,                                     desc:'Oreo con relleno de matcha. La fusión más deseada.' },
      { name:'Oreo Melocotón',           price:'3,80 €', img:`${B}2025/07/oreo-melocoton-scaled-e1757422016190-300x300.png`,            desc:'Oreo edición asiática con crema de melocotón.' },
      { name:'Oreo Vainilla',            price:'3,80 €', img:`${B}2025/07/oreo-vainilla-scaled-e1757421987991-300x300.png`,             desc:'Oreo asiática con relleno de vainilla intensa.' },
      { name:'Oreo Yogur y Hierbabuena', price:'3,80 €', img:`${B}2025/07/oreo-yogur-scaled-e1757421945502-300x300.png`,               desc:'Oreo con relleno de yogur y hierbabuena. Refrescante y único.' },
      { name:'Fortuna Cookies',          price:'3,80 €', img:`${B}2025/07/galletas-fortuna-1-scaled-e1753095352178-300x300.png`,        desc:'Las famosas galletas de la fortuna con mensajes en su interior.' },
      { name:'Choco Pie',               price:'0,90 €', img:`${B}2025/07/817dgnh61GL-e1757416502589-300x300.png`,                      desc:'El snack coreano más clásico. Bizcocho, malvavisco y chocolate.' },
      { name:'Caramelos Ribon',         price:'2,80 €', img:`${B}2025/07/images-1-e1757416446986.png`,                                desc:'Caramelos japoneses Ribon, suaves y con sabores frutales.' },
      { name:'Gyozas Manzana (dulce)',  price:'6,50 €', img:`${B}2025/07/gyoza-de-manzana-ajinomoto600-gr-removebg-preview-300x300.png`, desc:'Gyoza dulce de manzana Ajinomoto. Un postre diferente y delicioso.' },
    ]
  },
  {
    id: 'bebidas', name: '🥤 Bebidas',
    products: [
      { name:'Ramune Original',              price:'2,60 €', img:`${B}2025/07/ramune-original-scaled-e1757423933666-300x300.png`,              desc:'La icónica gaseosa japonesa con bola de mármol. Para abrir: empuja la bola hacia adentro.' },
      { name:'Ocean Bomb Sabor Limón',        price:'3,00 €', img:`${B}2025/07/ocen-bomb-limon-scaled-e1757424024648-300x300.png`,              desc:'Bebida carbonatada sabor limón con licencia de anime. Coleccionable.' },
      { name:'Bob Tea Sin Gluten',            price:'3,50 €', img:`${B}2025/07/bob-tea-blue-lima-e1757432026876-300x300.png`,                   desc:'Bubble tea sin gluten listo para beber. La bebida de moda asiática.' },
      { name:'Bebida de Coco FOCO 350ml',     price:'2,00 €', img:`${B}2025/07/bebida-de-coco-e1757431254586-300x300.png`,                      desc:'Agua de coco natural FOCO. Hidratante y refrescante. 350ml.' },
      { name:'Bebida Fresa Mogu Mogu 320ml',  price:'2,00 €', img:`${B}2025/07/bebida-fresa-mogu-mogu-320ml-300x300.png`,                       desc:'Bebida de fresa con trozos de nata de coco. Textura única.' },
      { name:'Bebida Mango Mogu Mogu 320ml',  price:'2,00 €', img:`${B}2025/07/bebida-mango-mogu-mogu-320ml-removebg-preview-300x300.png`,      desc:'Bebida de mango con nata de coco. Tropical y refrescante.' },
      { name:'OKF Aloe Vera Original',        price:'3,00 €', img:`${B}2025/07/aloe-e1757431978906-300x300.png`,                               desc:'Bebida de aloe vera natural. Suave y beneficiosa para la digestión.' },
      { name:'Makgeolli Original',            price:'5,90 €', img:`${B}2025/07/magkeolli-original-300x300.png`,                                desc:'Licor tradicional coreano de arroz fermentado. Suave y lechoso. Solo recogida en tienda.' },
      { name:'Makgeolli Melocotón',           price:'5,90 €', img:`${B}2025/07/makgeolli-melocoton-300x300.png`,                               desc:'Makgeolli coreano de arroz con sabor a melocotón. Solo recogida en tienda.' },
      { name:'Cerveza Kirin Ichiban',         price:'2,50 €', img:`${B}2025/07/cerveza-kirin-ichiban-300x300.png`,                             desc:'La cerveza premium japonesa Kirin Ichiban. Suave y equilibrada. Solo recogida en tienda.' },
      { name:'Sake Tokusen Junmai 180ml',     price:'7,00 €', img:`${B}2025/07/sake-tokusen-junmai-namachozo-shu-hakutsuru-180-ml-removebg-preview-300x300.png`, desc:'Sake premium japonés Hakutsuru Tokusen Junmai. 180ml. Solo recogida en tienda.' },
      { name:'Sake Sparkling Awayuki 300ml',  price:'8,00 €', img:`${B}2025/07/sparkling-sake-300x300.png`,                                    desc:'Sake espumoso Hakutsuru Awayuki. 300ml. Elegante y festivo. Solo recogida en tienda.' },
      { name:'Makgeolli 750ml',               price:'7,10 €', img:`${B}2025/07/vino-de-arroz-makgeolli-750ml-removebg-preview-300x300.png`,    desc:'Vino de arroz coreano Makgeolli en formato grande 750ml. Solo recogida en tienda.' },
      { name:'Soju Original',                 price:'5,40 €', img:`${B}2025/07/soju-original-300x300.png`,                                    desc:'Aguardiente coreano Soju. Suave, ligero y neutro. Solo recogida en tienda.' },
      { name:'Soju Manzana',                  price:'5,40 €', img:`${B}2025/07/images-2-e1757416420569.png`,                                   desc:'Soju coreano con sabor a manzana. Dulce y muy fácil de beber. Solo recogida en tienda.' },
    ]
  },
  {
    id: 'snacks', name: '🍿 Snacks',
    products: [
      { name:'Komesan Barbacoa',      price:'2,80 €', img:`${B}2025/07/snack-komesan-barbacoa-e1757418024269-300x300.png`,    desc:'Snacks de arroz con sabor a barbacoa. Crujientes y adictivos.' },
      { name:'Komesan Queso',         price:'2,80 €', img:`${B}2025/07/snack-komesan-queso-e1757417984472-300x300.png`,       desc:'Snacks de arroz con sabor a queso. Ligeros y crujientes.' },
      { name:'Oishi Snack Gambas Picante',price:'2,80 €',img:`${B}2025/07/snack-gambas-picante-e1757418056501-300x300.png`,   desc:'Snacks de gambas picantes. Crujientes con un toque de chile.' },
      { name:'Patatas Teriyaki',      price:'2,60 €', img:`${B}2025/07/patatas-teriyaki-e1757418152539-300x300.png`,          desc:'Chips de patata con sabor a teriyaki dulce. Un giro asiático al snack favorito.' },
      { name:'Patatas Wasabi Nori',   price:'2,60 €', img:`${B}2025/07/patatas-wasabi-nori-e1757418114357-300x300.png`,       desc:'Chips de patata con wasabi y alga nori. El snack más auténtico de Japón.' },
      { name:'Cacahuetes Wasabi',     price:'3,40 €', img:`${B}2025/07/cacahuetes-wasabi-e1757418288297-261x300.png`,         desc:'Cacahuetes con cobertura crujiente de wasabi. Picantes y adictivos.' },
      { name:'Guisantes Wasabi',      price:'2,90 €', img:`${B}2025/07/guisantes-wasabi-e1757418235224-300x300.png`,          desc:'Guisantes crujientes con cobertura de wasabi. El snack saludable y picante.' },
      { name:'Chips de Plátano',      price:'1,90 €', img:`${B}2025/07/P02848-AFROASE-CHIPS-DE-PLANTAIN-DOUCES-80G-300x300.png`, desc:'Chips dulces de plátano macho. Crujientes y naturales. 80g.' },
    ]
  },
  {
    id: 'salsas', name: '🫙 Salsas & Condimentos',
    products: [
      { name:'Mayonesa Kewpie Sin Gluten 355ml', price:'7,30 €', img:`${B}2025/07/mayonesakewpiesingluten355ml_1000x-removebg-preview-300x300.png`, desc:'La famosa mayonesa japonesa Kewpie. Más cremosa y con toque de vinagre de arroz. Sin gluten.' },
      { name:'Ponzu Citrus 1L',                  price:'13,90 €', img:`${B}2025/07/ponzu-citrus-1l-300x300.png`,                                 desc:'Salsa ponzu cítrica en formato grande 1L. Base de soja con cítricos japoneses.' },
      { name:'Salsa Agridulce',                  price:'3,90 €', img:`${B}2025/07/salsa-agridulce-scaled-e1757419932983-300x300.png`,             desc:'Salsa agridulce asiática. Perfecta para acompañar rollitos de primavera y tempura.' },
      { name:'Salsa Agridulce 300ml',            price:'3,20 €', img:`${B}2025/07/salsa-agridulce-scaled-e1757419932983-300x300.png`,             desc:'Salsa agridulce en formato pequeño 300ml.' },
      { name:'Salsa Chili Dulce',                price:'3,15 €', img:`${B}2025/07/salsa-chili-dulce-camill-280g-300x300.png`,                    desc:'Salsa de chile dulce tailandesa. Perfecta para dumplings y snacks.' },
      { name:'Salsa Chili Dulce Didilo',         price:'2,50 €', img:`${B}2025/07/salsa-chili-dulce-e1757419248773-273x300.png`,                 desc:'Salsa de chile dulce en formato pequeño.' },
      { name:'Salsa de Ostras 255g',             price:'3,40 €', img:`${B}2025/07/salsa-de-ostras-grande-300x300.png`,                           desc:'Salsa de ostras chinas. Indispensable para wok y salteados asiáticos.' },
      { name:'Salsa de Ostras 510g',             price:'5,40 €', img:`${B}2025/07/salsa-de-ostras-pequena-e1757419216576-300x300.png`,            desc:'Salsa de ostras en formato grande 510g. Para cocineros habituales.' },
      { name:'Salsa de Soja 1L',                 price:'6,45 €', img:`${B}2025/07/salsa-soja-1l-300x300.png`,                                   desc:'Salsa de soja clásica en formato grande 1L. El condimento asiático fundamental.' },
      { name:'Salsa de Soja Clara 150ml',        price:'2,40 €', img:`${B}2025/07/salsa-soja-1l-300x300.png`,                                   desc:'Salsa de soja clara en formato pequeño 150ml.' },
      { name:'Salsa de Soja Light',              price:'3,20 €', img:`${B}2025/07/14013b-salsa-de-soja-light-500ml-e1757415435557-300x300.png`, desc:'Salsa de soja light con menos sodio. 500ml.' },
      { name:'Salsa de Soja Sin Gluten',         price:'3,40 €', img:`${B}2025/07/soja-sin-gluten-e1757418649559-300x300.png`,                  desc:'Salsa de soja sin gluten (tamari). Apta para celíacos.' },
      { name:'Salsa Hoisin Sin Gluten',          price:'3,40 €', img:`${B}2025/07/salsa-hoisin-sin-gluten-e1757419169814-300x300.png`,           desc:'Salsa hoisin china sin gluten. Dulce y especiada, base de la cocina cantonesa.' },
      { name:'Salsa Kimchi 450g',                price:'9,70 €', img:`${B}2025/07/salsa-kimchi-450gr-e1757419099544-300x300.png`,               desc:'Salsa de kimchi picante coreana 450g. Fermentada y llena de sabor.' },
      { name:'Salsa Kimchi Japonesa 220ml',      price:'4,50 €', img:`${B}2025/07/salsa-kimchi-ita-san-e1757419068362-300x300.png`,             desc:'Salsa kimchi estilo japonés. Más suave que la coreana.' },
      { name:'Salsa Okonomi',                    price:'6,00 €', img:`${B}2025/07/salsa-okonomi-e1757419034589-300x300.png`,                   desc:'Salsa okonomiyaki japonesa. Imprescindible para el okonomiyaki y takoyaki.' },
      { name:'Salsa Poke',                       price:'3,40 €', img:`${B}2025/07/salsa-poke-e1757418940106-300x300.png`,                      desc:'Salsa para poke bowl. Perfecta para los amantes del raw food hawaiano-japonés.' },
      { name:'Salsa Ponzu',                      price:'3,90 €', img:`${B}2025/07/ponzu-pequeno-e1757419358319-300x300.png`,                   desc:'Salsa ponzu japonesa. Cítrica y umami. Perfecta para dumplings y sashimi.' },
      { name:'Salsa Satay Cacahuete',            price:'4,10 €', img:`${B}2025/07/salsa-satay-e1757418901913-300x300.png`,                     desc:'Salsa satay de cacahuete tailandesa. Cremosa y aromática.' },
      { name:'Salsa Sésamo Tostado',             price:'5,40 €', img:`${B}2025/07/salsa-kewpie-sesamo-sg-e1757419123210-300x300.png`,          desc:'Salsa Kewpie de sésamo tostado. Cremosa y con sabor a nuez.' },
      { name:'Salsa Sésamo Sin Gluten',          price:'5,90 €', img:`${B}2025/07/salsa-kewpie-sesamo-sg-e1757419123210-300x300.png`,          desc:'Salsa de sésamo tostado sin gluten. Apta para celíacos.' },
      { name:'Salsa Soja Dulce',                 price:'3,90 €', img:`${B}2025/07/salsa-soja-dulce-pequena-e1757418869197-300x300.png`,        desc:'Salsa de soja dulce. Perfecta para marinar y como dipping sauce.' },
      { name:'Salsa Soja Dulce Grande',          price:'6,45 €', img:`${B}2025/07/salsa-soja-dulce-grande-e1757419963244-300x300.png`,         desc:'Salsa de soja dulce en formato grande.' },
      { name:'Salsa Teriyaki 250ml',             price:'3,95 €', img:`${B}2025/07/salsa-teriyaki-pequena-scaled-e1757418835438-300x300.png`,  desc:'Salsa teriyaki japonesa 250ml. Dulce, brillante y perfecta para pollo o salmón.' },
      { name:'Salsa Teriyaki 500ml',             price:'7,30 €', img:`${B}2025/07/salsa-teriyaki-grande-scaled-e1753102178771-300x300.png`,   desc:'Salsa teriyaki en formato grande 500ml. Para cocineros frecuentes.' },
      { name:'Salsa Teriyaki Sin Gluten',        price:'7,40 €', img:`${B}2025/07/salsa-teriyaki-sin-gluten-scaled-e1757418798846-300x300.png`, desc:'Salsa teriyaki sin gluten. Mismo sabor, apta para celíacos.' },
      { name:'Salsa Tonkatsu',                   price:'5,45 €', img:`${B}2025/07/salsa-tonkatsu-e1757418733953-300x300.png`,                desc:'Salsa tonkatsu japonesa. La clásica salsa para acompañar el cerdo empanado.' },
      { name:'Salsa Wasabi Mayo',                price:'6,10 €', img:`${B}2025/07/mayo-con-wasabi-e1757419547698-300x300.png`,               desc:'Mayonesa con wasabi. La combinación picante y cremosa más popular del sushi.' },
      { name:'Salsa Yakisoba',                   price:'6,00 €', img:`${B}2025/07/71fzvdejL8S._SL1500_-300x300.png`,                         desc:'Salsa yakisoba. Imprescindible para preparar fideos salteados japoneses.' },
      { name:'Salsa Yakitori',                   price:'4,70 €', img:`${B}2025/07/salsa-yakitori-e1757418702888-300x300.png`,               desc:'Salsa yakitori japonesa. Dulce y salada, perfecta para brochetas.' },
      { name:'Salsa Setas Sin Gluten',           price:'6,40 €', img:`${B}2025/07/salsa-de-setas-sin-gluten-300x300.png`,                   desc:'Salsa de setas sin gluten, intensa en sabor umami.' },
      { name:'Sriracha 200ml',                   price:'3,70 €', img:`${B}2025/07/sriracha-pequena-e1757418472499-292x300.png`,             desc:'La salsa picante de chile más famosa de Asia. 200ml.' },
      { name:'Sriracha 435ml',                   price:'5,00 €', img:`${B}2025/07/sriracha-grande-e1757418602713-300x300.png`,              desc:'Sriracha en formato mediano 435ml.' },
      { name:'Sriracha 740ml',                   price:'6,50 €', img:`${B}2025/07/sriracha-grande-sin-gluten-e1757418624734-300x300.png`,   desc:'Sriracha en formato grande 740ml para consumo habitual.' },
      { name:'Sriracha Lemongrass',              price:'5,45 €', img:`${B}2025/07/salsa-sriracha-con-lemongrass-eagle-440ml-300x300.png`,  desc:'Sriracha con hierba limón. Picante y aromática. 440ml.' },
      { name:'Sriracha Mayo 200ml',              price:'3,90 €', img:`${B}2025/07/sriracha-mayo-pequena-e1757418502138-300x300.png`,        desc:'Mayonesa con sriracha. La salsa picante perfecta.' },
      { name:'Sriracha Mayo 435ml',              price:'5,70 €', img:`${B}2025/07/sriracha-mayo-grande-e1757418536908-300x300.png`,         desc:'Mayonesa sriracha en formato grande.' },
      { name:'Sushi Mayo Kimchi',                price:'3,95 €', img:`${B}2025/07/sriracha-kimchi-pequena-sin-gluten-e1757418572621-300x300.png`, desc:'Mayonesa de sushi con kimchi. Sin gluten.' },
      { name:'Soja Coosur Spray Sin Gluten',     price:'4,60 €', img:`${B}2025/07/soja-sin-gluten-spray-e1757418669764-300x300.png`,        desc:'Salsa de soja en formato spray. Perfecta para dosificar.' },
    ]
  },
  {
    id: 'te', name: '🍵 Té & Matcha',
    products: [
      { name:'Matcha Ceremonial',           price:'14,70 €', img:`${B}2025/09/temat-removebg-preview-300x300.png`,                    desc:'Matcha de grado ceremonial. El mejor matcha para preparar al estilo japonés con chasen.' },
      { name:'Matcha Instantáneo',          price:'8,90 €',  img:`${B}2025/07/matcha-instantaneo-e1757417929525-289x300.png`,          desc:'Matcha en polvo para batidos, lattes y recetas. De disolución rápida.' },
      { name:'Matcha Latte con Jengibre',   price:'8,40 €',  img:`${B}2025/07/matcha-latte-con-genjibre-e1757344786456-300x300.png`,  desc:'Mix de matcha con jengibre para preparar un latte especial. Energizante y especiado.' },
      { name:'Té Verde Sencha Tostado',     price:'8,90 €',  img:`${B}2025/07/te-verde-sencha-tostado-e1757419501486-300x300.png`,    desc:'Té verde japonés sencha con un suave sabor tostado. Ideal para la tarde.' },
    ]
  },
];

/* ──────────────────────────────────────────────
   RENDERIZAR CATÁLOGO
────────────────────────────────────────────── */
function renderCatalog() {
  const nav    = document.getElementById('tienda-nav');
  const panels = document.getElementById('tienda-panels');
  if (!nav || !panels) return;

  CATALOG.forEach((cat, i) => {
    /* Tab */
    const btn = document.createElement('button');
    btn.className = 'tienda-tab' + (i === 0 ? ' active' : '');
    btn.dataset.cat = cat.id;
    btn.textContent = cat.name;
    nav.appendChild(btn);

    /* Panel */
    const panel = document.createElement('div');
    panel.className = 'tienda-panel' + (i === 0 ? ' active' : '');
    panel.id = 'tcat-' + cat.id;

    const grid = document.createElement('div');
    grid.className = 'prod-grid';

    cat.products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'prod-card';
      card.dataset.name  = p.name;
      card.dataset.price = p.price;
      card.dataset.desc  = p.desc || 'Producto importado directamente de Asia.';
      card.dataset.img   = p.img;
      card.dataset.cat   = cat.name.replace(/^.+? /, ''); // quitar emoji

      card.innerHTML = `
        <div class="prod-img"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.2'"></div>
        <div class="prod-body"><h4>${p.name}</h4><span class="prod-price">${p.price}</span></div>
      `;
      grid.appendChild(card);
    });

    panel.appendChild(grid);
    panels.appendChild(panel);
  });

  /* Tab switching */
  nav.addEventListener('click', e => {
    const btn = e.target.closest('.tienda-tab');
    if (!btn || btn.classList.contains('active')) return;
    nav.querySelectorAll('.tienda-tab').forEach(b => b.classList.remove('active'));
    panels.querySelectorAll('.tienda-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tcat-' + btn.dataset.cat);
    panel.classList.add('active');
    gsap.fromTo(panel.querySelectorAll('.prod-card'),
      { opacity:0, y:18 },
      { opacity:1, y:0, duration:0.4, stagger:0.025, ease:'power3.out' }
    );
  });

  /* Modal al hacer clic en producto */
  panels.addEventListener('click', e => {
    const card = e.target.closest('.prod-card');
    if (!card) return;
    openProductModal(card.dataset);
  });

  /* Animar primera pestaña */
  setTimeout(() => {
    const first = panels.querySelector('.prod-card');
    if (first) {
      gsap.fromTo(panels.querySelectorAll('.tienda-panel.active .prod-card'),
        { opacity:0, y:18 },
        { opacity:1, y:0, duration:0.4, stagger:0.025, ease:'power3.out' }
      );
    }
  }, 300);
}

/* ──────────────────────────────────────────────
   MODAL DE PRODUCTO (tienda)
────────────────────────────────────────────── */
function initProductModal() {
  const modal   = document.getElementById('prod-modal');
  if (!modal) return;
  const backdrop = modal.querySelector('.pmodal-backdrop');
  const closeBtn = modal.querySelector('.pmodal-close');

  window.openProductModal = function({ name, price, desc, img, cat }) {
    document.getElementById('pmodal-img').src  = img;
    document.getElementById('pmodal-img').alt  = name;
    document.getElementById('pmodal-name').textContent  = name;
    document.getElementById('pmodal-price').textContent = price;
    document.getElementById('pmodal-desc').textContent  = desc;
    document.getElementById('pmodal-cat').textContent   = cat || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ──────────────────────────────────────────────
   TABS CARTA
────────────────────────────────────────────── */
function initTabs() {
  const btns   = document.querySelectorAll('.carta-tabs .tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  function animateCards(panel) {
    const cards = panel.querySelectorAll('.carta-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out' }
    );
  }

  /* Animar pestaña inicial */
  const active = document.querySelector('.tab-panel.active');
  if (active) setTimeout(() => animateCards(active), 300);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const current = document.querySelector('.tab-panel.active');
      const next    = document.getElementById('tab-' + btn.dataset.tab);

      gsap.to(current, {
        opacity: 0, y: 8, duration: 0.18,
        onComplete() {
          current.classList.remove('active');
          gsap.set(current, { opacity: 1, y: 0 });
          next.classList.add('active');
          animateCards(next);
        }
      });
    });
  });
}

/* ──────────────────────────────────────────────
   HERO VIDEO — bucle normal (sin efecto scroll)
────────────────────────────────────────────── */
function initHeroVideo() {
  const fallback = document.getElementById('hero-fallback');
  const hero     = document.getElementById('hero');

  const v = document.createElement('video');
  v.muted = true; v.playsInline = true; v.autoplay = true; v.loop = true;
  v.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;';

  v.addEventListener('canplay', () => { fallback.style.display = 'none'; });
  v.addEventListener('error',   () => { fallback.style.display = 'block'; });

  v.src = 'assets/hero.mp4';
  hero.insertBefore(v, fallback);
}

/* ──────────────────────────────────────────────
   HERO PARALLAX (círculo rojo)
────────────────────────────────────────────── */
function initHeroParallax() {
  gsap.to('.hero-circle', {
    scrollTrigger: {
      trigger: '#hero',
      start : 'top top',
      end   : 'bottom top',
      scrub : 1
    },
    y: 120,
    scale: 1.15,
    ease: 'none'
  });

  /* kanji background eliminado */
}

/* ──────────────────────────────────────────────
   SMOOTH ANCHORS
────────────────────────────────────────────── */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });
  });
}

/* ──────────────────────────────────────────────
   CAROUSEL RESEÑAS (solo móvil)
   Muestra 1 página de 3 reseñas, swipe para pasar
────────────────────────────────────────────── */
function initResenasCarousel() {
  const cards = Array.from(document.querySelectorAll('.resena-card'));
  if (!cards.length) return;

  let current = 0;
  cards[0].classList.add('active');

  /* Envolver grid en slider-wrap */
  const grid = document.querySelector('.resenas-grid');
  const wrap = document.createElement('div');
  wrap.className = 'resenas-slider-wrap';
  grid.parentNode.insertBefore(wrap, grid);
  wrap.appendChild(grid);

  /* Flechas */
  const mkArrow = (cls, path) => {
    const btn = document.createElement('button');
    btn.className = 'resena-arrow ' + cls;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="${path}"/></svg>`;
    return btn;
  };
  const prevBtn = mkArrow('resena-arrow-prev', 'M15 18l-6-6 6-6');
  const nextBtn = mkArrow('resena-arrow-next', 'M9 18l6-6-6-6');
  prevBtn.setAttribute('aria-label', 'Anterior');
  nextBtn.setAttribute('aria-label', 'Siguiente');
  wrap.insertBefore(prevBtn, grid);
  wrap.appendChild(nextBtn);

  /* Dots */
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'resenas-dots';
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'resenas-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Reseña ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  wrap.after(dotsWrap);

  function updateBtns() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === cards.length - 1;
  }

  function goTo(n) {
    if (n === current) return;
    const dir      = n > current ? 1 : -1;
    const animName = dir > 0 ? 'cardEnterRight' : 'cardEnterLeft';

    /* Ocultar card actual */
    cards[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');

    /* Mostrar nueva card con animación direccional */
    current = n;
    const inCard = cards[current];
    inCard.style.animation = `${animName} 0.45s cubic-bezier(0.16,1,0.3,1) forwards`;
    inCard.classList.add('active');
    dotsWrap.children[current].classList.add('active');
    updateBtns();

    /* Limpiar inline style al terminar */
    inCard.addEventListener('animationend', () => {
      inCard.style.animation = '';
    }, { once: true });
  }

  prevBtn.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  nextBtn.addEventListener('click', () => { if (current < cards.length - 1) goTo(current + 1); });
  updateBtns();

  /* Swipe táctil */
  let startX = 0, startY = 0, moved = false;
  grid.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; moved = false; }, { passive: true });
  grid.addEventListener('touchmove',  () => { moved = true; }, { passive: true });
  grid.addEventListener('touchend', e => {
    if (!moved) return;
    const dx = startX - e.changedTouches[0].clientX;
    const dy = Math.abs(startY - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 45 && Math.abs(dx) > dy) {
      if (dx > 0 && current < cards.length - 1) goTo(current + 1);
      if (dx < 0 && current > 0) goTo(current - 1);
    }
  }, { passive: true });
}

/* ──────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initSakura();
  initLoader();
  initNavbar();
  initHeroVideo();
  renderCatalog();
  initProductModal();
  initScrollAnimations();
  initTabs();
  initHeroParallax();
  initSmoothLinks();
  initResenasCarousel();
});
