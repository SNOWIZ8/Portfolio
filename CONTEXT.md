# CONTEXT.md — Portfolio Arthur Viaud
# Fichier de passation complet pour Claude Code
# Dernière mise à jour : Avril 2026

---

## 🧭 VUE D'ENSEMBLE DU PROJET

| Élément | Détail |
|---|---|
| **Propriétaire** | Arthur Viaud |
| **Site** | arthurviaud.fr |
| **Repo GitHub** | https://github.com/SNOWIZ8/Portfolio |
| **Hébergeur** | Vercel (déploiement auto sur push GitHub) |
| **Stack** | HTML5 · CSS3 · JavaScript natif (vanilla) |
| **Statut** | 6 pages générées · 1 page manquante (`portfolio.html`) |

---

## 👤 PROFIL PROPRIÉTAIRE

```
Nom            : Arthur Viaud
Statut         : Étudiant 3ème année BUT Techniques de Commercialisation
Établissements : IUT de Poitiers (France) + UQAC Chicoutimi (Canada)
Double diplôme : BUT TC (Marketing Digital) + Bac Administration
Objectif       : Stage Communication & Marketing Digital
Email pro      : arthurviaudpro@gmail.com
LinkedIn       : [À RENSEIGNER — ex: linkedin.com/in/arthur-viaud]
Instagram      : [À RENSEIGNER]
Tagline        : "D'une inspiration naît une vision"
Punchline      : "Mettre l'énergie et la créativité au service de la visibilité de vos projets."
Positionnement : "Créateur de contenus & Communicant | Transformer vos projets en expériences visuelles percutantes"
```

### Disponibilités stage
```
Option 1 (prioritaire) : 4 mai → 24 juillet 2026 (3 mois)
Option 2 (longue durée): Fin août → décembre 2026
Villes visées          : Royan · La Rochelle · Bordeaux · Poitiers · Grenoble · Paris
```

### Compétences & outils
```
Outils        : Photoshop · Premiere Pro · CapCut · Framer · Excel
Compétences   : Communication digitale · Storytelling · Gestion de projet · Rédaction
Langues       : Français (natif) · Anglais (B2) · Espagnol (B1)
```

### Résultats académiques S5 (UQAC)
```
Ressources Humaines  : 82.47/100
Marketing Numérique  : 81.17/100
Recherche Marketing  : 80.19/100
Gestion Financière   : 77.30/100
```

---

## 🎨 DIRECTION ARTISTIQUE (DA) — IMMUABLE SUR TOUT LE SITE

### Palette de couleurs
```css
--bg       : #0A0F1E   /* Fond principal — Deep Navy, jamais noir pur */
--teal     : #00F2EA   /* Couleur accent principale */
--mauve    : #8A2BE2   /* Couleur accent secondaire */
--cream    : #F0ECE2   /* Texte principal */
--muted    : rgba(240,236,226,0.52)  /* Texte secondaire */
```

### Glassmorphism (système de cartes)
```css
--glass-bg   : rgba(255,255,255,0.03)
--glass-bd   : 1px solid rgba(255,255,255,0.10)
--glass-blur : blur(12px)
--radius     : 12px
```

### Typographie
```
Display / Titres XXL : Bebas Neue (Google Fonts)
Corps / UI           : DM Sans (Google Fonts) — weights 300, 400, 500
Import Google Fonts  :
  https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap
```

### Effets visuels obligatoires (présents sur TOUTES les pages)
```
1. MESH GRADIENT ANIMÉ
   - 3 à 4 blobs positionnés en fixed
   - Couleurs : --teal et --mauve
   - filter: blur(100px) · opacity: ~0.12–0.15
   - Animation : blobDrift (translation + scale + rotation, 18–35s, linear)
   - z-index: 0

2. GRAIN / NOISE OVERLAY
   - Position fixed · inset 0 · z-index 1
   - Opacity: 0.04
   - SVG feTurbulence inline en base64
   - Ne jamais retirer

3. CURSOR CUSTOM
   - .cursor : 10px · background teal · mix-blend-mode difference
   - .cursor-ring : 36px · border teal 0.32 opacity · lag fluide (lerp 0.11)
   - Au hover sur éléments interactifs : cursor passe à 18px

4. SCROLL INDICATOR (morphing circle)
   - Position fixed · bottom 32px · right 32px · z-index 400
   - Cercle conic-gradient teal→mauve qui se remplit selon % scroll
   - Border-radius animé (morphing organique via sin/cos)
   - Clic → scrollTo top

5. SCROLL REVEAL
   - Classe .reveal → opacity:0 · translateY(32px)
   - Classe .reveal.visible → opacity:1 · translateY(0)
   - Transition: 0.7s ease
   - Déclencheur: IntersectionObserver threshold 0.08–0.12
   - Stagger: setTimeout(i * 80ms) sur les grilles
```

