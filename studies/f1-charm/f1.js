/* Study F.1 — data and drawings.
   Product facts: search-index snapshot of josephbenmartin.com, 23 Nov 2026 (the site itself is blocked from
   this environment; see docs/AUDIT.md). Each hat records what its listing says and how sure we are.

   Drawings, version 2. The old study used one generic hat for all four designs. That is gone.
   What a listing documents is drawn SOLID, at large scale, as a band plate: the ribbon, the twine, the
   suede, the charm, the feather. What no source shows us (crown height, crease, brim width and roll) is
   drawn DASHED and labelled "outline not verified". The dashed outline is one shape for every hat on
   purpose: drawing four different crowns without photographs would be invention. */
(function (root) {
  var SHOP = 'https://josephbenmartin.com';
  var C = { gold: '#C9A465', denim: '#3D4E78', rust: '#9A4A2A', twine: '#CDBB97' };
  var HATS = {
    ahab: {
      no: 'JM·H·001', name: 'Ahab', felt: 'natural', feltName: 'Natural', hex: '#D9CDB6', tone: 'light', charm: 'sail',
      line: 'Natural dress-weight felt with two-tone ribbons, an indigo denim band accent and a gold sailboat charm.',
      listed: 'Ready-to-wear', listedConf: 'medium',
      specs: [['Felt', 'Dress weight, natural'], ['Listed as', 'Ready-to-wear*'], ['Size', 'Not captured'], ['Price', '$1,675 or $1,395*']],
      price: '$1,675*', priceNote: 'Product page $1,675; an earlier collection snapshot showed $1,395. Confirm.',
      url: SHOP + '/products/ahab',
      details: [['Two-tone ribbons', 'Band'], ['Indigo denim accent', 'Band'], ['Gold sailboat charm', 'Adornment']]
    },
    artemis: {
      no: 'JM·H·002', name: 'Artemis', felt: 'granite', feltName: 'Granite', hex: '#66665F', tone: 'dark', charm: 'moon',
      line: 'Dress-weight fur felt in granite. A two-tone bow and keeper, a band of twine wrapped twice, and gold moon charms.',
      listed: 'Made to order', listedConf: 'medium',
      specs: [['Felt', 'Fur felt, dress weight, granite'], ['Listed as', 'Made to order, about 4–6 weeks'], ['Also', 'One size 7 ⅜ on sale (/aurora)'], ['Price', '$1,625']],
      price: '$1,625', url: SHOP + '/products/artemis',
      details: [['Twine, wrapped twice', 'Band'], ['Two-tone bow and keeper', 'Band'], ['Gold moon charms', 'Adornment']]
    },
    oris: {
      no: 'JM·H·003', name: 'Oris', felt: 'whiskey', feltName: 'Whiskey', hex: '#8E5A2C', tone: 'dark', charm: 'leaf',
      line: 'Fur felt in whiskey with a tonal ribbon, a turkey feather, beadwork finished with a gold leaf charm, and a binding that runs only part of the way around the brim.',
      listed: 'Not stated', listedConf: 'low',
      specs: [['Felt', 'Fur felt, whiskey'], ['Size', '7 ½ (single size listed)'], ['Listed as', 'Not stated*'], ['Price', '$1,625']],
      price: '$1,625', url: SHOP + '/products/hb',
      details: [['Tonal ribbon', 'Band'], ['Turkey feather', 'Adornment'], ['Beadwork, gold leaf charm', 'Adornment'], ['Partial brim binding', 'Brim']]
    },
    cerelia: {
      no: 'JM·H·004', name: 'Cerelia', felt: 'pecan', feltName: 'Pecan', hex: '#5A3D2B', tone: 'dark', charm: 'flower',
      line: 'Western-weight fur felt in pecan, with a rust suede accent band, floral and script embroidery, and a gold flower charm.',
      listed: 'Made to order', listedConf: 'high',
      specs: [['Felt', 'Fur felt, western weight, pecan'], ['Listed as', 'To order, about 4–6 weeks'], ['Size', 'Not captured'], ['Price', '$1,795']],
      price: '$1,795', url: SHOP + '/products/primavera',
      details: [['Rust suede accent band', 'Band'], ['Floral and script embroidery', 'Crown (pattern unknown)'], ['Gold flower charm', 'Adornment']]
    }
  };
  // hats found in the audit with too little detail to draw; listed, never drawn
  var MORE = [
    { name: 'Woodrow', url: SHOP + '/products/todd', note: 'Camel fur felt · size 6 ¾ · made to order, 4–6 weeks', price: '$1,675' },
    { name: 'Cech', url: SHOP + '/products/czech', note: 'Made to order, 8–10 weeks · details not captured', price: 'Not captured' },
    { name: 'Ralph', url: SHOP + '/collections/made-to-order', note: 'In the made-to-order collection · price unclear', price: '$950 or $1,825?' }
  ];
  var CAPS = [
    ['Cowboy George Foam Trucker', '$45', SHOP + '/products/cowboy-george-foam-trucker'],
    ['JM Hatmaker Cap', '$45', SHOP + '/products/jm-hatmaker-cap'],
    ['JM Cord Cap', '$45', SHOP + '/products/jm-cord-cap'],
    ['Tiger Camo Cap', '$45', SHOP + '/products/tiger-camo'],
    ['JM Resort Cap', '$45', SHOP + '/collections/caps'],
    ['JM Wildflower Cord Cap', '$245', SHOP + '/collections/caps'],
    ['Cowboy George Tee', '$45', SHOP + '/collections/all'],
    ['Tres Banditos Tee', '$45', SHOP + '/collections/all']
  ];
  var ORDER = ['ahab', 'artemis', 'oris', 'cerelia'];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;') }
  function fr(s) { return esc(s).replace(/([½⅜¼¾])/g, '<span class="fr">$1</span>') }

  // ——— the unverified outline: one shape, dashed, for every hat ———
  var OUTLINE = [
    'M118 344 C 200 364, 300 372, 362 373 L 638 373 C 700 372, 800 364, 882 344',
    'M118 344 C 108 350, 112 360, 130 366 C 240 400, 380 410, 500 410 C 620 410, 760 400, 870 366 C 888 360, 892 350, 882 344',
    'M364 373 C 356 306, 360 226, 380 168 C 390 138, 414 124, 446 128 C 470 131, 484 143, 500 143 C 516 143, 530 131, 554 128 C 586 124, 610 138, 620 168 C 640 226, 644 306, 636 373',
    'M446 128 C 466 154, 484 162, 500 163 C 516 162, 534 154, 554 128'
  ];
  // the band zone on the outline, where documented details are placed at small scale
  function outlineSVG(key, opt) {
    opt = opt || {};
    var h = HATS[key], o = [];
    o.push('<svg class="hat2" viewBox="90 100 820 330" role="img" aria-label="' + esc(h.name + ': documented details drawn solid; the outline of the hat is not verified and is drawn dashed.') + '">');
    OUTLINE.forEach(function (d) { o.push('<path class="unv" d="' + d + '"/>') });
    // band position, solid: the one place every listing describes
    o.push('<path class="doc" d="M366 330 C 440 337, 560 337, 634 330 L 635 356 C 560 363, 440 363, 365 356 Z" style="fill:' + bandFill(key) + '"/>');
    if (key === 'oris') o.push('<path class="doc" d="M604 352 C 626 300, 652 246, 700 182 C 698 232, 668 292, 618 350 Z"/><path class="doc" d="M130 366 C 240 400, 380 410, 500 410" style="stroke-width:3.4"/>');
    if (key === 'ahab') o.push('<path d="M596 331 L 624 330 L 625 357 L 596 358 Z" style="fill:' + C.denim + '"/>');
    if (key === 'artemis') o.push('<path class="doc" d="M612 343 C 600 326, 588 328, 590 343 C 588 358, 600 360, 612 343 Z M 612 343 C 624 326, 636 328, 634 343 C 636 358, 624 360, 612 343 Z" style="fill:#8A8A82"/>');
    if (key === 'cerelia') o.push('<path class="doc" d="M420 300 C 450 250, 480 270, 472 236 C 464 206, 502 196, 514 222 C 524 244, 550 230, 558 210" style="stroke-dasharray:2 4"/>');
    o.push('<circle cx="472" cy="346" r="7" style="fill:' + C.gold + '"/>');
    if (opt.labels) {
      o.push('<text class="t" x="500" y="94" text-anchor="middle">Outline not verified · trace from photograph</text>');
    }
    o.push('</svg>');
    return o.join('');
  }
  function bandFill(key) {
    return { ahab: '#4A4945', artemis: C.twine, oris: '#6E4320', cerelia: C.rust }[key];
  }

  // ——— the band plate: documented details at large scale ———
  function charmPath(kind) {
    return {
      moon: 'M 8 4 A 28 28 0 1 0 8 60 A 30 30 0 0 1 8 4 Z',
      sail: 'M 2 2 L 24 44 H 2 Z M -3 14 L -22 44 H -3 Z M -28 48 H 28 L 19 60 H -19 Z',
      leaf: 'M 0 2 C 24 16, 25 42, 0 60 C -25 42, -24 16, 0 2 Z',
      flower: [0, 1, 2, 3, 4].map(function (i) { var a = i * 2 * Math.PI / 5; return 'M ' + (17 * Math.sin(a)).toFixed(1) + ' ' + (31 - 17 * Math.cos(a)).toFixed(1) + ' m -11 0 a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0' }).join(' ')
    }[kind];
  }
  function hang(kind, x, y, s, line) {
    var r = 5.5 * s;
    return (line ? '<path class="doc" d="M ' + x + ' ' + (y - line) + ' V ' + (y - r) + '" style="stroke-width:1"/>' : '') +
      '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + C.gold + '" stroke-width="' + (2.2 * s) + '"/>' +
      '<path transform="translate(' + x + ' ' + (y + r) + ') scale(' + s + ')" d="' + charmPath(kind) + '" fill="' + C.gold + '" fill-rule="' + (kind === 'sail' ? 'evenodd' : 'nonzero') + '"/>';
  }
  var LABELS = {};
  function bandPlate(key, opt) {
    opt = opt || {};
    var o = ['<svg class="plate2" viewBox="0 0 1000 420" role="img" aria-label="' + esc(HATS[key].name + ': band plate, the documented details at large scale') + '">'];
    // the felt above and below the band, as fields
    o.push('<line class="unv" x1="0" y1="120" x2="1000" y2="120"/><line class="unv" x1="0" y1="250" x2="1000" y2="250"/>');
    var lab = [];
    if (key === 'ahab') {
      o.push('<rect x="0" y="130" width="1000" height="56" fill="#4A4945"/><rect x="0" y="186" width="1000" height="54" fill="#9A9890"/>');
      o.push('<clipPath id="dn-' + key + '"><rect x="640" y="130" width="120" height="110"/></clipPath><g clip-path="url(#dn-' + key + ')"><rect x="640" y="130" width="120" height="110" fill="' + C.denim + '"/>');
      for (var i = 0; i < 26; i++) o.push('<line x1="' + (640 + i * 5) + '" y1="130" x2="' + (640 + i * 5 + 22) + '" y2="240" stroke="#fff" stroke-opacity=".12" />');
      o.push('</g>' + hang('sail', 420, 214, 1.6, 0));
      lab = [[200, 290, 'Two-tone ribbons (tones not documented)'], [700, 290, 'Indigo denim accent'], [420, 340, 'Gold sailboat charm']];
    }
    if (key === 'artemis') {
      for (var r = 0; r < 2; r++) {
        var y = 152 + r * 58;
        o.push('<rect x="0" y="' + (y - 20) + '" width="1000" height="40" fill="' + C.twine + '"/>');
        for (var j = 0; j < 84; j++) o.push('<path d="M ' + (j * 12) + ' ' + (y - 20) + ' l 14 40" stroke="#8C7A57" stroke-width="2"/>');
      }
      o.push('<path d="M700 185 C 640 120, 590 130, 600 185 C 590 240, 640 250, 700 185 Z" fill="#4A4945"/><path d="M700 185 C 760 120, 810 130, 800 185 C 810 240, 760 250, 700 185 Z" fill="#9A9890"/><rect x="688" y="158" width="24" height="54" fill="#22221F"/>');
      o.push(hang('moon', 430, 236, 1.2, 0) + hang('moon', 500, 236, 1.0, 0));
      lab = [[150, 290, 'Twine, wrapped twice'], [700, 290, 'Two-tone bow and keeper (tones not documented)'], [460, 360, 'Gold moon charms']];
    }
    if (key === 'oris') {
      o.push('<rect x="0" y="130" width="1000" height="110" fill="#6E4320"/>');
      o.push('<path d="M760 250 C 800 170, 850 80, 940 0 C 940 80, 880 190, 790 250 Z" fill="#B9A487" stroke="#3B2A18" stroke-width="1.5"/>');
      for (var f = 0; f < 18; f++) o.push('<line x1="' + (782 + f * 8.5) + '" y1="' + (240 - f * 13) + '" x2="' + (800 + f * 8.5 + 26) + '" y2="' + (232 - f * 13 - 6) + '" stroke="#3B2A18" stroke-width="1"/>');
      o.push('<line x1="772" y1="250" x2="938" y2="4" stroke="#3B2A18" stroke-width="2"/>');
      for (var b = 0; b < 24; b++) o.push('<circle cx="' + (180 + b * 15) + '" cy="' + (190 + Math.sin(b / 3) * 4) + '" r="5.5" fill="#B5B2AA" stroke="#3B2A18" stroke-width="1"/>');
      o.push(hang('leaf', 556, 186, 1.5, 0));
      o.push('<path d="M0 330 C 300 360, 520 366, 600 366" stroke="#E7DCC6" stroke-width="10" fill="none"/><path d="M0 330 C 300 360, 600 370, 1000 352" stroke="#E7DCC6" stroke-width="1" stroke-dasharray="4 6" fill="none"/><line x1="600" y1="350" x2="600" y2="384" stroke="' + '#E7DCC6' + '" stroke-width="1"/>');
      lab = [[120, 158, 'Tonal ribbon'], [330, 228, 'Beadwork (colour not documented)'], [556, 302, 'Gold leaf charm'], [870, 290, 'Turkey feather'], [300, 400, 'Binding: stops part of the way round']];
    }
    if (key === 'cerelia') {
      o.push('<rect x="0" y="130" width="1000" height="110" fill="' + C.rust + '"/>');
      for (var n = 0; n < 1400; n += 7) o.push('<circle cx="' + ((n * 37) % 1000) + '" cy="' + (134 + (n * 13) % 102) + '" r="1.1" fill="#000" fill-opacity=".18"/>');
      o.push(hang('flower', 470, 182, 1.5, 0));
      o.push('<rect x="560" y="20" width="400" height="84" fill="none" stroke="#E7DCC6" stroke-dasharray="4 5"/><text class="t" x="760" y="66" text-anchor="middle">Embroidery · pattern not seen</text>');
      lab = [[160, 290, 'Rust suede accent band'], [470, 302, 'Gold flower charm']];
    }
    LABELS[key] = lab.map(function (l) { return l[2] });
    if (opt.marks !== false) lab.forEach(function (l, k) {
      o.push('<circle cx="' + l[0] + '" cy="' + (l[1] - 5) + '" r="17" class="nbc2"/><text class="t nb2" x="' + l[0] + '" y="' + (l[1] - 5) + '" text-anchor="middle" dominant-baseline="central">' + (k + 1) + '</text>');
    });
    o.push('</svg>');
    return o.join('');
  }

  function mount() {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion');
    document.querySelectorAll('[data-outline]').forEach(function (el) { el.innerHTML = outlineSVG(el.dataset.outline, { labels: el.hasAttribute('data-labels') }) });
    document.querySelectorAll('[data-band]').forEach(function (el) { el.innerHTML = bandPlate(el.dataset.band, { marks: !el.hasAttribute('data-nomarks') }) });
    document.querySelectorAll('[data-m]').forEach(function (el) { if (window.JMMARKS && JMMARKS[el.dataset.m]) el.innerHTML = JMMARKS[el.dataset.m] });
    var d = document.getElementById('menu'), op = document.getElementById('menu-open');
    if (d && op) {
      op.addEventListener('click', function () { d.showModal() });
      d.querySelector('[data-close]').addEventListener('click', function () { d.close() });
      d.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { d.close() }) });
    }
  }
  function bandLegend(key) { bandPlate(key); return '<ol class="legend2">' + LABELS[key].map(function (t) { return '<li>' + esc(t) + '</li>' }).join('') + '</ol>' }
  root.JM1 = { bandLegend: bandLegend, HATS: HATS, MORE: MORE, CAPS: CAPS, ORDER: ORDER, outlineSVG: outlineSVG, bandPlate: bandPlate, mount: mount, esc: esc, fr: fr };
})(window);
