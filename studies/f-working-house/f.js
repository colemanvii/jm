/* Study F — shared data and drawings.
   Hat facts: snapshot of public listings on josephbenmartin.com (Nov 2026), see docs/DISCOVERY.md.
   Nothing here is invented: where a listing is silent or conflicting, the value says so.
   Drawings are generic studies of a western hat, varied only by the details each listing names;
   they are not the exact shape of any of Joseph's hats. */
(function (root) {
  var SHOP = 'https://josephbenmartin.com';
  var HATS = {
    ahab: {
      no: 'JM·H·001', name: 'Ahab', felt: 'natural', feltName: 'Natural', hex: '#D9CDB6', tone: 'light',
      weight: 'Dress weight',
      line: 'Natural dress-weight felt with two-tone ribbons, an indigo denim band accent and a gold sailboat charm.',
      specs: [['Felt', 'Dress weight, natural'], ['Size', 'Not listed'], ['Made', 'To order'], ['Price', 'To confirm*']],
      price: 'Price to confirm', priceNote: 'The listings show $1,675 and $1,395. Confirm before launch.',
      url: SHOP + '/products/ahab',
      parts: [['Band', 'Two-tone ribbons with an indigo denim accent'], ['Adornment', 'A gold sailboat charm']],
      shots: ['Crown down, sailboat charm centred', 'Band close: where the denim meets the ribbon', 'Three-quarter, plain ground'],
      callouts: [['Crease', 500, 150, 500, 64, 1], ['Two-tone ribbons', 392, 340, 320, 286, -1], ['Indigo denim accent', 606, 340, 700, 286, 1], ['Sailboat charm', 468, 338, 590, 478, 1]]
    },
    artemis: {
      no: 'JM·H·002', name: 'Artemis', felt: 'granite', feltName: 'Granite', hex: '#66665F', tone: 'dark',
      weight: 'Dress weight',
      line: 'Dress-weight fur felt in granite. A two-tone bow and keeper, a band of twine wrapped twice, and gold moon charms.',
      specs: [['Felt', 'Fur felt, dress weight, granite'], ['Size', '7 ⅜ (one listing)'], ['Made', 'To order'], ['Price', '$1,625']],
      price: '$1,625', url: SHOP + '/products/artemis',
      parts: [['Band', 'Twine, wrapped twice'], ['Bow and keeper', 'Two-tone'], ['Adornment', 'Gold moon charms']],
      shots: ['Three-quarter view, one hard light, shadow kept', 'The twine wrap, macro', 'Moon charms against the granite'],
      callouts: [['Crease', 500, 150, 500, 64, 1], ['Twine, wrapped twice', 404, 340, 320, 286, -1], ['Bow and keeper', 612, 340, 700, 286, 1], ['Moon charms', 470, 338, 590, 478, 1]]
    },
    oris: {
      no: 'JM·H·003', name: 'Oris', felt: 'whiskey', feltName: 'Whiskey', hex: '#8E5A2C', tone: 'dark',
      weight: 'Fur felt',
      line: 'Fur felt in whiskey, with a turkey feather, beadwork finished with a gold leaf charm, and a binding that runs only part of the way around the brim.',
      specs: [['Felt', 'Fur felt, whiskey'], ['Size', '7 ½'], ['Made', 'To order'], ['Price', '$1,625']],
      price: '$1,625', url: SHOP + '/products/hb',
      parts: [['Adornment', 'A turkey feather'], ['Beadwork', 'Finished with a gold leaf charm'], ['Binding', 'Partial: it runs only part of the way around the brim']],
      shots: ['Profile at crown height: feather and partial binding visible', 'The beadwork and leaf charm, macro', 'The brim edge where the binding stops'],
      callouts: [['Crease', 500, 150, 500, 64, 1], ['Turkey feather', 676, 214, 720, 130, 1], ['Beadwork', 404, 340, 320, 286, -1], ['Gold leaf charm', 470, 340, 590, 478, 1], ['Partial binding', 210, 376, 300, 470, -1]]
    },
    cerelia: {
      no: 'JM·H·004', name: 'Cerelia', felt: 'pecan', feltName: 'Pecan', hex: '#5A3D2B', tone: 'dark',
      weight: 'Western weight',
      line: 'Western-weight fur felt in pecan, with a rust suede accent band, floral and script embroidery, and a gold flower charm.',
      specs: [['Felt', 'Fur felt, western weight, pecan'], ['Size', 'Not listed'], ['Made', 'To order, about 4–6 weeks*'], ['Price', '$1,795']],
      price: '$1,795', url: SHOP + '/products/primavera',
      parts: [['Band', 'Rust suede accent band'], ['Embroidery', 'Floral and script'], ['Adornment', 'A gold flower charm']],
      shots: ['Embroidery close, then the full hat', 'Suede against the pecan felt', 'Flower charm, eye level'],
      callouts: [['Embroidery', 540, 236, 700, 150, 1], ['Rust suede band', 404, 340, 320, 286, -1], ['Flower charm', 470, 340, 590, 478, 1]]
    }
  };
  var ORDER = ['ahab', 'artemis', 'oris', 'cerelia'];

  // ——— the drawing ———
  var BASE = [
    ['M118 344 C 200 364, 300 372, 362 373 L 638 373 C 700 372, 800 364, 882 344', 1100],                 // brim top edge
    ['M118 344 C 108 350, 112 360, 130 366 C 240 400, 380 410, 500 410 C 620 410, 760 400, 870 366 C 888 360, 892 350, 882 344', 1200], // brim underside
    ['M364 373 C 356 306, 360 226, 380 168 C 390 138, 414 124, 446 128 C 470 131, 484 143, 500 143 C 516 143, 530 131, 554 128 C 586 124, 610 138, 620 168 C 640 226, 644 306, 636 373', 1100], // crown
    ['M446 128 C 466 154, 484 162, 500 163 C 516 162, 534 154, 554 128', 300],                                // crease
    ['M396 182 C 404 222, 406 258, 402 292', 140], ['M604 182 C 596 222, 594 258, 598 292', 140],          // pinch
    ['M366 330 C 440 337, 560 337, 634 330', 300], ['M365 356 C 440 363, 560 363, 635 356', 300]           // band
  ];
  var DETAIL = {
    ahab: [
      ['M366 343 C 440 350, 560 350, 634 343', 300],                                       // two-tone ribbon split
      ['M596 332 L 624 330 L 624 357 L 596 359 Z', 120, 'fillc'],                          // denim accent
      ['M456 340 h 24 l -4 6 h -16 Z M 468 340 V 318 L 478 336 H 468', 90]                 // sailboat
    ],
    artemis: [
      ['M366 339 C 440 346, 560 346, 634 339', 300, 'thin2'], ['M366 348 C 440 355, 560 355, 634 348', 300, 'thin2'],
      ['M612 343 C 600 326, 588 328, 590 343 C 588 358, 600 360, 612 343 Z M 612 343 C 624 326, 636 328, 634 343 C 636 358, 624 360, 612 343 Z', 160],
      ['M608 338 h 8 v 10 h -8 Z', 40],
      ['M468 330 a 7 7 0 1 0 6 12 a 5.5 5.5 0 1 1 -6 -12 Z', 60], ['M488 333 a 6 6 0 1 0 5 10 a 4.6 4.6 0 1 1 -5 -10 Z', 50]
    ],
    oris: [
      ['M604 352 C 626 300, 652 246, 700 182 C 698 232, 668 292, 618 350 Z', 420], ['M606 352 L 696 190', 200],
      ['M382 343 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 396 344 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 410 344 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 424 345 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 438 345 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 452 345 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0', 200],
      ['M462 352 C 462 338, 472 330, 482 328 C 482 342, 474 350, 462 352 Z M 462 352 L 478 334', 80],
      ['M130 366 C 240 400, 380 410, 500 410', 420, 'heavy']                                // partial binding
    ],
    cerelia: [
      ['M366 330 C 440 337, 560 337, 634 330 L 635 356 C 560 363, 440 363, 365 356 Z', 600, 'hatch'],
      ['M430 290 C 450 250, 478 268, 470 236 C 462 206, 500 196, 512 222 C 522 244, 548 230, 556 210 C 562 194, 584 196, 580 218', 400, 'dash'],
      ['M444 300 c 6 -8 14 -8 18 0 M 538 284 c 8 -10 18 -10 22 0', 60, 'dash'],
      ['M470 337 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 470 329 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 477 334 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 463 334 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 474 342 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 466 342 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', 120]
    ]
  };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;') }

  function hatSVG(key, opt) {
    opt = opt || {};
    var h = HATS[key], out = [], i;
    var vb = opt.callouts ? '60 40 900 470' : '96 100 808 330';
    out.push('<svg class="hat-svg' + (opt.draw ? ' draw' : '') + '" viewBox="' + vb + '" role="img" aria-label="' +
      esc('Line drawing of a western hat with the details listed for ' + h.name + '. A study, not the exact shape of the hat.') + '">');
    if (opt.callouts) out.push('<line class="ln thin" x1="80" y1="373" x2="920" y2="373"/><line class="ln thin" x1="500" y1="50" x2="500" y2="440"/>');
    if (key === 'cerelia') out.push('<defs><pattern id="hatch-' + (opt.id || key) + '" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="1"/></pattern></defs>');
    BASE.concat(DETAIL[key]).forEach(function (p) {
      var cls = 'ln', extra = '';
      if (p[2] === 'fillc') { cls = 'fillc'; }
      if (p[2] === 'heavy') cls += ' heavy';
      if (p[2] === 'thin2') extra = ' style="--len:' + p[1] + ';stroke-width:.8"';
      if (p[2] === 'dash') extra = ' style="stroke-dasharray:4 4"';
      if (p[2] === 'hatch') extra = ' style="--len:' + p[1] + ';fill:url(#hatch-' + (opt.id || key) + ');fill-opacity:.55"';
      if (!extra) extra = ' style="--len:' + p[1] + '"';
      out.push('<path class="' + cls + '" d="' + p[0] + '"' + extra + '/>');
    });
    if (opt.callouts) {
      h.callouts.forEach(function (c, n) {
        var lab = c[0], px = c[1], py = c[2], lx = c[3], ly = c[4], dir = c[5];
        var tx = lx + dir * 34;
        out.push('<circle class="dot" cx="' + px + '" cy="' + py + '" r="3.2"/>');
        out.push('<polyline class="lead" points="' + px + ',' + py + ' ' + lx + ',' + ly + ' ' + tx + ',' + ly + '"/>');
        var cx = tx + dir * 14;
        out.push('<circle class="nbc" cx="' + cx + '" cy="' + ly + '" r="11"/><text class="nb" x="' + cx + '" y="' + (ly + 4.5) + '" text-anchor="middle">' + (n + 1) + '</text>');
        out.push('<text class="lbl" x="' + (cx + dir * 20) + '" y="' + (ly + 5) + '" text-anchor="' + (dir > 0 ? 'start' : 'end') + '">' + esc(lab) + '</text>');
      });
    }
    out.push('</svg>');
    return out.join('');
  }
  // DM Mono has no vulgar fractions: set them in the sans so "7 ½" never falls back to a wrong glyph.
  function fr(s) { return esc(s).replace(/([½⅜¼¾])/g, '<span class="fr">$1</span>') }
  function legend(key) {
    return '<ol class="legend">' + HATS[key].callouts.map(function (c) { return '<li>' + esc(c[0]) + '</li>' }).join('') + '</ol>';
  }

  function mount() {
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) document.documentElement.classList.add('motion');
    document.querySelectorAll('[data-hat]').forEach(function (el) {
      el.innerHTML = hatSVG(el.dataset.hat, { callouts: el.hasAttribute('data-callouts'), draw: el.hasAttribute('data-draw'), id: el.id });
    });
    var d = document.getElementById('menu'), o = document.getElementById('menu-open');
    if (d && o) {
      o.addEventListener('click', function () { d.showModal() });
      d.querySelector('[data-close]').addEventListener('click', function () { d.close() });
      d.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { d.close() }) });
      d.addEventListener('close', function () { o.focus({ preventScroll: true }) });
    }
  }

  root.JM = { HATS: HATS, ORDER: ORDER, hatSVG: hatSVG, legend: legend, mount: mount, esc: esc, fr: fr };
})(window);