### Logo
```
Texte    : "arthur."
Style    : DM Sans · font-weight 800 · font-size 22px · letter-spacing -1px
Effet    : Gradient shimmer animé (teal → #a78bff → teal) · background-size 220%
Sous-titre : "D'une inspiration naît une vision" · 7px · letter-spacing 3px · uppercase · opacity 0.25
```

### Navbar (identique sur toutes les pages)
```
Position   : fixed · top 0 · z-index 500
Background : rgba(10,15,30,0.45) · backdrop-filter blur(12px)
Border-bottom : var(--glass-bd)
Padding    : 20px 56px (→ 13px 56px au scroll via classe .scrolled)

Liens : Portfolio · Parcours · Contact
  - Font: 11px · letter-spacing 2.5px · uppercase
  - Hover: couleur cream + underline teal animé
  - Actif: classe .active → underline gradient teal→mauve

CTA   : "Télécharger CV ↓"
  - Lien vers : cv-arthur-viaud.pdf (download)
  - Style glassmorphism · couleur teal · hover fond teal opacity 0.12

Mobile : hamburger (display:none > flex < 960px)
  - Menu plein écran overlay avec liens Bebas Neue 52px
```

---

## 📁 STRUCTURE DES FICHIERS

```
Portfolio/
├── index.html              ✅ Généré
├── portfolio.html          ❌ À CRÉER (voir specs plus bas)
├── parcours.html           ✅ Généré
├── contact.html            ✅ Généré
├── projet-sneakers.html    ✅ Généré
├── projet-revofit.html     ✅ Généré
├── projet-palmfest.html    ✅ Généré
├── cv-arthur-viaud.pdf     ⚠️  À ajouter par Arthur
├── assets/
│   ├── images/
│   │   ├── photo-arthur.jpg       ⚠️  À ajouter (photo de profil hero)
│   │   ├── sneakers/              ⚠️  Photos sneakers pour galerie
│   │   ├── revofit/               ⚠️  Mockups RevoFit
│   │   └── palmfest/              ⚠️  Visuels Palm'Fest
│   └── videos/
│       ├── tiktok-sneakers-1.mp4  ⚠️  Vidéos TikTok Sneakers
│       └── palmfest-promo.mp4     ⚠️  Vidéo Palm'Fest CapCut
└── CONTEXT.md              ✅ Ce fichier
```

### ⚠️ Améliorations architecture à faire sur Claude Code
```
PRIORITÉ HAUTE :
- Factoriser navbar + footer dans des Web Components ou includes JS
  (actuellement dupliqués dans chaque fichier HTML → maintenance difficile)
- Créer un fichier shared.css pour les variables et styles communs
- Créer un fichier shared.js pour cursor, scroll indicator, scroll reveal, mobile menu
  (actuellement dupliqués dans chaque fichier HTML)

PRIORITÉ MOYENNE :
- Optimiser les images (WebP, lazy loading)
- Ajouter meta tags SEO (og:image, description, canonical)
- Ajouter un sitemap.xml pour le référencement
- Ajouter robots.txt
- Vérifier les performances Lighthouse (Core Web Vitals)

PRIORITÉ BASSE :
- Connecter le formulaire de contact à un vrai backend (Formspree recommandé)
- Ajouter Google Analytics ou Plausible
- Ajouter une page 404.html custom
```

---

## 📄 PAGES GÉNÉRÉES — DÉTAIL

