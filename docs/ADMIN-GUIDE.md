# CMI Website — Admin Guide
# Guide Administrateur — 管理員指南

> **Pour Pastor Danny et l'équipe CMI**
> **For Pastor Danny and the CMI team**
> **致 Danny 牧師及 CMI 團隊**

---

## Table of Contents / Table des matières / 目錄

- [🇫🇷 FRANÇAIS](#-français)
- [🇺🇸 ENGLISH](#-english)
- [🇹🇼 中文](#-中文)

---

---

# 🇫🇷 FRANÇAIS

## Comment accéder à l'administration

1. Ouvrez votre navigateur et allez sur : **https://votre-site.com/admin**
2. Entrez votre adresse email et votre mot de passe
3. Vous verrez le tableau de bord de l'administration

> 💡 Si vous avez oublié votre mot de passe, contactez l'équipe technique.

---

## 1. Créer une nouvelle page avec des blocs

Une « page » est un article, une annonce ou une section que vous voulez ajouter au site. Vous n'avez pas besoin de savoir programmer.

**Étapes :**

1. Dans le menu à gauche, cliquez sur **Pages**
2. Cliquez sur le bouton **Créer une nouvelle page** (en haut à droite)
3. Remplissez les champs :
   - **Titre (admin)** → un nom pour vous repérer (ex : « Page Partenariat 2026 »)
   - **Titre anglais** → le titre en anglais pour les visiteurs
   - **Titre chinois** → le titre en chinois pour les visiteurs

   ![Screenshot: Champs titre](_screenshots/fr-page-title.png)

4. Allez dans l'onglet **Content** (Contenu)
5. Cliquez sur **Ajouter un bloc** et choisissez le type :

   | Type de bloc | À quoi ça sert |
   |---|---|
   | **CMI Hero** | Grande bannière avec titre et sous-titre en haut de page |
   | **CMI Text Section** | Paragraphe de texte avec un sous-titre |
   | **CMI Image** | Une photo avec une légende |

   ![Screenshot: Sélection de bloc](_screenshots/fr-block-picker.png)

6. Pour chaque bloc, remplissez les champs **anglais** et **chinois**
7. Vous pouvez ajouter autant de blocs que vous voulez, dans n'importe quel ordre
8. Pour déplacer un bloc, utilisez les flèches ↑ ↓ à côté du bloc
9. Quand vous êtes satisfait, cliquez sur **Publier** (bouton en haut à droite)

   ![Screenshot: Bouton publier](_screenshots/fr-publish.png)

> ✅ La page sera visible sur le site à l'adresse : **votre-site.com/fr/nom-de-la-page**

---

## 2. Modifier la barre de navigation (le menu)

La barre de navigation est le menu en haut du site (Accueil, Reconnaître CMI, Événements…).

**Étapes :**

1. Dans le menu à gauche, cliquez sur **Globals** puis sur **Header**
2. Vous voyez la liste des éléments du menu

   ![Screenshot: Liste navigation](_screenshots/fr-nav-list.png)

3. **Pour modifier un élément :**
   - Cliquez sur l'élément que vous voulez changer
   - Modifiez le **Label anglais** et le **Label chinois**
   - Modifiez l'**URL** si nécessaire (ex : `/about`)

4. **Pour ajouter un élément :**
   - Cliquez sur **Ajouter un élément** en bas de la liste
   - Remplissez le label et l'URL
   - Pour ajouter un sous-menu, cliquez sur **Ajouter un sous-élément**

5. **Pour supprimer un élément :**
   - Cliquez sur l'icône 🗑️ à droite de l'élément

6. **Pour changer l'ordre :**
   - Glissez-déposez l'élément à la position souhaitée

7. Cliquez sur **Enregistrer** en bas de la page

   ![Screenshot: Bouton enregistrer](_screenshots/fr-save.png)

> ⚠️ Le menu se met à jour automatiquement sur le site. Vérifiez que tout est correct avant d'enregistrer.

---

## 3. Épingler un événement sur la page d'accueil

Les événements épinglés apparaissent dans le carrousel en haut de la page d'accueil.

**Étapes :**

1. Dans le menu à gauche, cliquez sur **Events** (Événements)
2. Cliquez sur l'événement que vous voulez épingler, ou créez-en un nouveau avec **Créer un événement**
3. Remplissez les informations :
   - **Titre anglais** et **Titre chinois**
   - **Date de début** et **Date de fin**
   - **Lieu anglais** et **Lieu chinois**
   - **Image** → uploadez une photo (conseillé : 1200 × 630 pixels)
   - **Lien d'inscription** → l'URL du formulaire ou de la page d'inscription

   ![Screenshot: Formulaire événement](_screenshots/fr-event-form.png)

4. Cochez la case **Featured on Homepage** (Épinglé sur la page d'accueil)

   ![Screenshot: Case à cocher épinglé](_screenshots/fr-event-featured.png)

5. Dans le champ **Display Order** (Ordre d'affichage), entrez un chiffre :
   - **1** = apparaît en premier
   - **10** = apparaît en deuxième
   - **20** = apparaît en troisième
   - etc.

6. Vérifiez que la case **Active** est cochée
7. Cliquez sur **Publier** ou **Enregistrer**

> ✅ L'événement apparaîtra dans le carrousel de la page d'accueil dans les prochaines secondes.

---

## 4. Ajouter une région sur la page d'accueil

Les régions sont les cartes (Asie, Moyen-Orient, Afrique…) dans la section « Nos ministères » sur la page d'accueil.

**Étapes :**

1. Dans le menu à gauche, cliquez sur **Regions** (Régions)
2. Cliquez sur **Créer une région**
3. Remplissez les champs :
   - **Nom anglais** → ex : `North America`
   - **Nom chinois** → ex : `北美洲`
   - **Pays anglais** → ex : `Canada · USA` (séparez avec un point ·)
   - **Pays chinois** → ex : `加拿大 · 美國`
   - **Description anglaise** → 1 ou 2 phrases qui décrivent le ministère
   - **Description chinoise** → la traduction
   - **Image** → une photo représentative (optionnel)

   ![Screenshot: Formulaire région](_screenshots/fr-region-form.png)

4. Dans le champ **Page URL**, entrez l'adresse de la page de cette région :
   - ex : `/regional/north-america`
5. Dans **Accent Color**, entrez la couleur en code hexadécimal :
   - Bleu : `#1E40AF`
   - Violet : `#6B21A8`
   - Or : `#D4A017`
   - Vert : `#16A34A`
6. Dans **Display Order**, entrez l'ordre d'affichage (1 = premier, 10 = deuxième…)
7. Cliquez sur **Enregistrer**

   ![Screenshot: Bouton enregistrer région](_screenshots/fr-region-save.png)

> ✅ La carte de la région apparaîtra sur la page d'accueil. Si la carte ne s'affiche pas, rechargez la page du site.

---

---

# 🇺🇸 ENGLISH

## How to access the admin panel

1. Open your browser and go to: **https://your-site.com/admin**
2. Enter your email address and password
3. You will see the admin dashboard

> 💡 If you forgot your password, contact the technical team.

---

## 1. Create a new page with blocks

A "page" is an article, announcement, or section you want to add to the website. You don't need to know how to code.

**Steps:**

1. In the left menu, click **Pages**
2. Click the **Create new page** button (top right corner)
3. Fill in the fields:
   - **Title (admin)** → a name so you can find it later (e.g. "Partnership Page 2026")
   - **English Title** → the title English-speaking visitors will see
   - **Chinese Title** → the title Chinese-speaking visitors will see

   ![Screenshot: Title fields](_screenshots/en-page-title.png)

4. Go to the **Content** tab
5. Click **Add block** and choose the type:

   | Block type | What it does |
   |---|---|
   | **CMI Hero** | Large banner with title and subtitle at the top of the page |
   | **CMI Text Section** | A text paragraph with an optional heading |
   | **CMI Image** | A photo with an optional caption |

   ![Screenshot: Block picker](_screenshots/en-block-picker.png)

6. For each block, fill in both the **English** and **Chinese** fields
7. You can add as many blocks as you want, in any order
8. To move a block up or down, use the ↑ ↓ arrows next to it
9. When you're happy with the page, click **Publish** (top right button)

   ![Screenshot: Publish button](_screenshots/en-publish.png)

> ✅ The page will be live at: **your-site.com/en/page-slug**

---

## 2. Edit the navigation bar (the menu)

The navigation bar is the top menu on the site (About Us, Ministry Updates, etc.).

**Steps:**

1. In the left menu, click **Globals** then **Header**
2. You'll see the list of menu items

   ![Screenshot: Navigation list](_screenshots/en-nav-list.png)

3. **To edit an item:**
   - Click on the item you want to change
   - Update the **English Label** and **Chinese Label**
   - Update the **URL** if needed (e.g. `/about`)

4. **To add a new item:**
   - Click **Add item** at the bottom of the list
   - Fill in the label and URL
   - To add a submenu, click **Add sub-item**

5. **To delete an item:**
   - Click the 🗑️ icon to the right of the item

6. **To reorder items:**
   - Drag and drop the item to the position you want

7. Click **Save** at the bottom of the page

   ![Screenshot: Save button](_screenshots/en-save.png)

> ⚠️ The menu updates automatically on the website. Double-check everything before saving.

---

## 3. Pin an event on the homepage

Pinned events appear in the carousel at the top of the homepage.

**Steps:**

1. In the left menu, click **Events**
2. Click on the event you want to pin, or create a new one with **Create Event**
3. Fill in the information:
   - **English Title** and **Chinese Title**
   - **Start Date** and **End Date**
   - **English Location** and **Chinese Location**
   - **Image** → upload a photo (recommended: 1200 × 630 pixels)
   - **Registration Link** → the URL for the registration form or event page

   ![Screenshot: Event form](_screenshots/en-event-form.png)

4. Check the **Featured on Homepage** checkbox

   ![Screenshot: Featured checkbox](_screenshots/en-event-featured.png)

5. In the **Display Order** field, enter a number:
   - **1** = appears first
   - **10** = appears second
   - **20** = appears third
   - etc.

6. Make sure the **Active** checkbox is checked
7. Click **Publish** or **Save**

> ✅ The event will appear in the homepage carousel within a few seconds.

---

## 4. Add a region on the homepage

Regions are the cards (Asia, Middle East, Africa…) in the "Our Ministries" section on the homepage.

**Steps:**

1. In the left menu, click **Regions**
2. Click **Create Region**
3. Fill in the fields:
   - **English Name** → e.g. `North America`
   - **Chinese Name** → e.g. `北美洲`
   - **Countries (English)** → e.g. `Canada · USA` (separate with a · dot)
   - **Countries (Chinese)** → e.g. `加拿大 · 美國`
   - **English Description** → 1 or 2 sentences describing the ministry
   - **Chinese Description** → the translation
   - **Image** → a representative photo (optional)

   ![Screenshot: Region form](_screenshots/en-region-form.png)

4. In the **Page URL** field, enter the address of this region's page:
   - e.g. `/regional/north-america`
5. In **Accent Color**, enter the color as a hex code:
   - Blue: `#1E40AF`
   - Purple: `#6B21A8`
   - Gold: `#D4A017`
   - Green: `#16A34A`
6. In **Display Order**, enter the display position (1 = first, 10 = second…)
7. Click **Save**

   ![Screenshot: Save region](_screenshots/en-region-save.png)

> ✅ The region card will appear on the homepage. If it doesn't show up right away, refresh the website page.

---

---

# 🇹🇼 中文

## 如何進入管理後台

1. 打開瀏覽器，前往：**https://您的網站.com/admin**
2. 輸入您的電子郵件和密碼
3. 您將看到管理後台的控制面板

> 💡 如果您忘記了密碼，請聯繫技術團隊。

---

## 1. 建立包含區塊的新頁面

「頁面」是您想添加到網站的文章、公告或版塊。您不需要知道如何編程。

**步驟：**

1. 在左側選單中，點擊 **Pages（頁面）**
2. 點擊右上角的 **Create new page（建立新頁面）** 按鈕
3. 填寫以下欄位：
   - **標題（管理用）** → 方便您自己識別的名稱（例如：「2026年夥伴頁面」）
   - **英文頁面標題** → 英文訪客看到的標題
   - **中文頁面標題** → 中文訪客看到的標題

   ![截圖：標題欄位](_screenshots/zh-page-title.png)

4. 點擊 **Content（內容）** 標籤
5. 點擊 **Add block（添加區塊）** 並選擇類型：

   | 區塊類型 | 用途 |
   |---|---|
   | **CMI Hero** | 頁面頂部的大型橫幅，包含標題和副標題 |
   | **CMI Text Section** | 帶有可選標題的文字段落 |
   | **CMI Image** | 附有說明文字的圖片 |

   ![截圖：選擇區塊](_screenshots/zh-block-picker.png)

6. 對每個區塊，請填寫**英文**和**中文**兩個欄位
7. 您可以添加任意數量的區塊，順序不限
8. 若要移動區塊，請使用區塊旁的 ↑ ↓ 箭頭
9. 完成後，點擊右上角的 **Publish（發布）** 按鈕

   ![截圖：發布按鈕](_screenshots/zh-publish.png)

> ✅ 頁面將發布至：**您的網站.com/zh/頁面名稱**

---

## 2. 修改導覽列（選單）

導覽列是網站頂部的選單（認識我們、事工動態等）。

**步驟：**

1. 在左側選單中，點擊 **Globals（全局設定）**，然後點擊 **Header（頁首）**
2. 您將看到選單項目列表

   ![截圖：導覽列列表](_screenshots/zh-nav-list.png)

3. **修改現有項目：**
   - 點擊您要修改的項目
   - 更新 **English Label（英文標籤）** 和 **Chinese Label（中文標籤）**
   - 如需要，更新 **URL** 連結（例如：`/about`）

4. **新增項目：**
   - 點擊列表底部的 **Add item（添加項目）**
   - 填寫標籤和URL
   - 若要新增下拉子選單，點擊 **Add sub-item（添加子項目）**

5. **刪除項目：**
   - 點擊項目右側的 🗑️ 圖示

6. **調整順序：**
   - 拖曳項目到您希望的位置

7. 點擊頁面底部的 **Save（儲存）**

   ![截圖：儲存按鈕](_screenshots/zh-save.png)

> ⚠️ 選單更新後會立即反映在網站上。儲存前請仔細確認內容正確。

---

## 3. 在首頁置頂活動

被置頂的活動將顯示在首頁頂部的輪播圖中。

**步驟：**

1. 在左側選單中，點擊 **Events（活動）**
2. 點擊您要置頂的活動，或點擊 **Create Event（建立活動）** 新增活動
3. 填寫活動資訊：
   - **英文標題** 和 **中文標題**
   - **開始日期** 和 **結束日期**
   - **英文地點** 和 **中文地點**
   - **圖片** → 上傳一張照片（建議尺寸：1200 × 630 像素）
   - **報名連結** → 報名表單或活動詳情頁面的網址

   ![截圖：活動表單](_screenshots/zh-event-form.png)

4. 勾選 **Featured on Homepage（在首頁置頂）** 核取方塊

   ![截圖：置頂核取方塊](_screenshots/zh-event-featured.png)

5. 在 **Display Order（顯示順序）** 欄位中輸入數字：
   - **1** = 最先顯示
   - **10** = 第二個顯示
   - **20** = 第三個顯示
   - 以此類推

6. 確認 **Active（啟用）** 核取方塊已勾選
7. 點擊 **Publish（發布）** 或 **Save（儲存）**

> ✅ 活動將在幾秒鐘內出現在首頁輪播圖中。

---

## 4. 在首頁新增地區

地區是首頁「我們的事工」版塊中的卡片（亞洲、中東、非洲…）。

**步驟：**

1. 在左側選單中，點擊 **Regions（地區）**
2. 點擊 **Create Region（建立地區）**
3. 填寫以下欄位：
   - **英文名稱** → 例如：`North America`
   - **中文名稱** → 例如：`北美洲`
   - **國家（英文）** → 例如：`Canada · USA`（用 · 分隔）
   - **國家（中文）** → 例如：`加拿大 · 美國`
   - **英文描述** → 1到2句描述該地區事工的句子
   - **中文描述** → 翻譯
   - **圖片** → 一張代表性照片（可選）

   ![截圖：地區表單](_screenshots/zh-region-form.png)

4. 在 **Page URL（頁面網址）** 欄位中，輸入該地區頁面的地址：
   - 例如：`/regional/north-america`
5. 在 **Accent Color（強調色）** 中，輸入十六進位色碼：
   - 藍色：`#1E40AF`
   - 紫色：`#6B21A8`
   - 金色：`#D4A017`
   - 綠色：`#16A34A`
6. 在 **Display Order（顯示順序）** 中輸入排列位置（1 = 第一，10 = 第二…）
7. 點擊 **Save（儲存）**

   ![截圖：儲存地區](_screenshots/zh-region-save.png)

> ✅ 地區卡片將出現在首頁。如果卡片沒有立即顯示，請重新整理網站頁面。

---

---

## Quick Reference / Aide-mémoire / 快速參考

| Action | Où / Where / 位置 | Temps / Time / 時間 |
|---|---|---|
| Créer une page / Create page / 建立頁面 | Admin → Pages → Create | ~5 min |
| Modifier le menu / Edit nav / 修改選單 | Admin → Globals → Header | ~2 min |
| Épingler un événement / Pin event / 置頂活動 | Admin → Events → ☑ Featured | ~3 min |
| Ajouter une région / Add region / 新增地區 | Admin → Regions → Create | ~5 min |

---

## Contact / Contacts / 聯絡

> For technical support / Pour le support technique / 技術支援：
> 
> Contact the development team via the project repository or email.

---

*Last updated / Dernière mise à jour / 最後更新：June 2026*
