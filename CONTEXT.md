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
| **Statut** | 7 pages générées — Phase 5 Accueil en cours |

---

## 👤 PROFIL PROPRIÉTAIRE

Nom            : Arthur Viaud
Statut         : Étudiant 3ème année BUT Techniques de Commercialisation
Établissements : IUT de Poitiers (France) + UQAC Chicoutimi (Canada)
Double diplôme : BUT TC (Marketing Digital) + Bac Administration
Objectif       : Stage Communication & Marketing Digital
Email pro      : arthurviaudpro@gmail.com
LinkedIn       : https://www.linkedin.com/in/arthur-viaud-81939b2a6/
Instagram      : Non renseigné (compte personnel)
Tagline        : "D'une inspiration naît une vision"
Punchline      : "Mettre l'énergie et la créativité au service de la visibilité de vos projets."
Positionnement : "Créateur de contenus & Communicant | Transformer vos projets en expériences visuelles percutantes"

### Disponibilités stage

Option 1 (prioritaire) : 4 mai → 24 juillet 2026 (3 mois)
Option 2 (longue durée): Fin août → décembre 2026
Villes visées          : Royan · La Rochelle · Bordeaux · Poitiers · Grenoble

### Compétences & outils

Outils        : Photoshop · Premiere Pro · CapCut · Framer · Excel
Compétences   : Communication digitale · Storytelling · Gestion de projet · Rédaction
Langues       : Français (natif) · Anglais (B2) · Espagnol (B1)

### Résultats académiques S5 (UQAC)

Ressources Humaines  : 82.47/100
Marketing Numérique  : 81.17/100
Recherche Marketing  : 80.19/100
Gestion Financière   : 77.30/100

---

## 🎨 DIRECTION ARTISTIQUE (DA) — IMMUABLE SUR TOUT LE SITE