### 1. index.html — Accueil ✅
```
SECTIONS :
  - Hero : nom (Bebas Neue XXL) + tagline + CTA + photo placeholder
  - Stats bar : 3+ années · 2x double diplôme · 4+ expériences · 3 langues
  - Outils & compétences (grille glassmorphism 6 cards)
  - Projets en vedette (teaser 3 projets → links vers pages projet)
  - Disponibilités (2 cards : mai→juillet PRIORITÉ + août→déc)
  - Footer global

LIENS INTERNES : portfolio.html · parcours.html · contact.html
```

### 2. portfolio.html — Galerie Projets ❌ À CRÉER
```
OBJECTIF : Page listant tous les projets avec filtres par catégorie

SECTIONS SOUHAITÉES :
  Header de page :
    - Surtitre : "PROJETS & RÉALISATIONS"
    - Titre principal : "PORTFOLIO"
    - Accroche : "Chaque projet raconte une histoire."

  Système de filtres (JS) :
    - Boutons : Tous · Entrepreneuriat · Communication · Formation
    - Filtrage smooth avec animation fade

  Grille de projets (layout asymétrique) :
    - Sneakers Business  → projet-sneakers.html  · tag Entrepreneuriat · 2022–2024
    - RevoFit            → projet-revofit.html   · tag Entrepreneuriat · 2024
    - Palm'Fest          → projet-palmfest.html  · tag Communication   · 2024
    - Réalisations BUT TC → (page à créer plus tard) · tag Formation

  Chaque card projet contient :
    - Emoji/visuel placeholder (remplaçable par vraie image)
    - Tag catégorie coloré
    - Année
    - Titre Bebas Neue
    - Description courte (1 ligne)
    - Flèche hover → lien vers page projet

STYLE : Même DA. Cards glassmorphism. Grille 2 colonnes + 1 large.
```

### 3. parcours.html — Parcours Académique ✅
```
SECTIONS :
  - Timeline verticale asymétrique (France gauche / Canada droite)
  - France : Accordéon 5 UEs (contenu Lorem Ipsum à remplir par Arthur)
  - Canada : Progress bars notes S5 (animées au scroll)
  - Bloc téléchargement CV centré
  - Navigation → portfolio + contact

COMPOSANTS JS :
  - toggleAcc(idx) : accordéon exclusif (1 seul ouvert à la fois)
  - Progress bars : IntersectionObserver → width animé à 1.2s
```

### 4. contact.html — Profil & Contact ✅
```
SECTIONS :
  - Hero : "L'HUMAIN DERRIÈRE LE CRÉATEUR" / "PROFIL & CONTACT"
  - Grille 2 colonnes :
    Gauche : profil texte + disponibilité (2 options) + coordonnées directes
    Droite  : formulaire glassmorphism (Nom · Email · Entreprise · Sujet · Message)
  - Citation de clôture centrée
  - Footer global

FORMULAIRE :
  - Validation JS côté client (champs requis + format email)
  - État succès animé (fade in) après soumission simulée
  - TODO : Connecter à Formspree → fetch('https://formspree.io/f/TON_ID')
  - Email de destination : arthurviaudpro@gmail.com

LIENS :
  - Email : mailto:arthurviaudpro@gmail.com
  - LinkedIn : [À RENSEIGNER]
```

### 5. projet-sneakers.html ✅
```
SURTITRE : ENTREPRENEURIAT & STRATÉGIE • 2022–2024
TITRE    : SNEAKERS BUSINESS
ACCROCHE : "De la passion culturelle à la stratégie d'acquisition digitale."

BULLES (4) :
  1. L'essor d'une culture
  2. Digitaliser l'acquisition
  3. Analyse de marché et optimisation
  4. Un laboratoire professionnel

MÉDIAS :
  - 2 slots TikTok 9:16 (placeholders → remplacer par <video src="...">)
  - Galerie asymétrique 5 cases (1 grande + 4 petites)
    → remplacer .gal-placeholder par <img src="assets/images/sneakers/...">

NAVIGATION : ← Retour Portfolio | Projet suivant : RevoFit →
ACCENT COULEUR : teal (identique DA globale)
```

