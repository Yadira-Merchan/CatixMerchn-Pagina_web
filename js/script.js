/* ================================================ */
/*  CATIXMERCHN — script.js FINAL                  */
/* ================================================ */

/* -------- MENÚ HAMBURGUESA -------- */
function initMenu() {
  var btn     = document.getElementById('hamburger');
  var menu    = document.getElementById('navMobile');
  var overlay = document.getElementById('navOverlay');

  if (!btn || !menu) return;

  function open() {
    btn.classList.add('open');
    menu.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    btn.classList.contains('open') ? close() : open();
  });

  if (overlay) overlay.addEventListener('click', close);

  menu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });
}

/* -------- CARRUSEL -------- */
function initCarousel() {
  var el = document.getElementById('carousel');
  if (!el) return;

  var DELAY = 6000;
  var cur = 0, timer;
  var slides = el.querySelectorAll('.slide');
  var dots   = el.querySelectorAll('.dot');
  var bar    = document.getElementById('progress');

  function progress() {
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    setTimeout(function() {
      bar.style.transition = 'width ' + DELAY + 'ms linear';
      bar.style.width = '100%';
    }, 30);
  }

  window.goSlide = function(n) {
    slides[cur].className = 'slide';
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = ((n % slides.length) + slides.length) % slides.length;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
    clearInterval(timer);
    timer = setInterval(function() { goSlide(cur + 1); }, DELAY);
    progress();
  };

  window.changeSlide = function(d) { goSlide(cur + d); };

  timer = setInterval(function() { goSlide(cur + 1); }, DELAY);
  progress();
}

/* -------- SCROLL REVEAL -------- */
function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length || !window.IntersectionObserver) {
    els.forEach(function(el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.10 });
  els.forEach(function(el) { obs.observe(el); });
}

/* -------- LIGHTBOX -------- */
function initLightbox() {
  var lb = document.getElementById('lightbox');
  if (!lb) return;

  window.openLB = function(src) {
    var img = document.getElementById('lb-img');
    if (img) img.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLB = function() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  lb.addEventListener('click', function(e) {
    if (e.target === lb) closeLB();
  });
}

/* -------- FORMULARIO -------- */
function initForm() {
  window.enviar = function() {
    var campos = {
      nombre:   document.getElementById('nombre'),
      apellido: document.getElementById('apellido'),
      email:    document.getElementById('email'),
      telefono: document.getElementById('telefono'),
      asunto:   document.getElementById('asunto'),
      mensaje:  document.getElementById('mensaje')
    };

    if (!campos.nombre) return;

    function alerta(msg, campo) {
      var a = document.getElementById('form-alert');
      var s = document.getElementById('alert-msg');
      if (a && s) { s.textContent = msg; a.style.display = 'block'; }
      if (campo) { campo.focus(); campo.style.borderColor = '#e0057a'; }
      setTimeout(function() { if (a) a.style.display = 'none'; }, 5000);
    }

    var v = {};
    for (var k in campos) {
      v[k] = campos[k] ? campos[k].value.trim() : '';
    }

    if (!v.nombre)   { alerta('El campo Nombre es obligatorio.',   campos.nombre);   return; }
    if (!v.apellido) { alerta('El campo Apellido es obligatorio.', campos.apellido); return; }
    if (!v.email || v.email.indexOf('@') < 0) { alerta('Ingresa un correo válido.', campos.email); return; }
    if (!v.telefono) { alerta('El campo Teléfono es obligatorio.', campos.telefono); return; }
    if (!v.asunto)   { alerta('El campo Asunto es obligatorio.',   campos.asunto);   return; }

    var msg = 'Hola CatixMerchn! 🐾\n\n';
    msg += '👤 Nombre: ' + v.nombre + ' ' + v.apellido + '\n';
    msg += '📧 Correo: ' + v.email + '\n';
    msg += '📞 Teléfono: ' + v.telefono + '\n';
    msg += '📌 Asunto: ' + v.asunto;
    if (v.mensaje) msg += '\n💬 Mensaje: ' + v.mensaje;

    window.open('https://wa.me/593988691156?text=' + encodeURIComponent(msg), '_blank');

    var fb = document.getElementById('form-body');
    var fa = document.getElementById('form-alert');
    var fs = document.getElementById('form-success');
    if (fb) fb.style.display = 'none';
    if (fa) fa.style.display = 'none';
    if (fs) fs.style.display = 'block';
  };
}

/* -------- INIT -------- */
document.addEventListener('DOMContentLoaded', function() {
  initMenu();
  initCarousel();
  initReveal();
  initLightbox();
  initForm();
});