### Palette de couleurs
```css
--bg       : #0A0F1E   /* Fond principal — Deep Navy, jamais noir pur */
--teal     : #00F2EA   /* Couleur accent principale */
--mauve    : #8A2BE2   /* Couleur accent secondaire */
--cream    : #F0ECE2   /* Texte principal */
--muted    : rgba(240,236,226,0.52)  /* Texte secondaire */

Glassmorphism (système de cartes)
--glass-bg   : rgba(255,255,255,0.03)
--glass-bd   : 1px solid rgba(255,255,255,0.10)
--glass-blur : blur(12px)
--radius     : 12px

Typographie

Display / Titres XXL : Bebas Neue (Google Fonts)
Corps / UI           : DM Sans (Google Fonts) — weights 300, 400, 500
Import Google Fonts  :
  https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap

Effets visuels obligatoires (présents sur TOUTES les pages)
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

Logo
Texte    : "arthur."
Style    : DM Sans · font-weight 800 · font-size 22px · letter-spacing -1px
Effet    : Gradient shimmer animé (teal → #a78bff → teal) · background-size 220%
Sous-titre : "D'une inspiration naît une vision" · 7px · letter-spacing 3px · uppercase · opacity 0.25

Navbar & Footer (factorisés)
Les styles et comportements sont définis dans shared.css et shared.js.
Règle : Ne jamais dupliquer de longs blocs de style dans les fichiers HTML individuels.

STRUCTURE DES FICHIERS (MISE À JOUR)
Portfolio/
├── index.html              ✅ Généré
├── portfolio.html          ✅ Généré
├── parcours.html           ✅ Généré
├── contact.html            ✅ Généré (À modifier : retirer le profil)
├── a-propos.html           ❌ À CRÉER (Nouvelle page profil/passions)
├── projet-sneakers.html    ✅ Généré
├── projet-revofit.html     ✅ Généré
├── projet-palmfest.html    ✅ Généré
├── shared.css              ✅ Généré (DA centralisée)
├── shared.js               ✅ Généré (Logique UI centralisée)
├── cv-arthur-viaud.pdf     ⚠️ À ajouter par Arthur (À LA RACINE)
└── assets/
    ├── documents/
    │   └── PM2.pdf                ⚠️ Carrousel Palm'Fest complet
    ├── images/
    │   ├── photo-arthur.jpg       ⚠️ Photo de profil (À venir)
    │   ├── sneakers/              ⚠️ SNK1.jpg, SNK2.jpg, SNK3.jpg, SNK4.jpg
    │   ├── palmfest/              ⚠️ PM1.png, PM2-cover.png
    │   └── revofit/               ⚠️ RVF1.png, RVF2.jpg
    └── videos/
        ├── revofit/               ⚠️ RVFVideo1.mp4
        ├── sneakers/              ⚠️ SNKVD1.mp4 (paysage), SNKVD2 à SNKVD5 (mob)
        └── palmfest/              ⚠️ PMVideo1.mp4 (paysage)

PAGES GÉNÉRÉES — DÉTAIL DES CONTENUS
1. index.html — Accueil ✅
SECTIONS : Hero, Stats bar, Outils & compétences, Projets en vedette, Disponibilités.
⚠️ ACTION REQUISE CLAUDE : Déplacer les styles CSS spécifiques restants (Hero, Stats, Tools) dans un nouveau fichier `home.css` pour alléger le HTML.

2. portfolio.html — Galerie Projets ✅
OBJECTIF : Page listant tous les projets avec filtres par catégorie.
Système de filtres JS opérationnel.

3. parcours.html — Parcours Académique ✅
SECTIONS : Timeline verticale France/Canada, Accordéon UEs, Progress bars S5.
⚠️ ACTION REQUISE ARTHUR : Remplir les vrais textes dans les blocs d'accordéon (Lorem Ipsum actuellement).

4. contact.html — Profil & Contact ✅
SECTIONS : Profil texte, disponibilités, Formulaire glassmorphism.
⚠️ ACTION REQUISE CLAUDE : Lier le formulaire à Formspree une fois l'ID fourni.

5. projet-sneakers.html ✅
SURTITRE : ENTREPRENEURIAT & STRATÉGIE • 2022–2024
TITRE    : SNEAKERS BUSINESS
ACCROCHE : "De la passion culturelle à la stratégie d'acquisition digitale."
MÉDIAS   :
  - Vidéos : à lier vers `assets/videos/sneakers/`
  - Galerie : à lier vers `assets/images/sneakers/`

6. projet-revofit.html ✅
SURTITRE : PROJET ENTREPRENEURIAL • 2024
TITRE    : REVOFIT
ACCROCHE : "L'alliance de la performance sportive et de l'innovation numérique."
MÉDIAS   :
  - Mockups : à lier vers `assets/videos/revofit/` (Remplacement des images statiques par des vidéos).

7. projet-palmfest.html ✅
SURTITRE : STAGE COMMUNICATION & STRATÉGIE B2B • 2024
TITRE    : PALM'FEST
ACCROCHE : "Convertir l'énergie d'un festival de 10 000 personnes en stratégie d'acquisition mécénat."
KPIs HERO : 10K festivaliers · B2B canal principal · 3M stage · Best Engagement
MÉDIAS   :
  - Carrousel : à lier vers `assets/images/palmfest/`
  - Vidéo promo : à lier vers `assets/videos/palmfest/`
  - Galerie (mer/forêt) : à lier vers `assets/images/palmfest/`

🚀 ROADMAP CLAUDE CODE — PHASES 1 À 4 TERMINÉES

Phase 1 — Architecture (✅ TERMINÉE)
Phase 2 — Intégration Médias & Nettoyage (✅ TERMINÉE)
Phase 3 — Séparation À Propos, Textes Parcours & Refonte RevoFit (✅ TERMINÉE)
Phase 4 — Performance, SEO & Finitions (✅ TERMINÉE)

---

## 🎬 Phase 5 — Creative Coding & Expérience Premium · PAGE ACCUEIL (index.html + home.css)

> ⚠️ DIRECTIVE POUR CLAUDE CODE : Les phases 1 à 4 sont terminées et validées. La Phase 5 se fait **PAGE PAR PAGE** en commençant par l'accueil. Tu es Lead Creative Developer. Ton objectif est d'amener ce portfolio au niveau d'un site primé, tout en garantissant une UX irréprochable. Tu réécrits intégralement `index.html` et `home.css`. Tu peux toucher à `shared.js` si besoin pour les effets globaux (curseur, etc.), mais **ne casses pas les autres pages**.

---

### 5.1 — LOADING SCREEN (avant le Hero)

**Comportement :**
- Écran noir (#0A0F1E) en `position:fixed;inset:0;z-index:9999`
- Le logo `arthur.` apparaît au centre : chaque lettre fade-in en stagger rapide (30ms entre chaque lettre), police Bebas Neue, taille ~80px, couleur teal avec glow mauve
- Une fine barre de progression horizontale teal se remplit sous le logo (0% → 100% en 1.2s)
- À 100% : le loader effectue un **clip-path reveal vertical** (s'ouvre comme un rideau du centre vers les bords) en 0.6s, révélant la page en dessous
- La page en dessous est déjà chargée mais `opacity:0` — elle fait un fade-in `opacity 0→1` simultané au clip-path du loader
- **Sur mobile** : même comportement, simplifié (pas de barre de progression, juste le logo + fade)
- **Durée totale max : 2s**

---

### 5.2 — HERO SECTION : PARALLAX MULTI-COUCHES

**Principe :** Le hero est composé de **4 à 5 couches indépendantes** qui se déplacent à des vitesses différentes au scroll et à la position de la souris (mouse parallax sur desktop). L'effet doit être profond, cinématique, pas gadget.

**Couches (du fond vers l'avant) :**
1. **Couche 0 — Mesh gradient** (déjà existant, `position:fixed`) : vitesse scroll = 0 (il est fixed)
2. **Couche 1 — Grille tech** (nouvelle, `position:absolute`) : fines lignes orthogonales, `opacity:0.03`, couleur cream. Se déplace au scroll à `translateY(scrollY * 0.15)` et au mouse à `±8px`. Renforce l'ambiance créative sans surcharger.
3. **Couche 2 — Halos flottants** (nouvelles formes mauve/teal) : 2–3 ellipses `blur(80px)` positionnées autour de la photo, `opacity:0.18`. Bougent au mouse à `±20px` chacune dans des directions opposées. Bougent au scroll à `translateY(scrollY * 0.3)`.
4. **Couche 3 — Texte hero (eyebrow + nom + tagline)** : bougent au scroll à `translateY(scrollY * 0.25)` — l'effet de profondeur principal. Au mouse : très léger `±5px` (subtil).
5. **Couche 4 — Zone photo** : bouge au scroll à `translateY(scrollY * 0.12)` (plus lente que le texte → effet de recul). Au mouse : `±12px` (oppose direction du texte).

**Mouse parallax (desktop uniquement) :**
- Écouter `mousemove` sur le `document`
- Calculer `x = (event.clientX / window.innerWidth - 0.5)` et `y` pareil
- Appliquer `lerp` (0.08) sur chaque couche via `requestAnimationFrame` pour la fluidité
- Désactiver sur mobile/tablette via `window.matchMedia('(hover: none)')`

**Hero layout :** Conserver le layout actuel (texte gauche, photo droite) en 2 colonnes.

---

### 5.3 — ANIMATION D'ENTRÉE DU HERO (après loading screen)

Séquence ordonnée (tout démarre après la fermeture du loader) :
1. `t+0ms` — Eyebrow ("Disponible · Stage…") : fade-in + translateY(20px→0) en 500ms
2. `t+150ms` — "Arthur" : slide-in depuis la gauche avec léger skewX(-3deg→0), 600ms, easing cubic-bezier(.16,1,.3,1)
3. `t+300ms` — "Viaud" (stroke + teal) : même slide mais depuis la droite
4. `t+500ms` — Tagline : fade-in + translateY(15px→0), 500ms
5. `t+700ms` — Boutons CTA : fade-in + scale(0.94→1), 400ms
6. `t+900ms` — Zone photo : fade-in + scale(0.96→1), 600ms, avec un léger halo mauve qui pulse une fois
7. `t+1100ms` — Stats bar : les 4 colonnes arrivent en stagger (chaque colonne +80ms), depuis translateY(20px)

---

### 5.4 — CURSEUR CUSTOM : SPOTLIGHT EFFECT

**Implémentation :**
- `.cursor` (point) : 10px, background teal, `mix-blend-mode: difference`, z-index 9998
- `.cursor-ring` (anneau) : 40px, border `1px solid rgba(0,242,234,0.35)`, lag `lerp 0.10`
- **Spotlight** : un `radial-gradient` teal→transparent de ~380px de diamètre centré sur le curseur, `position:fixed`, `pointer-events:none`, `opacity:0.07`, révèle subtilement le mesh en dessous
- Au hover sur un élément `.magnetic` : le spotlight passe à `opacity:0.12` et `400px`
- Au hover sur un lien texte : `.cursor` prend `width:3px;height:24px;border-radius:2px` (curseur I-beam fin)
- Au hover sur `.proj-card` : `.cursor-ring` passe à `60px` et affiche le texte "VIEW" en son centre (font 9px, letter-spacing 2px, teal)
- **Mobile** : curseur custom entièrement désactivé

---

### 5.5 — BOUTONS CTA : EFFET MAGNÉTIQUE

**Cibles** : `.btn-primary`, `.btn-ghost`, et toute balise `a` avec classe `.magnetic`

**Comportement desktop :**
- Zone d'attraction : 80px autour du bouton (bounding box étendue)
- Quand le curseur entre dans la zone : le bouton se déplace vers le curseur avec `translate(dx * 0.35, dy * 0.35)` en `lerp 0.12`
- Quand le curseur quitte la zone : le bouton revient en position via `lerp` (retour fluide, pas de snap)
- Le `.cursor-ring` s'élargit à 50px quand dans la zone magnétique
- **Shine interne** : au hover, un gradient `conic` ou `radial` teal→mauve passe sur le fond du bouton (opacity 0→0.15→0 en 400ms), effet de "respiration lumineuse"
- **Mobile** : magnétisme désactivé, conserver le style visuel des boutons sans le JS

**CSS boutons (à améliorer) :**
- `.btn-primary` : fond `linear-gradient(135deg, var(--teal), #00c4be)`, texte `#0A0F1E`, `font-weight:600`, `border-radius:6px`, padding `14px 32px`, `box-shadow: 0 0 0 0 rgba(0,242,234,0.4)` → au hover `box-shadow: 0 0 24px 4px rgba(0,242,234,0.25)`
- `.btn-ghost` : fond transparent, `border:1px solid rgba(138,43,226,0.5)`, texte cream → au hover `border-color: rgba(138,43,226,0.9)` + `box-shadow: 0 0 20px 2px rgba(138,43,226,0.2)`

---

### 5.6 — STATS BAR : SLOT MACHINE

**Animation au scroll (IntersectionObserver, threshold 0.3) :**
- Chaque chiffre (3, 2, 4, 3) démarre à 0 et "défile" rapidement comme un slot machine : les chiffres intermédiaires s'enchaînent en `translateY` vertical à grande vitesse, puis ralentissent et se stabilisent sur le bon chiffre
- Durée : 1.2s par chiffre, avec stagger de 120ms entre chaque colonne
- Le suffixe (`+`, `x`, `+`, `↗`) arrive en fade après la stabilisation du chiffre
- Implémentation : chaque `.stat-n` contient un wrapper avec `overflow:hidden`, les chiffres sont empilés en `position:absolute` et animés via `transform:translateY`
- **L'animation ne se joue qu'une seule fois** (observer.unobserve après déclenchement)

---

### 5.7 — SECTION MARQUEE

**Placement :** Entre la section "Outils & Compétences" (01) et "Projets en Vedette" (02)

**Contenu :** `COMMUNICATION · MARKETING DIGITAL · STORYTELLING · CRÉATION · STRATÉGIE · BRAND CONTENT · VIDÉO · RÉSEAUX SOCIAUX ·` (répété 2× pour le loop)

**Style :**
- Fond : `rgba(138,43,226,0.06)` avec `border-top` et `border-bottom` `1px solid rgba(138,43,226,0.15)`
- Texte : Bebas Neue, `font-size:15px`, `letter-spacing:4px`, `color:rgba(240,236,226,0.25)`
- Les séparateurs `·` sont en teal `color:var(--teal)`
- Vitesse : 35s linear infinite
- Au hover sur le marquee : `animation-play-state: paused`
- **Direction** : de droite à gauche (standard)
- La marquee a **deux copies** du texte côte à côte pour le loop parfait sans saut
- Hauteur : `56px`, overflow hidden

---

### 5.8 — SECTION PROJETS : HORIZONTAL SCROLL

**Principe :** Quand l'utilisateur scrolle verticalement sur la section `#projets`, le scroll est "détourné" pour faire défiler les cartes horizontalement. Une fois toutes les cartes visibles (fin du scroll horizontal), le scroll vertical reprend normalement.

**Implémentation technique :**
- La section `#projets` a une hauteur CSS égale à `(nombre de cartes × 100vw)` ou similaire pour "réserver" l'espace scroll vertical
- Un wrapper interne `.proj-track` est `position:sticky;top:0;height:100vh;overflow:hidden`
- Les cartes `.proj-card` sont disposées en ligne horizontale dans `.proj-inner` (flex, no-wrap)
- Le `translateX` de `.proj-inner` est calculé en JS à chaque scroll : `translateX = -scrollProgress * (totalWidth - viewportWidth)`
- `scrollProgress` = `(scrollY - sectionOffsetTop) / (sectionHeight - viewportHeight)`
- `requestAnimationFrame` + `lerp(0.12)` pour la fluidité
- **Mobile** : scroll horizontal natif (overflow-x: auto, snap), désactiver le scroll hijack via `matchMedia('(max-width:768px)')`

**Cartes projets (redesign) :**
- Taille desktop : `min-width: min(480px, 80vw)`, `height: 70vh`, espacement `32px`
- Layout carte : fond `linear-gradient(145deg, rgba(138,43,226,0.08), rgba(0,242,234,0.04))`, border `1px solid rgba(138,43,226,0.2)`
- Tag catégorie en haut à gauche (style inchangé)
- Emoji en arrière-plan, `font-size:120px`, `opacity:0.06`, centré
- Titre projet en bas à gauche, Bebas Neue, `font-size:56px`
- Flèche ↗ en haut à droite (style inchangé)
- **Hover 3D Tilt** : `perspective:1000px`, rotation X/Y calculée depuis la position de la souris dans la carte (`rotateX(±8deg)`, `rotateY(±12deg)`), `transform-style:preserve-3d`
- **Reflet interne au hover** : un `radial-gradient` blanc opacity 0.04→0.08 qui suit la souris à l'intérieur de la carte (speculaire)
- **Indicateur de scroll horizontal** : sous les cartes, une fine track avec un fill teal qui avance en même temps que le scroll horizontal (`width: scrollProgress * 100%`)

---

### 5.9 — ZONE PHOTO HERO : PLACEHOLDER STYLISH

**État actuel :** Pas de photo disponible — le placeholder doit être visuellement fort.

**Rendu souhaité :**
- Conserver le cadre actuel (border-radius `8px 50px 8px 50px`, corners teal)
- **Silhouette animée** : dans le cadre, une silhouette humaine générique tracée en SVG (traits fins, style wireframe), couleur teal à `opacity:0.15`, avec une animation de `stroke-dashoffset` qui "dessine" la silhouette en boucle (8s, ease-in-out)
- **Halos de particules** : 8 à 12 petits points (`3–5px`) teal et mauve répartis aléatoirement dans le cadre, animations de `float` désynchronisées (up/down, 4–8s chacune)
- **Texte placeholder discret** : en bas du cadre, `font-size:9px`, `letter-spacing:2.5px`, `opacity:0.18`, uppercase : `PHOTO À VENIR`
- **Quand une photo est ajoutée** (`assets/images/photo-arthur.jpg`) : remplacer le contenu du `.photo-frame` par `<img src="assets/images/photo-arthur.jpg">` — le cadre et les corners restent, le fond deviendra la photo. Pas besoin de retoucher le CSS.

---

### 5.10 — SECTION DISPONIBILITÉS : AMÉLIORATIONS

- Les `.loc-tag` ont un **hover subtil** : `border-color: rgba(0,242,234,0.5)` + `color: rgba(0,242,234,0.9)` en `transition:0.2s`
- La card `.prime` a un **halo teal animé** : `box-shadow: 0 0 0 0 rgba(0,242,234,0.15)` qui pulse doucement en `0 0 32px 8px rgba(0,242,234,0.08)` (keyframe 4s ease infinite)
- Les deux cards entrent en **stagger reveal** au scroll (card gauche depuis `translateX(-30px)`, card droite depuis `translateX(30px)`)

---

### 5.11 — TEXTURE FOND : GRILLE TECH

**Implémentation :**
- Un `div.grid-overlay` en `position:fixed;inset:0;z-index:2;pointer-events:none`
- Background : `repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(240,236,226,0.025) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(240,236,226,0.025) 80px)`
- Taille de cellule : `80px × 80px`
- **Gradient de masque** : `mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, rgba(0,0,0,0.8) 0%, transparent 100%)` — la grille est plus visible au centre/haut, invisible en bas
- La grille se déplace légèrement au scroll : `translateY(scrollY * 0.05)` pour participer au parallax

---

### 5.12 — DA ÉVOLUTION : MAUVE ÉLECTRIQUE

**Modifications par rapport à la DA actuelle :**
- `--mauve` reste `#8A2BE2` mais ses utilisations sont amplifiées
- Les blobs mauve du mesh gradient passent à `opacity:0.18` (vs 0.12 actuel) — plus présents
- Les borders des cards sur hover passent à `rgba(138,43,226,0.35)` en complément du teal
- Le `.btn-ghost` a un glow mauve au hover (voir §5.5)
- Les séparateurs `/` et `·` dans les sections header (`01 ///`) passent à la couleur mauve `rgba(138,43,226,0.6)`
- La scrollbar custom (si définie) : track navy, thumb gradient teal→mauve
- Les `.loc-tag` de la carte prime peuvent alterner teal et mauve dans le stagger d'apparition

---

### 5.13 — PERFORMANCE & CODE PROPRE

**Règles absolues :**
- Tout le JS des animations home est isolé dans un bloc conditionnel : `if (document.body.classList.contains('page-home')) { ... }` ou dans un fichier `home.js` dédié inclus uniquement sur `index.html`
- `requestAnimationFrame` pour TOUS les effets temps-réel (curseur, parallax, scroll horizontal, slot machine)
- `will-change: transform` sur les couches parallax et les cartes
- `IntersectionObserver` pour déclencher les animations au scroll (jamais de `scroll` event brut sauf pour le parallax et le scroll horizontal)
- Les effets lourds (magnétisme, parallax souris, spotlight curseur) sont enveloppés dans `if (!isMobile)` avec `isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches`
- **Ordre des fichiers** dans `<head>` : `shared.css` → `home.css`. En bas de `<body>` : `shared.js` → `home.js`

---

### 5.14 — RESPONSIVE MOBILE (dégradation élégante)

| Effet | Desktop | Mobile |
|---|---|---|
| Loading screen | Logo + barre + clip-path reveal | Logo + fade simple |
| Parallax multi-couches | ✅ Complet (scroll + mouse) | Scroll uniquement, amplitudes ÷2 |
| Mouse parallax | ✅ | ❌ Désactivé |
| Curseur custom | ✅ | ❌ Désactivé |
| Spotlight curseur | ✅ | ❌ Désactivé |
| Magnétisme boutons | ✅ | ❌ Désactivé |
| Scroll horizontal projets | ✅ | Scroll snap natif horizontal |
| 3D Tilt cartes | ✅ | ❌ Désactivé, hover simple |
| Slot machine stats | ✅ | ✅ (léger) |
| Marquee | ✅ | ✅ (vitesse réduite) |
| Grille tech | ✅ | ❌ Masquée (performance) |

---

## 💬 PROMPT DE DÉMARRAGE POUR CLAUDE CODE — PHASE 5 ACCUEIL

```
Salut Claude. Les phases 1 à 4 sont terminées et validées.

Lis le fichier CONTEXT.md mis à jour, section "Phase 5 — Creative Coding" (§5.1 à §5.14).

Ta mission aujourd'hui : réécrire intégralement `index.html` et `home.css` (+ créer `home.js` si nécessaire) pour implémenter toutes les animations et effets détaillés dans la Phase 5.

FICHIERS À PRODUIRE :
- `index.html` (refonte complète)
- `home.css` (refonte complète)
- `home.js` (nouveau fichier — JS spécifique à la homepage)
- `shared.js` (modification légère si nécessaire pour le curseur spotlight)

CONTRAINTES ABSOLUES :
1. Ne pas casser les autres pages (shared.css et shared.js doivent rester fonctionnels)
2. Respecter la DA existante (palette, typo, glassmorphism)
3. Performance 60 FPS — requestAnimationFrame partout
4. Dégradation mobile parfaite (tableau §5.14)
5. Le contenu textuel de la page ne change pas — seul le code/animations changent

Lance-toi, sois créatif, sois précis. Impresse-moi.
```