### 6. projet-revofit.html ✅
```
SURTITRE : PROJET ENTREPRENEURIAL • 2024
TITRE    : REVOFIT
ACCROCHE : "L'alliance de la performance sportive et de l'innovation numérique."

BULLES (3) :
  1. Réinventer l'expérience fitness
  2. Une identité de marque percutante (avec liste compétences)
  3. Coordination et synergie d'équipe (full-width)

MÉDIAS :
  - Grille 3 mockups "faux écran app" (glassmorphism)
    → remplacer .mock-inner par <img src="assets/images/revofit/...">

NAVIGATION : ← Retour Portfolio | Projet suivant : Palm'Fest →
ACCENT COULEUR : mauve (#8A2BE2) pour les titres de bulles et stripe déco
```

### 7. projet-palmfest.html ✅
```
SURTITRE : STAGE COMMUNICATION & STRATÉGIE B2B • 2024
TITRE    : PALM'FEST
ACCROCHE : "Convertir l'énergie d'un festival de 10 000 personnes en stratégie d'acquisition mécénat."

KPIs HERO : 10K festivaliers · B2B canal principal · 3M stage · Best Engagement

BULLES (3) :
  1. Un ancrage territorial fort
  2. Stratégie et création de contenus
  3. Analyse et engagement (full-width)

MÉDIAS (3 zones distinctes) :
  Zone A : Carrousel PDF "Que cache vraiment un festival ?" + badge Best Engagement Rate
           → remplacer .pdf-mock par <img src="assets/images/palmfest/carrousel.jpg">
  Zone B : Mockup téléphone + vidéo promo CapCut
           → remplacer .phone-mock par <video src="assets/videos/palmfest-promo.mp4">
  Zone C : Galerie 2 photos horizontales (mer + forêt La Palmyre)
           → remplacer .gal-ph par <img src="assets/images/palmfest/...">

NAVIGATION : ← Retour Portfolio | Découvrir mon Parcours →
ACCENT COULEUR : teal · watermark "10 000" en fond du hero
```

---

## 🔧 COMPOSANTS JS PARTAGÉS (actuellement dupliqués)

### À factoriser en shared.js
```javascript
// 1. CURSOR CUSTOM
// Variables: cur, ring, mx, my, rx, ry
// Logique: mousemove + lerp loop (factor 0.11)
// Hover: width/height 18px sur éléments interactifs, 10px sinon

// 2. NAV SHRINK
// window scroll → toggle classe .scrolled sur #nav (threshold: scrollY > 60)

// 3. SCROLL INDICATOR MORPHING
// % scroll → conic-gradient fill + border-radius sin/cos morphing
// Click → scrollTo top

// 4. MOBILE MENU
// toggleMob() / closeMob() → toggle classe .open sur #mobileMenu

// 5. SCROLL REVEAL
// IntersectionObserver → classe .visible sur .reveal
// Stagger: setTimeout(i * 80ms) sur NodeList forEach

// 6. LOGO SHIMMER
// CSS animation logoShine (background-position 0% → 100% → 0%)
// Duration: 5s ease infinite
```

### À factoriser en shared.css
```css
/* Variables CSS root */
/* Reset */
/* Cursor */
/* Mesh blobs + @keyframes meshFloat */
/* Grain overlay */
/* Navbar */
/* Mobile menu */
/* Scroll indicator */
/* .reveal / .reveal.visible */
/* Glass card */
/* Boutons : .btn-primary, .btn-ghost, .btn-back, .btn-next */
/* Footer global */
/* @keyframes riseUp */
/* Media queries communes */
```

---

## 🚀 ROADMAP CLAUDE CODE — PRIORITÉS

### Phase 1 — Architecture (à faire en premier)
```
[ ] Créer shared.css avec toutes les variables et styles communs
[ ] Créer shared.js avec tous les composants JS partagés
[ ] Refactoriser chaque page HTML pour importer shared.css + shared.js
[ ] Créer portfolio.html (page galerie avec filtres)
[ ] Créer 404.html custom (même DA)
```

### Phase 2 — Contenu réel
```
[ ] Intégrer la photo d'Arthur dans le hero (index.html)
    → Décommenter <img src="assets/images/photo-arthur.jpg"> dans .photo-frame
    → Supprimer .ph-placeholder
[ ] Intégrer les vraies photos sneakers dans projet-sneakers.html
    → Remplacer .gal-placeholder par <img> dans .gal-slot
[ ] Intégrer les vrais mockups RevoFit dans projet-revofit.html
    → Remplacer .mock-inner par <img> dans .mock-card
[ ] Intégrer les vrais visuels Palm'Fest dans projet-palmfest.html
    → Remplacer Zone A/B/C placeholders
[ ] Intégrer les vraies vidéos TikTok (projet-sneakers.html)
    → Remplacer .tiktok-slot par <video controls>
[ ] Renseigner les vraies URLs réseaux sociaux (LinkedIn, Instagram)
[ ] Renseigner l'URL réelle du PDF CV
[ ] Remplir le contenu des accordéons UEs (parcours.html)
```

### Phase 3 — Performance & SEO
```
[ ] Ajouter meta tags dans chaque <head> :
    <meta name="description" content="...">
    <meta property="og:title" content="Arthur Viaud — Portfolio">
    <meta property="og:description" content="...">
    <meta property="og:image" content="https://arthurviaud.fr/assets/images/og-image.jpg">
    <meta property="og:url" content="https://arthurviaud.fr">
    <link rel="canonical" href="https://arthurviaud.fr/...">
[ ] Créer og-image.jpg (1200x630px) pour partage réseaux
[ ] Convertir images en WebP + ajouter loading="lazy"
[ ] Créer sitemap.xml
[ ] Créer robots.txt
[ ] Ajouter <link rel="icon"> favicon (version teal du logo)
[ ] Tester Lighthouse (objectif : score > 90 partout)
```

### Phase 4 — Fonctionnalités avancées
```
[ ] Connecter formulaire contact à Formspree :
    URL : https://formspree.io/f/[TON_ID_FORMSPREE]
    Email réception : arthurviaudpro@gmail.com
[ ] Ajouter analytics (Plausible recommandé — privacy-friendly)
[ ] Ajouter transitions de navigation entre pages (View Transitions API)
[ ] Envisager migration vers Astro ou Vite pour bundling optimisé
```

---

## 🎯 CONVENTIONS DE CODE

```
Nommage classes CSS  : kebab-case (ex: .glass-card, .proj-title)
Nommage IDs JS       : camelCase (ex: #scrollInd, #mobileMenu)
Sélecteurs courants  : #nav, #cur, #ring, #scrollInd, #siFill, #siLabel, #mobileMenu
Unités               : rem pour espacement vertical · px pour gaps internes
Z-index layers       :
  0   → mesh blobs
  1   → grain
  10  → sections contenu
  200 → navbar (nav fixe)
  400 → scroll indicator
  490 → mobile menu
  499 → mobile menu close button
  500 → navbar z-index max
  9998 → cursor ring
  9999 → cursor dot
```

---

## 💬 PROMPT DE DÉMARRAGE POUR CLAUDE CODE

Copie-colle ce texte pour démarrer une session Claude Code :

```
Je travaille sur mon portfolio arthurviaud.fr.
Repo : https://github.com/SNOWIZ8/Portfolio
Hébergement : Vercel (déploiement auto sur push GitHub)

Lis le fichier CONTEXT.md à la racine du projet — il contient toute
la DA, la structure des fichiers, les composants, et la roadmap.

On commence par la Phase 1 de la roadmap :
1. Créer shared.css et shared.js pour factoriser le code commun
2. Refactoriser les 6 pages existantes pour les utiliser
3. Créer portfolio.html (page galerie avec filtres)

La DA est immuable : fond #0A0F1E, teal #00F2EA, mauve #8A2BE2,
glassmorphism, Bebas Neue + DM Sans, mesh gradient animé sur toutes les pages.
```

---

*CONTEXT.md généré depuis Claude.ai — session de création du portfolio Arthur Viaud*
*Stack : HTML5 · CSS3 · JavaScript vanilla · Vercel · GitHub*
